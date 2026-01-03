
import React, { useState, useEffect, useMemo } from 'react';
import { Product, Category, StaffMember } from '../types';
import { api } from '../services/api';

interface AdminDashboardProps {
  onClose: () => void;
}

type Tab = 'Analytics' | 'Inventory' | 'Staff';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Analytics');
  const [products, setProducts] = useState<Product[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'Curator', status: 'Active' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    const [prodData, staffData] = await Promise.all([
      api.getProducts(),
      api.getStaff()
    ]);
    setProducts(prodData);
    setStaff(staffData);
    setLoading(false);
  };

  const handleProductSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      if (editingProduct.id) {
        await api.updateProduct(editingProduct);
      } else {
        await api.addProduct(editingProduct as Omit<Product, 'id'>);
      }
      setEditingProduct(null);
      loadAllData();
    }
  };

  const handleStaffAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.addStaff({ ...newStaff, joinedAt: new Date().toLocaleDateString() } as any);
    setIsAddingStaff(false);
    loadAllData();
  };

  // Analytics Calculations
  const analytics = useMemo(() => {
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const categoryCount = products.reduce((acc: any, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    const lowStockItems = products.filter(p => p.stock < 10);
    return { totalInventoryValue, categoryCount, lowStockItems };
  }, [products]);

  return (
    <div className="fixed inset-0 z-[200] bg-[var(--color-bg)] overflow-hidden flex flex-col md:flex-row">
      {/* Dashboard Sidebar */}
      <aside className="w-full md:w-80 bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col">
        <div className="p-8 border-b border-[var(--color-border)] flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black text-[var(--color-accent)] uppercase tracking-[0.4em] block mb-1">COMMAND_UNIT</span>
            <h2 className="text-2xl font-black uppercase tracking-tighter">ATELIER_OS</h2>
          </div>
          <button onClick={onClose} className="md:hidden h-10 w-10 border border-[var(--color-border)] flex items-center justify-center">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {(['Analytics', 'Inventory', 'Staff'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                activeTab === tab 
                ? 'bg-[var(--color-text-main)] text-[var(--color-bg)] border-transparent' 
                : 'text-[var(--color-text-dim)] border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-bg)]'
              }`}
            >
              <i className={`fa-solid ${
                tab === 'Analytics' ? 'fa-chart-line' : tab === 'Inventory' ? 'fa-box-archive' : 'fa-users-gear'
              } w-5`}></i>
              {tab}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-[var(--color-border)] text-center hidden md:block">
          <button onClick={onClose} className="w-full border border-[var(--color-border)] py-4 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
            EXIT_COMMAND
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4">
             <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent animate-spin rounded-full"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-text-dim)]">Decrypting_Data...</span>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            
            {/* Header */}
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-[0.5em] mb-2 block">Control_Panel // {activeTab}</span>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">{activeTab}_Module</h1>
              </div>
              {activeTab === 'Inventory' && (
                <button 
                  onClick={() => setEditingProduct({ id: '', name: '', price: 0, description: '', category: 'Mens', image: '', stock: 0 })}
                  className="bg-[var(--color-text-main)] text-[var(--color-bg)] px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform"
                >
                  ADD_NEW_ARTIFACT
                </button>
              )}
              {activeTab === 'Staff' && (
                <button 
                  onClick={() => setIsAddingStaff(true)}
                  className="bg-[var(--color-text-main)] text-[var(--color-bg)] px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform"
                >
                  HIRE_PERSONNEL
                </button>
              )}
            </header>

            {/* TAB CONTENT: ANALYTICS */}
            {activeTab === 'Analytics' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-10 flex flex-col justify-between h-48 group hover:border-[var(--color-text-main)] transition-all">
                    <span className="text-[9px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Gross_Archive_Value</span>
                    <span className="text-4xl font-black">₹{analytics.totalInventoryValue.toLocaleString()}</span>
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-10 flex flex-col justify-between h-48 group hover:border-[var(--color-text-main)] transition-all">
                    <span className="text-[9px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Artifact_Count</span>
                    <span className="text-4xl font-black">{products.length}</span>
                  </div>
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-10 flex flex-col justify-between h-48 group hover:border-[var(--color-text-main)] transition-all">
                    <span className="text-[9px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Active_Personnel</span>
                    <span className="text-4xl font-black">{staff.length}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <section className="bg-[var(--color-surface)] border border-[var(--color-border)] p-10">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-8">Category_Distribution</h3>
                    <div className="space-y-6">
                      {Object.entries(analytics.categoryCount).map(([cat, count]: any) => (
                        <div key={cat} className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span>{cat}</span>
                            <span>{count} Units</span>
                          </div>
                          <div className="h-1 w-full bg-[var(--color-border)]">
                            <div 
                              className="h-full bg-[var(--color-text-main)]" 
                              style={{ width: `${(count / products.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-[var(--color-surface)] border border-[var(--color-border)] p-10">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-8">Stock_Alerts_High</h3>
                    {analytics.lowStockItems.length > 0 ? (
                      <div className="space-y-4">
                        {analytics.lowStockItems.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10">
                            <span className="text-[10px] font-bold uppercase tracking-tight">{item.name}</span>
                            <span className="text-[10px] font-black text-red-500">ONLY {item.stock} LEFT</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] font-bold text-[var(--color-text-dim)] uppercase tracking-[0.2em] italic text-center py-10">All units are within optimal stock parameters.</p>
                    )}
                  </section>
                </div>
              </div>
            )}

            {/* TAB CONTENT: INVENTORY */}
            {activeTab === 'Inventory' && (
              <div className="grid grid-cols-1 gap-4">
                {products.map(product => (
                  <div key={product.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 flex items-center gap-8 group hover:border-[var(--color-text-main)] transition-all">
                    <div className="h-24 w-16 bg-black overflow-hidden flex-shrink-0">
                       <img src={product.image} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-black uppercase tracking-tight">{product.name}</h4>
                      <div className="flex gap-4 mt-1">
                        <span className="text-[9px] font-bold text-[var(--color-text-dim)] uppercase tracking-widest">{product.category}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-accent)]">STOCK: {product.stock}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="text-xl font-black">₹{product.price.toLocaleString()}</p>
                      <div className="flex gap-4">
                        <button onClick={() => setEditingProduct(product)} className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:underline">REVISE</button>
                        <button onClick={async () => { if(confirm('Delete?')) { await api.deleteProduct(product.id); loadAllData(); } }} className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:underline">PURGE</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: STAFF (EMPLOYMENT) */}
            {activeTab === 'Staff' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staff.map(member => (
                    <div key={member.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 space-y-6 group hover:border-[var(--color-text-main)] transition-all">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-[var(--color-text-main)] text-[var(--color-bg)] flex items-center justify-center text-xl font-black">
                          {member.name[0]}
                        </div>
                        <span className={`text-[8px] font-black px-2 py-1 uppercase tracking-widest ${
                          member.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-tight">{member.name}</h4>
                        <p className="text-[10px] font-bold text-[var(--color-text-dim)] uppercase tracking-widest">{member.role}</p>
                      </div>
                      <div className="pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
                        <span className="text-[9px] font-bold text-[var(--color-text-dim)] uppercase tracking-widest">Joined: {member.joinedAt}</span>
                        <button 
                          onClick={async () => { if(confirm('Dismiss personnel?')) { await api.deleteStaff(member.id); loadAllData(); } }}
                          className="text-red-500 text-[10px] hover:scale-110 transition-transform"
                        >
                          <i className="fa-solid fa-user-minus"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {staff.length === 0 && (
                   <div className="text-center py-20 border-2 border-dashed border-[var(--color-border)]">
                      <p className="text-[10px] font-bold text-[var(--color-text-dim)] uppercase tracking-widest italic">No personnel currently listed in the directory.</p>
                   </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL: PRODUCT EDIT/ADD */}
      {editingProduct && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <form onSubmit={handleProductSave} className="bg-[var(--color-bg)] border border-[var(--color-border)] w-full max-w-2xl p-12 shadow-2xl space-y-8 animate-in zoom-in duration-300">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Artifact_Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Nomenclature</label>
                <input required className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-xs font-bold focus:border-[var(--color-text-main)] outline-none" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Valuation (₹)</label>
                <input required type="number" className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-xs font-bold focus:border-[var(--color-text-main)] outline-none" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Units_Available</label>
                <input required type="number" className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-xs font-bold focus:border-[var(--color-text-main)] outline-none" value={editingProduct.stock} onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Classification</label>
                <select className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-xs font-bold focus:border-[var(--color-text-main)] outline-none" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as Category})}>
                  <option value="Mens">Mens</option>
                  <option value="Womens">Womens</option>
                  <option value="Active">Active</option>
                  <option value="Sleepwear">Sleepwear</option>
                </select>
              </div>
              <div className="col-span-full space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Visual_Reference_URL</label>
                <input required className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-xs font-bold focus:border-[var(--color-text-main)] outline-none" value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-[var(--color-text-main)] text-[var(--color-bg)] py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:opacity-90 transition-all">SAVE_CHANGES</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 border border-[var(--color-border)] py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[var(--color-border)] transition-all">ABORT</button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: STAFF HIRE */}
      {isAddingStaff && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <form onSubmit={handleStaffAdd} className="bg-[var(--color-bg)] border border-[var(--color-border)] w-full max-w-lg p-12 shadow-2xl space-y-8 animate-in zoom-in duration-300">
            <h3 className="text-3xl font-black uppercase tracking-tighter">Personnel_Recruitment</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Personnel_Name</label>
                <input required className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-xs font-bold outline-none" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Contact_Relay (Email)</label>
                <input required type="email" className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-xs font-bold outline-none" value={newStaff.email} onChange={e => setNewStaff({...newStaff, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Assigned_Directive (Role)</label>
                <select className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-xs font-bold outline-none" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})}>
                  <option value="Manager">Manager</option>
                  <option value="Curator">Curator</option>
                  <option value="Inventory Lead">Inventory Lead</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-[var(--color-text-main)] text-[var(--color-bg)] py-5 text-[10px] font-black uppercase tracking-[0.4em]">FINALIZE_CONTRACT</button>
              <button type="button" onClick={() => setIsAddingStaff(false)} className="flex-1 border border-[var(--color-border)] py-5 text-[10px] font-black uppercase tracking-[0.4em]">DISMISS</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

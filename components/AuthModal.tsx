
import React, { useState } from 'react';
import { api } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
  onLogout: () => void;
  user: any | null;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onLogout, user }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let loggedUser;
      if (mode === 'login') {
        loggedUser = await api.login(formData.email, formData.password);
      } else {
        loggedUser = await api.signup(formData.name, formData.email, formData.password);
      }
      onLogin(loggedUser);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAction = async () => {
    await api.logout();
    onLogout();
    onClose();
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        <div className="px-10 pt-12 pb-8 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black text-[var(--color-accent)] uppercase tracking-[0.5em] mb-2 block">Exclusive_Access</span>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-[var(--color-text-main)]">
                {user ? 'Profile_' : (mode === 'login' ? 'Sign_In' : 'Join_Us')}
              </h2>
            </div>
            <button onClick={onClose} className="h-12 w-12 flex items-center justify-center border border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-white transition-all">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        <div className="p-10">
          {user ? (
            <div className="space-y-10 text-center py-4">
               <div className="w-24 h-24 bg-[var(--color-accent)] text-white flex items-center justify-center text-4xl font-black mx-auto rounded-full shadow-2xl">
                  {user.name[0]}
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--color-text-main)]">{user.name}</h3>
                   <p className="text-[11px] font-bold text-[var(--color-text-dim)] uppercase tracking-[0.2em]">{user.email}</p>
                   <p className="text-[9px] font-black text-[var(--color-accent)] uppercase tracking-widest mt-2">{user.role.toUpperCase()}_ACCOUNT</p>
                </div>
                <div className="pt-6">
                  <button onClick={handleLogoutAction} className="w-full border border-red-500/30 text-red-500 py-4 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-red-500 hover:text-white transition-all">
                    Logout
                  </button>
                </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{error}</p>}
              
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Full_Name</label>
                  <input type="text" required className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-6 py-4 text-xs outline-none focus:border-[var(--color-accent)] transition-all text-[var(--color-text-main)]" placeholder="ENTER NAME" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Email_Address</label>
                <input type="email" required className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-6 py-4 text-xs outline-none focus:border-[var(--color-accent)] transition-all text-[var(--color-text-main)]" placeholder="YOUR@EMAIL.COM" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">Password</label>
                <input type="password" required className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] px-6 py-4 text-xs outline-none focus:border-[var(--color-accent)] transition-all text-[var(--color-text-main)]" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[var(--color-accent)] text-white py-5 text-[11px] font-black uppercase tracking-[0.5em] shadow-xl hover:translate-y-[-1px] transition-transform mt-4 disabled:opacity-50">
                {loading ? 'PROCESSING...' : (mode === 'login' ? 'AUTHORIZE' : 'REGISTER')}
              </button>
            </form>
          )}
        </div>

        {!user && (
          <div className="px-10 py-8 bg-[var(--color-surface)] border-t border-[var(--color-border)] text-center">
            <p className="text-[10px] font-bold text-[var(--color-text-dim)] uppercase tracking-widest">
              {mode === 'login' ? "New to the collective?" : "Already established?"}
              <button onClick={toggleMode} className="ml-2 text-[var(--color-accent)] hover:underline underline-offset-4">
                {mode === 'login' ? 'CREATE_ACCOUNT' : 'SIGN_IN'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

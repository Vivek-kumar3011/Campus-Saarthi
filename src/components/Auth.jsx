import React, { useState } from 'react';
import { Lock, Mail, User, ArrowRight, Loader2 } from 'lucide-react';
// Firebase Imports
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const collegeDomain = "@iiitkalyani.ac.in";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Domain Validation
    if (!email.endsWith(collegeDomain)) {
      setLoading(false);
      return alert(`Access restricted. Please use your official ${collegeDomain} email address. ❌`);
    }

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Check if email is verified
        if (!userCredential.user.emailVerified) {
          setLoading(false);
          alert("Account not verified. Please check your college inbox and click the verification link. 📧");
          return;
        }
        
        onLogin(); 
      } else {
        // --- SIGNUP LOGIC ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Add User's Name to Firebase Profile
        await updateProfile(userCredential.user, { displayName: fullName });
        
        // Send Verification Email
        await sendEmailVerification(userCredential.user);
        
        alert("Registration successful! A verification link has been sent to your college email. Please verify your account before logging in. 📧");
        setIsLogin(true); // Switch to login screen after successful signup
      }
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email address first.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("A password reset link has been sent to your email address. 📧");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-white">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <Lock className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-black text-slate-800">
            {isLogin ? 'Welcome Back' : 'Join Saarthi'}
          </h2>
          <p className="text-slate-500 mt-2 italic">Campus life, simplified.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input 
              type="email" 
              placeholder="College Email (@iiitkalyani.ac.in)" 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {isLogin && (
            <button type="button" onClick={handleForgotPassword} className="text-sm text-blue-600 font-bold ml-1 hover:underline">
              Forgot Password?
            </button>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isLogin ? 'Login' : 'Create Account'} <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-bold text-sm">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
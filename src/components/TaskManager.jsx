import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Trash2, Plus, Trophy, BarChart3, User, Loader2 } from 'lucide-react';
import { calculateScore, getBadge } from '../utils/taskLogic';
// Firebase Imports
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  updateDoc, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

const TaskManager = ({ onBack }) => {
  const [studentName, setStudentName] = useState(localStorage.getItem('last_user') || '');
  const [tasks, setTasks] = useState([]);
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [loading, setLoading] = useState(false);

  // REAL-TIME SYNC LOGIC
  useEffect(() => {
    // 1. Normalize the name (lowercase and remove extra spaces)
    const cleanName = studentName.toLowerCase().trim();

    if (!cleanName) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    localStorage.setItem('last_user', cleanName);

    // 2. Query Firestore
    // Note: If you see NO data, check browser console for an "Index Link"
    const q = query(
      collection(db, "tasks"),
      where("studentName", "==", cleanName),
      orderBy("createdAt", "desc")
    );

    // 3. Listen for changes (This syncs mobile & laptop instantly)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(list);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Sync Error:", error);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [studentName]);

  // ADD TASK
  const addTask = async (e) => {
    e.preventDefault();
    const cleanName = studentName.toLowerCase().trim();

    if (!newTaskDesc.trim() || !cleanName) return;

    try {
      await addDoc(collection(db, "tasks"), {
        description: newTaskDesc,
        status: 'pending',
        studentName: cleanName,
        date: new Date().toLocaleDateString(),
        createdAt: serverTimestamp() // Uses Universal Google Time
      });
      setNewTaskDesc('');
    } catch (error) {
      alert("Error adding task: " + error.message);
    }
  };

  // UPDATE TASK
  const updateStatus = async (id, newStatus) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { status: newStatus });
      // No need to fetch manually, onSnapshot handles it!
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    if (window.confirm("Delete this task?")) {
      try {
        await deleteDoc(doc(db, "tasks", id));
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  const score = calculateScore(tasks);
  const badge = getBadge(score);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white p-6 rounded-b-[2.5rem] shadow-sm border-b border-slate-100 mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 font-bold mb-6">
          <ArrowLeft size={20} /> Dashboard
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg">
            <CheckCircle2 size={24} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">Task Tracker</h2>
        </div>

        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Your Name (to sync across devices)..." 
            className="w-full pl-12 pr-4 py-4 bg-slate-100 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 space-y-6">
        {studentName ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <BarChart3 size={16} /> <span className="text-[10px] font-black uppercase">Progress</span>
                </div>
                <div className="text-2xl font-black text-slate-800">{score.toFixed(0)}%</div>
              </div>
              <div className={`p-5 rounded-[2rem] border border-slate-100 shadow-sm ${badge ? badge.bg : 'bg-white'}`}>
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Trophy size={16} /> <span className="text-[10px] font-black uppercase">Rank</span>
                </div>
                <div className={`text-lg font-black ${badge ? badge.color : 'text-slate-300'}`}>
                  {badge ? badge.label : 'Beginner'}
                </div>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={addTask} className="flex gap-2">
              <input 
                type="text" 
                placeholder="What needs to be done?" 
                className="flex-1 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
              />
              <button type="submit" className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg active:scale-90 transition-transform">
                <Plus size={24} />
              </button>
            </form>

            {/* Task List */}
            <div className="space-y-3">
              {loading ? (
                <div className="flex flex-col items-center py-10">
                  <Loader2 className="animate-spin text-indigo-600 mb-2" size={30} />
                  <p className="text-slate-400 text-sm font-bold">Syncing Cloud Data...</p>
                </div>
              ) : tasks.length > 0 ? (
                tasks.map(task => (
                  <div key={task.id} className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
                    <button 
                      onClick={() => updateStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                      className={`transition-colors ${task.status === 'completed' ? 'text-emerald-500' : 'text-slate-200'}`}
                    >
                      {task.status === 'completed' ? <CheckCircle2 size={26} /> : <Circle size={26} />}
                    </button>
                    
                    <div className="flex-1">
                      <p className={`font-bold text-slate-700 ${task.status === 'completed' ? 'text-slate-300 line-through font-medium' : ''}`}>
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-0.5 rounded-md">{task.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {task.status !== 'completed' && (
                        <button 
                          onClick={() => updateStatus(task.id, task.status === 'partial' ? 'pending' : 'partial')}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                            task.status === 'partial' ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'
                          }`}
                        >
                          Partial
                        </button>
                      )}
                      <button onClick={() => deleteTask(task.id)} className="p-2 text-slate-200 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                  <p className="text-slate-400 font-bold">No tasks found for "{studentName.trim()}".</p>
                  <p className="text-xs text-slate-300 mt-1">Add one to see it sync!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-20 px-10 bg-white rounded-[3rem] shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={40} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Identify Yourself</h3>
            <p className="text-slate-400 font-medium">Enter your name above to see your tasks and badges across all your devices.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
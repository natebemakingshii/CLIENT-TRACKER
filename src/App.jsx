import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIG: SUPABASE CORE ENDPOINTS ---
const SUPABASE_URL = "https://afxtatkkplgzpgfnvark.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4KAbGIuhrmAA24elm9L4Iw_CuX5OF9J";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Palette generator optimized for high-contrast Neo-Brutalism folders
const generateUniqueTheme = (seedString) => {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hues = [195, 45, 145, 25, 165, 330, 210, 90]; 
  const hue = hues[Math.with] ? hues[Math.abs(hash % hues.length)] : Math.abs(hash % 360);
  
  return {
    bg: `hsl(${hue}, 95%, 85%)`,
    accent: `hsl(${hue}, 100%, 70%)`,
    tabBg: `hsl(${hue}, 95%, 78%)`
  };
};

export default function App() {
  const [clients, setClients] = useState([]);
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTotalPayment, setNewTotalPayment] = useState('');
  const [newRemaining, setNewRemaining] = useState('');

  // Operational State Matrices
  const [editingClientId, setEditingClientId] = useState(null);
  const [editTotalPayment, setEditTotalPayment] = useState('');
  const [editPaid, setEditPaid] = useState('');

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('position', { ascending: true });

      if (error) throw error;
      
      const mapped = (data || []).map(c => ({
        id: c.id,
        name: c.name,
        agreementDate: c.agreement_date,
        videosRemaining: c.videos_remaining,
        videosCompleted: c.videos_completed,
        totalContractPayment: c.total_contract_payment,
        amountPaid: c.amount_paid,
        position: c.position
      }));

      setClients(mapped);
      if (mapped.length > 0 && !expandedClientId) {
        setExpandedClientId(mapped[0].id);
      }
    } catch (err) {
      console.error("Database sync dropped:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const getDaysElapsed = (dateString) => {
    if (!dateString) return 0;
    const start = new Date(dateString);
    const today = new Date();
    return Math.floor(Math.abs(today - start) / (1000 * 60 * 60 * 24));
  };

  const totalPendingPayout = useMemo(() => {
    return clients.reduce((sum, client) => {
      const outstanding = Math.max(0, client.totalContractPayment - client.amountPaid);
      return sum + outstanding;
    }, 0);
  }, [clients]);

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newName || !newDate) return;

    const id = Date.now().toString();
    const payload = {
      id,
      name: newName.toUpperCase(),
      agreement_date: newDate,
      videos_remaining: parseInt(newRemaining) || 0,
      videos_completed: 0,
      total_contract_payment: parseInt(newTotalPayment) || 0,
      amount_paid: 0
    };

    try {
      const { error } = await supabase.from('clients').insert([payload]);
      if (error) throw error;
      
      await fetchClients();
      setExpandedClientId(id);

      setNewName('');
      setNewDate('');
      setNewTotalPayment('');
      setNewRemaining('');
    } catch (err) {
      alert("Failed creating client sequence: " + err.message);
    }
  };

  const startEditing = (client) => {
    setEditingClientId(client.id);
    setEditTotalPayment(client.totalContractPayment);
    setEditPaid(client.amountPaid);
  };

  const saveEdit = async (clientId) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          total_contract_payment: parseInt(editTotalPayment) || 0,
          amount_paid: parseInt(editPaid) || 0
        })
        .eq('id', clientId);

      if (error) throw error;

      setClients(prev => prev.map(c => c.id === clientId ? {
        ...c,
        totalContractPayment: parseInt(editTotalPayment) || 0,
        amountPaid: parseInt(editPaid) || 0
      } : c));
      setEditingClientId(null);
    } catch (err) {
      alert("Failed storing parameters: " + err.message);
    }
  };

  const adjustVideoCount = async (clientId, field, amount) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const dbField = field === 'videosRemaining' ? 'videos_remaining' : 'videos_completed';
    const updatedVal = Math.max(0, client[field] + amount);

    try {
      const { error } = await supabase
        .from('clients')
        .update({ [dbField]: updatedVal })
        .eq('id', clientId);

      if (error) throw error;

      setClients(prev => prev.map(c => c.id === clientId ? { ...c, [field]: updatedVal } : c));
    } catch (err) {
      console.error("Counter increment sync drop:", err.message);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("ERASE THIS ACTIVE RECORD PROFILE FROM STORAGE?")) return;

    try {
      const { error } = await supabase.from('clients').delete().eq('id', clientId);
      if (error) throw error;

      setClients(prev => prev.filter(c => c.id !== clientId));
      if (expandedClientId === clientId) setExpandedClientId(null);
    } catch (err) {
      alert("Drop command execution failure: " + err.message);
    }
  };

  const moveClient = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= clients.length) return;

    const currentClient = clients[index];
    const targetClient = clients[targetIndex];

    try {
      await Promise.all([
        supabase.from('clients').update({ position: targetClient.position }).eq('id', currentClient.id),
        supabase.from('clients').update({ position: currentClient.position }).eq('id', targetClient.id)
      ]);
      fetchClients();
    } catch (err) {
      console.error("Sequence restructuring aborted:", err.message);
    }
  };

  return (
    <div className="min-h-screen text-black p-6 pb-40 max-w-md mx-auto relative select-none antialiased">
      
      {/* Dynamic Upper Banner Block */}
      <header className="text-center my-6">
        <div className="inline-block bg-black text-white px-4 py-1 rounded-md text-[10px] font-black tracking-widest uppercase mb-2 border-2 border-black shadow-[2px_2px_0px_0px_#A3E635]">
          ⚡ ENGINE LIVE CONNECTIONS ⚡
        </div>
        <h1 className="text-4xl font-black tracking-tight uppercase font-mono-display relative inline-block">
          WORKLOG_
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-black rounded-full"></span>
        </h1>
      </header>

      {/* Primary Input Panel */}
      <section className="bg-white border-3 border-black rounded-2xl p-5 mb-10 shadow-[4px_4px_0px_0px_#000] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 border-b-3 border-l-3 border-black flex items-center justify-center font-black text-xl rotate-12 translate-x-4 -translate-y-4">
          +
        </div>
        <h2 className="font-black text-[11px] uppercase tracking-wider mb-4 text-neutral-400 font-mono-display">
          // INITIALIZE NEW FILING PROFILE
        </h2>
        <form onSubmit={handleAddClient} className="space-y-3">
          <input
            type="text"
            placeholder="CLIENT IDENTIFIER NAME"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent focus:bg-amber-50/30 outline-none placeholder-neutral-400 transition-all"
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none transition-all"
              required
            />
            <input
              type="number"
              placeholder="TOTAL PAYMENT ($)"
              value={newTotalPayment}
              onChange={e => setNewTotalPayment(e.target.value)}
              className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all"
            />
          </div>
          <input
            type="number"
            placeholder="INITIAL REELS IN TIMELINE QUEUE"
            value={newRemaining}
            onChange={e => setNewRemaining(e.target.value)}
            className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all"
          />
          <button type="submit" className="w-full bg-black hover:bg-neutral-900 text-white font-black py-3.5 text-xs rounded-xl uppercase tracking-widest transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5">
            GENERATE FILESYSTEM ROW
          </button>
        </form>
      </section>

      {/* Directory Folders Matrix */}
      {loading ? (
        <div className="text-center py-16 space-y-2">
          <p className="text-sm font-black font-mono-display animate-bounce">READING CORE SYNC TABLES...</p>
          <div className="w-12 h-2 bg-black mx-auto rounded-full animate-pulse"></div>
        </div>
      ) : (
        <section className="space-y-10">
          {clients.map((client, index) => {
            const isExpanded = client.id === expandedClientId;
            const totalVideos = client.videosRemaining + client.videosCompleted;
            const progressPercent = totalVideos > 0 ? (client.videosCompleted / totalVideos) * 100 : 0;
            const outstandingBalance = Math.max(0, client.totalContractPayment - client.amountPaid);
            const elapsedDays = getDaysElapsed(client.agreementDate);
            const theme = generateUniqueTheme(client.id + client.name);

            return (
              <div key={client.id} className={`relative transition-all duration-200 ${isExpanded ? 'transform -translate-y-1' : ''}`}>
                
                {/* Folder Tab Overlay Component */}
                <div 
                  onClick={() => setExpandedClientId(isExpanded ? null : client.id)}
                  className="w-40 h-8 rounded-t-xl border-t-3 border-x-3 border-black absolute -top-8 left-4 cursor-pointer flex items-center px-3 transition-colors shadow-[-1px_-1px_0px_0px_rgba(0,0,0,0.1)_inset]"
                  style={{ backgroundColor: theme.tabBg }}
                >
                  <span className="text-[10px] font-black tracking-widest uppercase font-mono-display truncate text-black flex items-center">
                    <span className="mr-1.5 text-xs">📂</span> {client.name.split(' ')[0]}
                  </span>
                </div>

                {/* Main Cabinet Drawer Frame */}
                <div className={`border-3 border-black bg-white overflow-hidden shadow-[5px_5px_0px_0px_#000] ${isExpanded ? 'rounded-b-2xl rounded-tr-2xl' : 'rounded-2xl'}`}>
                  
                  {/* Top Bar Label Header */}
                  <div className="p-4 flex justify-between items-center border-b-3 border-black transition-all" style={{ backgroundColor: theme.bg }}>
                    <div onClick={() => setExpandedClientId(isExpanded ? null : client.id)} className="cursor-pointer flex-1 pr-2">
                      <h3 className="font-black text-lg tracking-tight text-black font-mono-display uppercase">{client.name}</h3>
                      <p className="text-[10px] font-bold text-black/60 mt-0.5">OPEN DEPLOYMENT: {client.agreementDate}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] px-2.5 py-1 rounded-md font-black border-2 border-black bg-white text-black shadow-[1px_1px_0px_0px_#000]">
                        {client.videosRemaining} ON DECK
                      </span>
                      <div className="flex flex-col bg-white border-2 border-black rounded-lg overflow-hidden text-[9px] font-black shadow-[1px_1px_0px_0px_#000]">
                        <button type="button" onClick={() => moveClient(index, 'up')} disabled={index === 0} className="px-2 py-1 border-b-2 border-black hover:bg-neutral-100 disabled:opacity-30 transition-colors">▲</button>
                        <button type="button" onClick={() => moveClient(index, 'down')} disabled={index === clients.length - 1} className="px-2 py-1 hover:bg-neutral-100 disabled:opacity-30 transition-colors">▼</button>
                      </div>
                    </div>
                  </div>

                  {/* Drawer Internals Panel */}
                  {isExpanded && (
                    <div className="p-5 bg-white space-y-6">
                      
                      {/* Metric Progress Visualizer */}
                      <div>
                        <div className="flex justify-between text-[10px] font-black text-neutral-400 mb-1.5 font-mono-display">
                          <span>TIMELINE PRODUCTION DELIVERED</span>
                          <span className="text-black bg-neutral-100 px-1.5 py-0.5 border border-black rounded font-mono">{client.videosCompleted} / {totalVideos} FILMS</span>
                        </div>
                        <div className="w-full bg-neutral-100 border-3 border-black h-6 rounded-full p-0.5 overflow-hidden shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                          <div className="h-full rounded-full border-r-2 border-black transition-all duration-500 pattern-stripe" style={{ width: `${progressPercent}%`, backgroundColor: theme.accent }} />
                        </div>
                      </div>

                      {/* Timeline Adjusters Control Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border-2 border-black rounded-xl p-3 bg-neutral-50/50 flex flex-col items-center shadow-[2px_2px_0px_0px_#000]">
                          <span className="text-[9px] font-black text-neutral-400 uppercase tracking-wider mb-2">Backlog Queue</span>
                          <div className="flex items-center space-x-4">
                            <button type="button" onClick={() => adjustVideoCount(client.id, 'videosRemaining', -1)} className="w-7 h-7 rounded-lg border-2 border-black bg-white font-black hover:bg-neutral-100 shadow-[1px_1px_0px_0px_#000] flex items-center justify-center active:translate-y-0.5">-</button>
                            <span className="font-black font-mono text-sm">{client.videosRemaining}</span>
                            <button type="button" onClick={() => adjustVideoCount(client.id, 'videosRemaining', 1)} className="w-7 h-7 rounded-lg border-2 border-black bg-white font-black hover:bg-neutral-100 shadow-[1px_1px_0px_0px_#000] flex items-center justify-center active:translate-y-0.5">+</button>
                          </div>
                        </div>
                        <div className="border-2 border-black rounded-xl p-3 bg-neutral-50/50 flex flex-col items-center shadow-[2px_2px_0px_0px_#000]">
                          <span className="text-[9px] font-black text-neutral-400 uppercase tracking-wider mb-2">Delivered cuts</span>
                          <div className="flex items-center space-x-4">
                            <button type="button" onClick={() => adjustVideoCount(client.id, 'videosCompleted', -1)} className="w-7 h-7 rounded-lg border-2 border-black bg-white font-black hover:bg-neutral-100 shadow-[1px_1px_0px_0px_#000] flex items-center justify-center active:translate-y-0.5">-</button>
                            <span className="font-black font-mono text-sm">{client.videosCompleted}</span>
                            <button type="button" onClick={() => adjustVideoCount(client.id, 'videosCompleted', 1)} className="w-7 h-7 rounded-lg border-2 border-black bg-white font-black hover:bg-neutral-100 shadow-[1px_1px_0px_0px_#000] flex items-center justify-center active:translate-y-0.5">+</button>
                          </div>
                        </div>
                      </div>

                      {/* Financial Ledger Module */}
                      <div className="border-2 border-black rounded-xl p-4 bg-white space-y-2.5 text-xs font-semibold shadow-[2px_2px_0px_0px_#000]">
                        <div className="flex justify-between border-b-2 border-dashed border-neutral-200 pb-2">
                          <span className="text-neutral-400 font-mono-display uppercase text-[10px]">Aging Ledger:</span>
                          <span className="font-black text-neutral-800 font-mono bg-amber-100 border border-black px-1.5 rounded">{elapsedDays} Production Days</span>
                        </div>

                        {editingClientId === client.id ? (
                          <div className="space-y-3 pt-1">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-black text-neutral-400 font-mono-display">CONTRACT VALUE ($):</label>
                              <input type="number" value={editTotalPayment} onChange={e => setEditTotalPayment(e.target.value)} className="w-28 border-2 border-black rounded-lg p-1.5 text-right font-mono font-bold outline-none bg-amber-50/40" />
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-black text-neutral-400 font-mono-display">RETAINER PAID ($):</label>
                              <input type="number" value={editPaid} onChange={e => setEditPaid(e.target.value)} className="w-28 border-2 border-black rounded-lg p-1.5 text-right font-mono font-bold outline-none bg-amber-50/40" />
                            </div>
                            <button type="button" onClick={() => saveEdit(client.id)} className="w-full bg-black text-white text-[10px] font-black py-2.5 rounded-lg uppercase tracking-wider mt-1 shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                              COMMIT UPDATED PARAMETERS
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between text-neutral-600">
                              <span>Total Contract Cap Value:</span>
                              <span className="font-mono font-bold text-black">${client.totalContractPayment}</span>
                            </div>
                            <div className="flex justify-between text-neutral-600">
                              <span>Retainer Advance Cleared:</span>
                              <span className="font-mono font-bold text-emerald-600">+${client.amountPaid}</span>
                            </div>
                            <div className="flex justify-between border-t-2 border-black pt-2.5 mt-2 font-black text-black">
                              <span className="font-mono-display text-[11px] uppercase tracking-wider">Unbilled Pipeline Collection:</span>
                              <span className="font-mono text-base text-blue-600 bg-blue-50 border border-blue-400 px-2 rounded-md">${outstandingBalance}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
                              <button type="button" onClick={() => startEditing(client)} className="bg-neutral-50 hover:bg-neutral-100 border-2 border-black rounded-lg font-black py-2 text-[10px] uppercase tracking-widest transition-colors shadow-[1px_1px_0px_0px_#000] active:translate-y-0.5">Modify Fees</button>
                              <button type="button" onClick={() => handleDeleteClient(client.id)} className="bg-red-50 hover:bg-red-100 border-2 border-red-500 text-red-600 rounded-lg font-black py-2 text-[10px] uppercase tracking-widest transition-colors shadow-[1px_1px_0px_0px_#EF4444] active:translate-y-0.5">Drop Record</button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Floating Sticky Base Capsule */}
      <footer className="fixed bottom-6 left-6 right-6 bg-black text-white border-3 border-black p-4 rounded-2xl flex justify-between items-center shadow-[4px_4px_0px_0px_#A3E635] max-w-md mx-auto z-50">
        <div className="pl-1">
          <span className="text-[10px] font-black text-neutral-400 block uppercase tracking-widest font-mono-display">AGREGATE PIPELINE REVENUE</span>
          <p className="text-[10px] text-neutral-400/60 font-medium font-mono">Real-time database sync layer</p>
        </div>
        <div className="bg-[#73C2FB] text-black border-2 border-black px-4 py-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          <span className="text-base font-black font-mono tracking-tight">${totalPendingPayout.toLocaleString()}</span>
        </div>
      </footer>
    </div>
  );
}
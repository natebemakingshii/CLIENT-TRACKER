import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// ==========================================
// --- CONFIG: SUPABASE CORE ENDPOINTS ---
// ==========================================
const SUPABASE_URL = "https://afxtatkkplgzpgfnvark.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4KAbGIuhrmAA24elm9L4Iw_CuX5OF9J";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Palette generator optimized for high-contrast Neo-Brutalism folders
const generateUniqueTheme = (seedString) => {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hues = [45, 145, 195, 290, 340, 15, 165];
  const selectedHue = hues[Math.abs(hash) % hues.length];
  return {
    bg: `hsl(${selectedHue}, 95%, 82%)`,
    accent: `hsl(${selectedHue}, 100%, 35%)`
  };
};

// ==========================================
// --- COGNITIVE PREDICTION ENGINE ---
// ==========================================
function PredictionForecaster({ totalRemainingVideos, weeklyVelocity }) {
  const weeksToCompletion = weeklyVelocity > 0 ? totalRemainingVideos / weeklyVelocity : 0;
  const daysToCompletion = Math.ceil(weeksToCompletion * 7);

  const dateObj = new Date();
  dateObj.setDate(dateObj.getDate() + daysToCompletion);
  
  const formattedDate = daysToCompletion > 0 
    ? dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : "STABLE RUNNING";

  let paceStatus = "STAGNANT ENGINE";
  let paceBg = "bg-[#FF6B6B]";
  if (weeklyVelocity >= 5) {
    paceStatus = "HYPER SPEED VELOCITY";
    paceBg = "bg-[#B1E55A]";
  } else if (weeklyVelocity >= 2) {
    paceStatus = "CRUISE FREQUENCY NOMINAL";
    paceBg = "bg-[#FFD93D]";
  }

  const totalPossibleLoad = 25; 
  const completionPercentage = totalRemainingVideos > 0 
    ? Math.max(5, Math.min(100, Math.round(((totalPossibleLoad - totalRemainingVideos) / totalPossibleLoad) * 100))) 
    : 100;

  return (
    <div className="w-full bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono rounded-2xl">
      <div className="border-b-4 border-black pb-3 mb-4 flex justify-between items-center">
        <span className="font-black uppercase tracking-tight text-xs">🔮 AI PREDICTION FORECASTER</span>
        <span className={`border-2 border-black px-2 py-0.5 text-[9px] font-black uppercase ${paceBg}`}>
          {paceStatus}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="border-2 border-black p-2 bg-[#F6F6F6] rounded-lg">
          <span className="text-[9px] text-gray-500 font-bold block uppercase">Velocity Pace</span>
          <span className="text-sm font-black">{weeklyVelocity} clips/wk</span>
        </div>
        <div className="border-2 border-black p-2 bg-black text-white rounded-lg">
          <span className="text-[9px] text-gray-400 font-bold block uppercase">Estimated Delivery</span>
          <span className="text-xs font-black uppercase block mt-0.5">{formattedDate}</span>
        </div>
      </div>
      <div className="border-2 border-black p-3 bg-neutral-50 rounded-xl">
        <div className="w-full bg-neutral-200 h-5 border border-black relative rounded overflow-hidden">
          <div className="bg-[#B1E55A] h-full border-r border-black" style={{ width: `${completionPercentage}%` }} />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black mix-blend-difference text-white">
            {completionPercentage}% COMPILING
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// --- CONTRACT PROFITABILITY MATRIX ---
// ==========================================
function ProfitabilityMatrix({ clientData }) {
  return (
    <div className="w-full bg-[#FFF5F5] border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono rounded-2xl">
      <div className="border-b-4 border-black pb-3 mb-4">
        <span className="font-black text-xs uppercase tracking-wider block">💰 RETENTION PROFITABILITY MATRIX</span>
      </div>
      <div className="space-y-3">
        {clientData.map((client, cIdx) => {
          const totalEarned = client.totalContractPayment || 0;
          const hourlyRateEquivalent = client.videosPerWeek > 0 
            ? Math.round((totalEarned / (client.videosRemaining + 1)) / 4) 
            : 45; 
          
          let rateColor = "text-[#B1E55A] bg-black";
          if (hourlyRateEquivalent < 40) rateColor = "text-red-500 bg-red-950/20";
          else if (hourlyRateEquivalent < 65) rateColor = "text-amber-500 bg-amber-950/10";

          return (
            <div key={cIdx} className="border-2 border-black bg-white p-3 rounded-xl flex justify-between items-center shadow-[2px_2px_0px_0px_#000]">
              <div>
                <span className="text-xs font-black uppercase block tracking-tight">{client.name}</span>
                <span className="text-[9px] text-gray-400 font-bold uppercase">Contract Node Value: ${totalEarned}</span>
              </div>
              <div className={`border-2 border-black rounded-lg px-2 py-1 text-right font-mono ${rateColor}`}>
                <span className="text-[8px] block font-bold leading-none uppercase">Est Yield</span>
                <span className="text-xs font-black">${hourlyRateEquivalent}/hr</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// --- EMBEDDED INTERNAL TODO MODULE ---
// ==========================================
function MilestoneTracker({ onTodoStateChange, refreshTrigger }) {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState('');
  const [expandedDates, setExpandedDates] = useState({});

  const formatGroupHeader = (dateString) => {
    if (dateString === todayStr) return "🔴 LIVE DEPLOYMENT MILESTONES (TODAY)";
    const d = new Date(dateString);
    return `📅 ARCHIVED TRACK: ${d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}`;
  };

  const toggleDateAccordion = (dateStr) => {
    setExpandedDates(prev => ({ ...prev, [dateStr]: !prev[dateStr] }));
  };

  const getLocalDateString = (dateObj) => {
    const offset = dateObj.getTimezoneOffset();
    const adjustedDate = new Date(dateObj.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  };

  const todayStr = useMemo(() => getLocalDateString(new Date()), []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const mapped = data.map(t => ({
        id: t.id,
        text: t.text,
        completed: t.completed,
        date: t.date || todayStr
      }));
      setTodos(mapped);
      const completedCount = mapped.filter(t => t.completed).length;
      onTodoStateChange(completedCount);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [todayStr, refreshTrigger]);

  const groupedTodos = useMemo(() => {
    const groups = {};
    todos.forEach(todo => {
      if (!groups[todo.date]) groups[todo.date] = [];
      groups[todo.date].push(todo);
    });
    return groups;
  }, [todos]);

  const sortedDates = useMemo(() => {
    return Object.keys(groupedTodos).sort((a, b) => new Date(b) - new Date(a));
  }, [groupedTodos]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      text: newText.toUpperCase().trim(),
      completed: false,
      date: todayStr
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    setNewText('');

    await supabase.from('todos').insert([{
      id: newTodo.id,
      text: newTodo.text,
      completed: newTodo.completed,
      date: newTodo.date
    }]);

    onTodoStateChange(updatedTodos.filter(t => t.completed).length);
  };

  const toggleTodo = async (id, currentStatus) => {
    const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos(updated);

    await supabase.from('todos').update({ completed: !currentStatus }).eq('id', id);
    onTodoStateChange(updated.filter(t => t.completed).length);
  };

  const deleteTodo = async (id) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    await supabase.from('todos').delete().eq('id', id);
    onTodoStateChange(updated.filter(t => t.completed).length);
  };

  return (
    <div className="bg-[#E0F2FE] border-4 border-black rounded-2xl p-4 shadow-[5px_5px_0px_0px_#000] relative lg:-rotate-1 w-full">
      <div className="absolute -top-3 left-6 bg-[#38BDF8] border-2 border-black font-mono font-black px-3 py-0.5 text-[9px] uppercase tracking-wider rounded shadow-[2px_2px_0px_0px_#000]">
        🚀 PROCESS LOG TERMINAL
      </div>
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4 mt-2">
        <input
          type="text"
          placeholder="NEW SYSTEM MILESTONE UNIT..."
          value={newText}
          onChange={e => setNewText(e.target.value)}
          className="flex-1 bg-white border-2 border-black p-2 font-mono font-black uppercase text-[10px] rounded-xl placeholder-neutral-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-black text-white hover:bg-neutral-800 font-black px-3 rounded-xl text-xs border border-black shadow-[2px_2px_0px_0px_#fff] active:translate-y-0.5 transition-transform"
        >
          +
        </button>
      </form>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
        {sortedDates.length === 0 && (
          <p className="text-[9px] font-bold font-mono text-black/40 italic text-center py-4">No logged deployment milestones found.</p>
        )}
        {sortedDates.map(dateStr => {
          const items = groupedTodos[dateStr] || [];
          const isToday = dateStr === todayStr;
          const isCollapsed = !isToday && !expandedDates[dateStr];
          const completedCount = items.filter(i => i.completed).length;

          return (
            <div key={dateStr} className="border-2 border-black rounded-xl bg-white/60 overflow-hidden shadow-[2px_2px_0px_0px_#000]">
              <div 
                onClick={() => !isToday && toggleDateAccordion(dateStr)}
                className={`p-2 flex justify-between items-center text-[9px] font-black font-mono border-b-2 border-black cursor-pointer select-none ${isToday ? 'bg-black text-white' : 'bg-white hover:bg-neutral-50 text-black'}`}
              >
                <span>{formatGroupHeader(dateStr)}</span>
                <div className="flex items-center space-x-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] ${isToday ? 'bg-[#C3F2CB] text-black' : 'bg-black text-white'}`}>
                    {completedCount}/{items.length}
                  </span>
                  {!isToday && <span>{isCollapsed ? '▼' : '▲'}</span>}
                </div>
              </div>

              {!isCollapsed && (
                <div className="p-1.5 space-y-1 bg-white/90">
                  {items.map(todo => (
                    <div key={todo.id} className="flex items-center justify-between bg-neutral-50 p-2 border border-black/10 rounded-lg group">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id, todo.completed)}
                          className="w-3.5 h-3.5 accent-black border-2 border-black rounded cursor-pointer shrink-0"
                        />
                        <span className={`text-[10px] font-mono uppercase truncate ${todo.completed ? 'line-through text-neutral-400 font-normal' : 'font-black text-black'}`}>
                          {todo.text}
                        </span>
                      </div>
                      <button 
                        onClick={() => deleteTodo(todo.id)}
                        className="text-neutral-400 hover:text-red-600 font-bold text-[10px] ml-2 font-mono"
                      >
                        [DEL]
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// --- INTEGRATED PAYMENT GRID SYSTEM ---
// ==========================================
function PaymentRadarCalendar({ clients }) {
  const [monthOffset, setMonthOffset] = useState(0);

  // Safe and precise rolling calendar window calculation algorithm
  const rollingDays = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 28; i++) {
      const d = new Date();
      d.setDate(d.getDate() - 3 + i + (monthOffset * 28));
      arr.push(d);
    }
    return arr;
  }, [monthOffset]);

  const startMonthLabel = rollingDays[0]?.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const endMonthLabel = rollingDays[rollingDays.length - 1]?.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const rangeLabel = startMonthLabel === endMonthLabel ? startMonthLabel : `${startMonthLabel} / ${endMonthLabel}`;

  return (
    <div className="bg-[#FEF08A] border-4 border-black rounded-2xl p-4 shadow-[5px_5px_0px_0px_#000] lg:rotate-1 w-full relative">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD93D] border-2 border-black font-mono font-black px-4 py-0.5 text-[9px] uppercase tracking-wider rounded shadow-[2px_2px_0px_0px_#000]">
        📌 PAYMENT RADAR
      </div>

      <div className="flex justify-between items-center mb-3 border-b-4 border-black pb-2 mt-2">
        <button 
          type="button" 
          onClick={() => setMonthOffset(prev => prev - 1)}
          className="bg-black text-white hover:bg-neutral-800 font-mono font-black w-6 h-6 rounded flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_#fff] text-xs transition-transform active:translate-y-0.5"
        >
          ◀
        </button>
        <div className="text-center">
          <span className="text-[11px] font-black text-black uppercase tracking-wider block font-mono-display">UPCOMING REVENUE</span>
          <span className="font-mono text-[9px] font-black bg-black text-white px-2 py-0.5 rounded tracking-tighter inline-block mt-0.5">{rangeLabel} {rollingDays[0]?.getFullYear()}</span>
        </div>
        <button 
          type="button" 
          onClick={() => setMonthOffset(prev => prev + 1)}
          className="bg-black text-white hover:bg-neutral-800 font-mono font-black w-6 h-6 rounded flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_#fff] text-xs transition-transform active:translate-y-0.5"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 bg-white p-1.5 rounded-xl border-2 border-black">
        {['M','T','W','T','F','S','S'].map((day, dIdx) => (
          <div key={dIdx} className="text-center text-[8px] font-black font-mono text-gray-400 uppercase py-0.5">{day}</div>
        ))}

        {rollingDays.map((dateObj, idx) => {
          const dayNumber = dateObj.getDate();
          const monthLabel = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
          const dayStr = dateObj.toISOString().split('T')[0];

          const matchingClients = clients.filter(c => {
            if (!c.agreementDate) return false;
            const originalDate = new Date(c.agreementDate);
            return originalDate.getDate() === dayNumber;
          });

          const hasPayout = matchingClients.length > 0;
          const isToday = new Date().toISOString().split('T')[0] === dayStr;
          const isPastDay = new Date(new Date().setHours(0,0,0,0)) > dateObj;

          let blockBg = "bg-neutral-50 text-neutral-400 border border-neutral-300";
          if (hasPayout) blockBg = "bg-[#B1E55A] text-black border-2 border-black shadow-[1px_1px_0px_0px_#000] cursor-pointer group relative font-black";
          if (isToday) blockBg = "bg-black text-white border-2 border-black font-black shadow-[1px_1px_0px_0px_#000]";

          return (
            <div key={idx} className={`aspect-square rounded-lg flex flex-col items-center justify-center relative ${blockBg}`}>
              <span className="text-[9px] font-mono leading-none">{dayNumber}</span>
              {hasPayout && (
                <>
                  <div className="flex gap-0.5 mt-0.5">
                    {matchingClients.map(c => (
                      <span key={c.id} className={`w-1.5 h-1.5 rounded-full border border-black ${isPastDay ? 'bg-neutral-400' : 'bg-white'}`} />
                    ))}
                  </div>
                  {!isPastDay && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-[9px] p-2 rounded-lg border-2 border-black font-black whitespace-nowrap z-50 shadow-[2px_2px_0px_0px_#B1E55A]">
                      {matchingClients.map(c => <div key={c.id} className="uppercase font-mono-display tracking-tight">💰 {c.name.split(' ')[0]}: {monthLabel} {dayNumber}</div>)}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t-2 border-black border-dashed space-y-1.5">
        <span className="text-[9px] font-black uppercase text-black/50 tracking-wider block">Upcoming Queue inside window:</span>
        {clients.length === 0 ? (
          <p className="text-[10px] font-bold font-mono text-black/40 italic">No incoming cash routes detected.</p>
        ) : (
          <div className="max-h-24 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
            {clients.map(c => {
              if (!c.agreementDate) return null;
              const d = new Date(c.agreementDate);
              const totalPayoutRemaining = (c.totalContractPayment || 0) - (c.amountPaid || 0);
              return (
                <div key={c.id} className="bg-white border-2 border-black rounded-lg px-2 py-1 text-[9px] font-mono font-black uppercase flex justify-between items-center shadow-[1px_1px_0px_0px_#000]">
                  <span className="truncate max-w-[140px] text-black">{c.name}</span>
                  <span className="bg-black text-[#B1E55A] px-1 rounded shrink-0">CYCLE DAY {d.getDate()} (${totalPayoutRemaining})</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// --- REVENUE CALCULATION AGGREGATOR ---
// ==========================================
function AggregatePipelineRevenue({ clientCollection }) {
  const [showRevenue, setShowRevenue] = useState(false);

  const aggregateMetrics = useMemo(() => {
    let totalContractValue = 0;
    let aggregateCollected = 0;
    clientCollection.forEach(client => {
      totalContractValue += (client.totalContractPayment || 0);
      aggregateCollected += (client.amountPaid || 0);
    });
    return {
      total: totalContractValue,
      collected: aggregateCollected,
      outstanding: totalContractValue - aggregateCollected
    };
  }, [clientCollection]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-[9999] font-mono">
      <button
        type="button"
        onClick={() => setShowRevenue(prev => !prev)}
        className="w-full bg-black text-white p-4 rounded-xl border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-between cursor-pointer select-none active:translate-x-[4px] active:translate-y-[4px]"
      >
        <div className="text-left">
          <h3 className="font-bold uppercase text-xs tracking-wider text-neutral-400">AGGREGATE PIPELINE REVENUE</h3>
          <p className="text-[9px] text-neutral-500 font-black uppercase mt-0.5 tracking-tight">
            {showRevenue ? "👉 CLICK TO HIDE PIPELINE STREAM" : "👉 CLICK TO REVEAL PIPELINE STREAM"}
          </p>
        </div>
        <div className="bg-[#5cd6ff] text-black font-black px-4 py-2 rounded-lg border-2 border-black text-xl tracking-wide font-mono min-w-[135px] text-center shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">
          {showRevenue ? `$${aggregateMetrics.outstanding}` : "••••••"}
        </div>
      </button>

      {showRevenue && (
        <div className="mt-2 bg-[#FCF8F2] border-4 border-black rounded-xl p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] text-black grid grid-cols-3 gap-2 text-center animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="border-2 border-black p-2 bg-white rounded-lg">
            <span className="text-[8px] font-black text-gray-400 uppercase block">Total Booked</span>
            <span className="text-xs font-black text-neutral-800">${aggregateMetrics.total}</span>
          </div>
          <div className="border-2 border-black p-2 bg-[#E8F5E9] rounded-lg">
            <span className="text-[8px] font-black text-emerald-600 uppercase block">Collected</span>
            <span className="text-xs font-black text-emerald-700">${aggregateMetrics.collected}</span>
          </div>
          <div className="border-2 border-black p-2 bg-[#FFF3E0] rounded-lg">
            <span className="text-[8px] font-black text-amber-600 uppercase block">Outstanding</span>
            <span className="text-xs font-black text-amber-700">${aggregateMetrics.outstanding}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// --- CORE APPLICATION ARCHITECTURE ---
// ==========================================
export default function App() {
  const [clients, setClients] = useState([]);
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [dbRefreshTrigger, setDbRefreshTrigger] = useState(0);
  const [todoRefreshTrigger, setTodoRefreshTrigger] = useState(0);
  const [globalCompletedTodos, setGlobalCompletedTodos] = useState(0);

  // Form State Nodes
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTotalPayment, setNewTotalPayment] = useState('');
  const [newAmountPaid, setNewAmountPaid] = useState('');
  const [newVideosRemaining, setNewVideosRemaining] = useState('');
  const [newVideosCompleted, setNewVideosCompleted] = useState('');
  const [newTargetPace, setNewTargetPace] = useState('3');

  // Inline Parameter Mutation State Buffer Nodes
  const [editingClientId, setEditingClientId] = useState(null);
  const [editTotalPayment, setEditTotalPayment] = useState('');
  const [editPaid, setEditPaid] = useState('');
  const [weeklyTarget, setWeeklyTarget] = useState(3);

  useEffect(() => {
    const syncClientsDatabase = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data) {
        const structuralMap = data.map(dbRow => ({
          id: dbRow.id,
          name: dbRow.name || "UNNAMED STAGING NODE",
          agreementDate: dbRow.agreement_date || "2026-05-01",
          videosRemaining: dbRow.videos_remaining ?? 0,
          videosCompleted: dbRow.videos_completed ?? 0,
          ratePerVideo: dbRow.rate_per_video ?? 125,
          totalContractPayment: dbRow.total_contract_payment ?? 1000,
          amountPaid: dbRow.amount_paid ?? 0,
          videosPerWeek: dbRow.videos_per_week ?? 3,
          displayOrder: dbRow.display_order ?? 99
        }));
        setClients(structuralMap);
      } else if (error) {
        console.error("Supabase cluster handshake fault:", error.message);
      }
    };
    syncClientsDatabase();
  }, [dbRefreshTrigger]);

  // Aggregate Computation Nodes
  const totalPendingPayout = useMemo(() => {
    return clients.reduce((accum, cur) => accum + Math.max(0, (cur.totalContractPayment - cur.amountPaid)), 0);
  }, [clients]);

  const totalRemainingVideosCount = useMemo(() => {
    return clients.reduce((accum, cur) => accum + cur.videosRemaining, 0);
  }, [clients]);

  const totalWeeklyVelocity = useMemo(() => {
    return clients.reduce((accum, cur) => accum + (cur.videosPerWeek || 0), 0);
  }, [clients]);

  // Handler Subroutine: Record Appending
  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDate) return;

    const vRem = parseInt(newVideosRemaining) || 0;
    const vComp = parseInt(newVideosCompleted) || 0;
    const totalPay = parseInt(newTotalPayment) || 0;
    const paidAmt = parseInt(newAmountPaid) || 0;
    
    // CRITICAL BUG FIX: Added structural guard block to avoid dividing by 0 (Infinity), which breaks row serialization
    const rateCalc = (vRem + vComp) > 0 ? Math.round(totalPay / (vRem + vComp)) : totalPay;
    const paceTarget = parseInt(newTargetPace) || 3;
    const nextOrderValue = clients.length > 0 ? Math.max(...clients.map(c => c.displayOrder || 0)) + 1 : 1;

    const newDbRow = {
      name: newName.toUpperCase().trim(),
      agreement_date: newDate,
      videos_remaining: vRem,
      videos_completed: vComp,
      rate_per_video: rateCalc,
      total_contract_payment: totalPay,
      amount_paid: paidAmt,
      videos_per_week: paceTarget,
      display_order: nextOrderValue
    };

    try {
      const { data, error } = await supabase.from('clients').insert([newDbRow]).select();
      if (error) throw error;
      if (data && data[0]) {
        setDbRefreshTrigger(prev => prev + 1);
        setTodoRefreshTrigger(prev => prev + 1);
        
        // Reset Inputs
        setNewName('');
        setNewDate('');
        setNewTotalPayment('');
        setNewAmountPaid('');
        setNewVideosRemaining('');
        setNewVideosCompleted('');
        setNewTargetPace('3');
      }
    } catch (err) {
      alert("Database insertion rejected: " + err.message);
    }
  };

  const initParameterMutation = (client) => {
    setEditingClientId(client.id);
    setEditTotalPayment(client.totalContractPayment.toString());
    setEditPaid(client.amountPaid.toString());
    setWeeklyTarget(client.videosPerWeek);
  };

  const saveParameterMutation = async (clientId) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          total_contract_payment: parseInt(editTotalPayment) || 0,
          amount_paid: parseInt(editPaid) || 0,
          videos_per_week: weeklyTarget
        })
        .eq('id', clientId);

      if (error) throw error;
      setDbRefreshTrigger(prev => prev + 1);
      setClients(prev => prev.map(c => c.id === clientId ? {
        ...c,
        totalContractPayment: parseInt(editTotalPayment) || 0,
        amountPaid: parseInt(editPaid) || 0,
        videosPerWeek: weeklyTarget
      } : c));
      setEditingClientId(null);
    } catch (err) {
      alert("Failed updating database row parameters: " + err.message);
    }
  };

  const adjustVideoCount = async (clientId, field, amount) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const dbField = field === 'videosRemaining' ? 'videos_remaining' : 'videos_completed';
    const updatedVal = Math.max(0, client[field] + amount);

    try {
      const { error } = await supabase.from('clients').update({ [dbField]: updatedVal }).eq('id', clientId);
      if (error) throw error;

      if (field === 'videosRemaining' && amount > 0) {
        const todayStr = new Date().toISOString().split('T')[0];
        const uniqueTaskId = `${clientId}-manual-${Date.now()}`;
        await supabase.from('todos').insert([{
          id: uniqueTaskId,
          text: `${client.name} - CUSTOM EXTRA VIDEO WORK UNIT`,
          completed: false,
          date: todayStr
        }]);
        setTodoRefreshTrigger(prev => prev + 1);
      }

      setClients(prev => prev.map(c => c.id === clientId ? { ...c, [field]: updatedVal } : c));
    } catch (err) {
      console.error("Increment sync drop:", err.message);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("ERASE THIS ACTIVE RECORD PROFILE?")) return;
    try {
      const { error } = await supabase.from('clients').delete().eq('id', clientId);
      if (error) throw error;
      setClients(prev => prev.filter(c => c.id !== clientId));
      if (expandedClientId === clientId) setExpandedClientId(null);
    } catch (err) {
      alert("Drop command failure: " + err.message);
    }
  };

  const moveClient = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= clients.length) return;

    const updatedClients = [...clients];
    const temp = updatedClients[index];
    updatedClients[index] = updatedClients[targetIndex];
    updatedClients[targetIndex] = temp;

    setClients(updatedClients);

    try {
      const updatePromises = updatedClients.map((client, idx) =>
        supabase.from('clients').update({ display_order: idx + 1 }).eq('id', client.id)
      );
      await Promise.all(updatePromises);
    } catch (err) {
      console.error("Failed to persist order shift:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-black font-sans pb-32 selection:bg-black selection:text-[#B1E55A]">
      {/* GLOBAL BANNER NODE */}
      <header className="bg-black text-white border-b-4 border-black p-4 flex justify-between items-center font-mono sticky top-0 z-[1000]">
        <div>
          <h1 className="text-sm font-black tracking-tighter uppercase flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B1E55A] animate-pulse" />
            BUILD MODE TRACKER <span className="text-gray-500 font-bold">v3.9.5</span>
          </h1>
          <p className="text-[9px] font-bold text-neutral-400 tracking-tight mt-0.5">
            Control Center Terminal // Live Supabase Connection Node
          </p>
        </div>
        <div className="text-right text-[10px] font-bold bg-neutral-900 border border-neutral-800 p-2 text-[#B1E55A] rounded">
          PENDING_PAYOUT: <span className="text-white">${totalPendingPayout}</span>
        </div>
      </header>

      {/* Main Structural Framework Layout Canvas */}
      <main className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* --- CORE SPLIT MONITOR GRID --- */}
        <div className="grid grid-cols-1 grid-flow-row lg:grid-cols-12 gap-6 items-start">
          
          {/* CLIENT CABINET CONTROLS (COLUMNS 1-7) */}
          <div className="lg:col-span-7 space-y-6 w-full">
            <section className="bg-white border-3 border-black rounded-2xl p-5 shadow-[5px_5px_0px_0px_#000] relative overflow-hidden">
              <h2 className="font-black text-[11px] uppercase tracking-wider mb-4 text-neutral-400 font-mono-display">CREATE REVENUE NODE</h2>
              <form onSubmit={handleAddClient} className="space-y-3">
                <input 
                  type="text" 
                  placeholder="CLIENT IDENTIFIER NAME" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent focus:bg-amber-50/30 outline-none placeholder-neutral-400 transition-all uppercase" 
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
                    placeholder="TOTAL CONTRACT PAYMENT ($)" 
                    value={newTotalPayment} 
                    onChange={e => setNewTotalPayment(e.target.value)}
                    className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="number" 
                    placeholder="INITIAL AMOUNT PAID ($)" 
                    value={newAmountPaid} 
                    onChange={e => setNewAmountPaid(e.target.value)}
                    className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" 
                  />
                  <input 
                    type="number" 
                    placeholder="WEEKLY PACING TARGET" 
                    value={newTargetPace} 
                    onChange={e => setNewTargetPace(e.target.value)}
                    className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="number" 
                    placeholder="REMAINING VIDEOS UNRELEASED" 
                    value={newVideosRemaining} 
                    onChange={e => setNewVideosRemaining(e.target.value)}
                    className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" 
                  />
                  <input 
                    type="number" 
                    placeholder="COMPLETED CLIPS ENGINE" 
                    value={newVideosCompleted} 
                    onChange={e => setNewVideosCompleted(e.target.value)}
                    className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#B1E55A] text-black font-black uppercase text-xs tracking-wider p-3.5 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all select-none"
                >
                  INITIALIZE REVENUE NODE DATA STRATA
                </button>
              </form>
            </section>

            {/* CLIENT ARTIFACT FOLDER WRAPPERS */}
            <div className="space-y-4">
              {clients.map((client, index) => {
                const theme = generateUniqueTheme(client.name);
                const isExpanded = expandedClientId === client.id;
                const outstandingDue = client.totalContractPayment - client.amountPaid;
                
                const totalVideosPlanned = client.videosCompleted + client.videosRemaining;
                const pipelineCompletionPct = totalVideosPlanned > 0 
                  ? Math.round((client.videosCompleted / totalVideosPlanned) * 100) 
                  : 0;

                return (
                  <div 
                    key={client.id} 
                    className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_#000000] overflow-hidden transition-all duration-150"
                  >
                    <div className="px-5 py-4 flex justify-between items-center border-b-3 border-black" style={{ backgroundColor: theme.bg }}>
                      <div onClick={() => setExpandedClientId(isExpanded ? null : client.id)} className="cursor-pointer flex-1 pr-2">
                        <h3 className="font-black text-sm tracking-tight text-black font-mono-display uppercase">{client.name}</h3>
                        <p className="text-[9px] font-bold text-black/60">CONTRACT OPENED: {client.agreementDate}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] px-2 py-0.5 rounded font-black border-2 border-black bg-white">{client.videosRemaining} REMAINING</span>
                        <span className="text-[8px] bg-black text-white px-1.5 rounded">{client.videosPerWeek}/WK TARGET</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 bg-white space-y-4 font-mono text-xs border-b-2 border-black">
                        
                        {/* NEO-BRUTALIST PROGRESS BAR */}
                        <div className="border-2 border-black p-3 bg-[#FCF8F2] rounded-xl shadow-[2px_2px_0px_0px_#000]">
                          <div className="flex justify-between items-center text-[9px] font-black uppercase mb-1.5 text-black">
                            <span>🎬 PIPELINE COMPLETION DYNAMICS</span>
                            <span className="bg-black text-[#B1E55A] px-1.5 py-0.5 rounded text-[8px]">
                              {pipelineCompletionPct}% DELIVERED
                            </span>
                          </div>
                          <div className="w-full bg-white h-4 border-2 border-black relative rounded overflow-hidden p-0.5 shadow-[inner_1px_1px_2px_rgba(0,0,0,0.2)]">
                            <div 
                              className="bg-[#B1E55A] h-full border-r-2 border-black transition-all duration-300" 
                              style={{ width: `${pipelineCompletionPct}%` }} 
                            />
                          </div>
                          <div className="flex justify-between text-[8px] text-gray-400 font-bold mt-1 uppercase">
                            <span>Engine Start ({client.videosCompleted} Built)</span>
                            <span>{client.videosRemaining} Units Left</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-3 rounded-xl border border-black/10">
                          <div>
                            <span className="block text-[9px] text-gray-400 font-bold uppercase">REMAINING UNITS</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <button onClick={() => adjustVideoCount(client.id, 'videosRemaining', -1)} className="bg-black text-white w-6 h-6 rounded border font-bold">-</button>
                              <span className="font-black text-sm">{client.videosRemaining}</span>
                              <button onClick={() => adjustVideoCount(client.id, 'videosRemaining', 1)} className="bg-black text-white w-6 h-6 rounded border font-bold">+</button>
                            </div>
                          </div>
                          <div>
                            <span className="block text-[9px] text-gray-400 font-bold uppercase">COMPLETED VECTOR UNITS</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <button onClick={() => adjustVideoCount(client.id, 'videosCompleted', -1)} className="bg-black text-white w-6 h-6 rounded border font-bold">-</button>
                              <span className="font-black text-sm text-emerald-600">{client.videosCompleted}</span>
                              <button onClick={() => adjustVideoCount(client.id, 'videosCompleted', 1)} className="bg-black text-white w-6 h-6 rounded border font-bold">+</button>
                            </div>
                          </div>
                        </div>

                        {/* Financial Audit Sub-Panel Input Interface */}
                        <div className="border-2 border-black p-3 rounded-xl bg-[#FCF8F2] relative">
                          <span className="absolute -top-2.5 left-3 bg-[#FFD93D] border border-black text-[8px] font-black uppercase px-2 py-0.5 rounded">
                            Financial Node Metrics Calibration
                          </span>
                          {editingClientId === client.id ? (
                            <div className="space-y-3 pt-1">
                              <div className="grid grid-cols-2 gap-2">
                                <label className="block">
                                  <span className="text-[8px] font-black text-gray-500 block uppercase">Contract Value ($)</span>
                                  <input type="number" value={editTotalPayment} onChange={e => setEditTotalPayment(e.target.value)} className="w-full border border-black p-1 bg-white font-black text-xs rounded" />
                                </label>
                                <label className="block">
                                  <span className="text-[8px] font-black text-gray-500 block uppercase">Paid Segment ($)</span>
                                  <input type="number" value={editPaid} onChange={e => setEditPaid(e.target.value)} className="w-full border border-black p-1 bg-white font-black text-xs rounded" />
                                </label>
                              </div>
                              <label className="block">
                                <span className="text-[8px] font-black text-gray-500 block uppercase">Target Pacing Core (Videos/Wk)</span>
                                <input type="number" value={weeklyTarget} onChange={e => setWeeklyTarget(parseInt(e.target.value) || 0)} className="w-full border border-black p-1 bg-white font-black text-xs rounded" />
                              </label>
                              <div className="flex gap-2 justify-end pt-1">
                                <button type="button" onClick={() => setEditingClientId(null)} className="text-[9px] font-black uppercase text-gray-400">[Abort]</button>
                                <button type="button" onClick={() => saveParameterMutation(client.id)} className="bg-black text-white px-2 py-1 text-[9px] font-black uppercase border border-black rounded">Commit</button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center pt-1.5">
                              <div className="grid grid-cols-3 gap-4 text-center w-full pr-4">
                                <div>
                                  <span className="text-[8px] text-gray-400 font-bold block uppercase">Booked Value</span>
                                  <span className="font-black text-xs">${client.totalContractPayment}</span>
                                </div>
                                <div>
                                  <span className="text-[8px] text-gray-400 font-bold block uppercase">Withdrawn</span>
                                  <span className="font-black text-xs text-emerald-600">${client.amountPaid}</span>
                                </div>
                                <div>
                                  <span className="text-[8px] text-gray-400 font-bold block uppercase">Arrears Due</span>
                                  <span className={`font-black text-xs ${outstandingDue > 0 ? 'text-red-500' : 'text-neutral-500'}`}>${outstandingDue}</span>
                                </div>
                              </div>
                              <button type="button" onClick={() => initParameterMutation(client)} className="text-[9px] font-black border-2 border-black rounded p-1 bg-white hover:bg-neutral-50 uppercase shrink-0">
                                Adjust
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Operational Node Execution Controls Drawer */}
                    <div className="bg-neutral-50 px-4 py-2 border-t-2 border-neutral-100 flex justify-between items-center text-[10px] font-mono">
                      <div className="flex space-x-1">
                        <button onClick={() => moveClient(index, 'up')} disabled={index === 0} className="px-2 py-1 bg-white border border-black rounded disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-50 font-bold">▲</button>
                        <button onClick={() => moveClient(index, 'down')} disabled={index === clients.length - 1} className="px-2 py-1 bg-white border border-black rounded disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-50 font-bold">▼</button>
                      </div>
                      <button 
                        onClick={() => handleDeleteClient(client.id)} 
                        className="text-neutral-400 hover:text-red-600 font-black tracking-tighter transition-colors uppercase text-[9px]"
                      >
                        ⚡ DECOMMISSION REVENUE NODE
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECONDARY TRACKER UTILITIES COLUMN CANVAS LAYER (COLUMNS 8-12) */}
          <div className="lg:col-span-5 space-y-6 w-full">
            <MilestoneTracker 
              onTodoStateChange={setGlobalCompletedTodos} 
              refreshTrigger={todoRefreshTrigger} 
            />
            <PaymentRadarCalendar clients={clients} />
            <PredictionForecaster totalRemainingVideos={totalRemainingVideosCount} weeklyVelocity={totalWeeklyVelocity} />
          </div>
        </div>

        {/* --- MODULE LAYER 2: MARGINS MATRIX --- */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <ProfitabilityMatrix clientData={clients} />
          </div>
        </div>
      </main>

      {/* FIXED PIPELINE VALUE MONITORS AGGREGATOR PANEL LAYER */}
      <AggregatePipelineRevenue clientCollection={clients} />
    </div>
  );
}
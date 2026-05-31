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
  const hues = [195, 45, 145, 25, 165, 330, 210, 90]; 
  const hue = hues[Math.abs(hash % hues.length)];
  
  return {
    bg: `hsl(${hue}, 95%, 85%)`,
    accent: `hsl(${hue}, 100%, 70%)`,
    tabBg: `hsl(${hue}, 95%, 78%)`
  };
};

const STAGES = ["IDEAS", "SHOT", "EDITING", "AWAITING APPROVAL", "SCHEDULED", "POSTED"];

// ==========================================
// --- NEW FEATURE 1: CAPACITY ANALYZER ---
// ==========================================
function CapacityAnalyzer({ assignedVideos, totalHours }) {
  const maxHours = 35;
  const utilization = Math.round((totalHours / maxHours) * 100);
  
  let systemColor = "bg-[#B1E55A]"; // Healthy Pastel Green
  let statusLabel = "HEALTHY WORKLOAD";
  
  if (utilization >= 80 && utilization < 100) {
    systemColor = "bg-[#FFDE4D]"; // Warning Yellow
    statusLabel = "NEAR LIMIT WARNING";
  } else if (utilization >= 100) {
    systemColor = "bg-[#FF6B6B]"; // Overload Red
    statusLabel = "CRITICAL OVERLOAD: RECOVERY NEEDED";
  }

  return (
    <div className="w-full bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      <div className="relative z-10">
        <div className="flex justify-between items-center border-b-4 border-black pb-3 mb-4">
          <span className="text-xs bg-black text-white px-2 py-1 uppercase tracking-widest font-bold">SYS_MONITOR // CAPACITY</span>
          <span className="text-xs font-bold text-gray-500">REV_2026.05</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center justify-center border-4 border-black p-4 bg-[#F0E6FF] h-48 relative shadow-[4px_4px_0px_0px_#000000] rounded-xl">
            <div className="w-28 h-28 rounded-full border-4 border-black border-t-transparent flex items-center justify-center bg-white animate-pulse">
              <div className="text-center">
                <span className="block text-3xl font-black tracking-tighter">{utilization}%</span>
                <span className="text-[9px] font-black uppercase tracking-tight bg-black text-white px-1">UTIL_RATE</span>
              </div>
            </div>
            <span className="absolute top-1 left-1 text-[9px] font-bold text-gray-500">⚡ CAP_SYS</span>
          </div>
          <div className="space-y-2">
            <div className="border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_#000000] rounded-lg">
              <span className="block text-[10px] uppercase font-bold text-gray-500">Assigned Production Nodes</span>
              <span className="text-xl font-black">{assignedVideos} Videos</span>
            </div>
            <div className="border-2 border-black p-2 bg-white shadow-[2px_2px_0px_0px_#000000] rounded-lg">
              <span className="block text-[10px] uppercase font-bold text-gray-500">Est. Editing Hours</span>
              <span className="text-xl font-black">{totalHours} Hrs</span>
            </div>
          </div>
          <div className={`border-4 border-black p-4 h-full flex flex-col justify-between shadow-[4px_4px_0px_0px_#000000] rounded-xl ${systemColor}`}>
            <div>
              <span className="text-xs uppercase font-black block border-b-2 border-black pb-1 mb-2">STRESS RISK LABEL</span>
              <p className="text-sm font-black leading-tight uppercase tracking-tight">{statusLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// --- NEW FEATURE 2: SHOOT SCHEDULER ---
// ==========================================
function ShootScheduler({ shoots }) {
  return (
    <div className="w-full bg-[#FCF8F2] border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono rounded-2xl">
      <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎥</span>
          <h2 className="text-sm font-black tracking-tight uppercase">Production Logistics Run</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {shoots.map((shoot, idx) => (
          <div key={idx} className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between rounded-xl overflow-hidden">
            <div className="bg-[#E3F2FD] p-3 border-b-4 border-black flex justify-between items-center">
              <div>
                <span className="text-[9px] font-black uppercase text-gray-500 block">CLIENT PIPELINE</span>
                <span className="text-xs font-black uppercase tracking-tight">{shoot.clientName}</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 border-2 border-black rounded uppercase ${shoot.approved ? 'bg-[#B1E55A]' : 'bg-[#FFDE4D]'}`}>
                {shoot.approved ? 'APPROVED' : 'PENDING'}
              </span>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2 border-b-2 border-black bg-neutral-50 text-[10px] font-bold">
              <div>📍 LOC: {shoot.location}</div>
              <div>📅 DATE: {shoot.date}</div>
            </div>
            <div className="p-3 border-b-2 border-black bg-white">
              <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">Batch Deliverables</span>
              <div className="flex flex-wrap gap-1">
                {shoot.deliverables.map((item, i) => (
                  <span key={i} className="bg-black text-white text-[9px] px-2 py-0.5 font-bold uppercase rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 bg-[#FFF9E6] text-[10px] font-bold">
              <span className="text-[9px] font-black uppercase text-gray-500 block mb-1.5">⚡ Deployment Kit Configuration</span>
              <div className="grid grid-cols-2 gap-1.5">
                {shoot.equipment.map((kit, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 border border-black flex items-center justify-center ${kit.packed ? 'bg-black text-white' : 'bg-white'}`}>
                      {kit.packed && '✓'}
                    </div>
                    <span className="uppercase tracking-tight text-[9px]">{kit.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// --- NEW FEATURE 3: DEADLINE PREDICTOR ---
// ==========================================
function DeadlinePredictor({ totalVideos, completedVideos, weeklyVelocity }) {
  const remaining = totalVideos - completedVideos;
  const weeksToCompletion = weeklyVelocity > 0 ? remaining / weeklyVelocity : 0;
  
  const estCompletionDate = new Date();
  estCompletionDate.setDate(estCompletionDate.getDate() + (weeksToCompletion * 7));
  
  const formattedDate = estCompletionDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  const completionPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  let paceStatus = "ON TRACK";
  let paceBg = "bg-[#B1E55A]";
  if (weeklyVelocity < 3) {
    paceStatus = "BEHIND TARGET SPEED";
    paceBg = "bg-[#FF6B6B]";
  }

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
// --- NEW FEATURE 4: PROFITABILITY MATRIX ---
// ==========================================
function ProfitabilityMatrix({ clientData }) {
  return (
    <div className="w-full bg-[#FFF5F5] border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono rounded-2xl">
      <div className="border-b-4 border-black pb-2 mb-4">
        <h2 className="text-sm font-black uppercase tracking-tight">📊 Client Profitability Matrix</h2>
      </div>
      <div className="overflow-x-auto border-2 border-black rounded-xl bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white text-[10px] uppercase font-bold border-b border-black">
              <th className="p-2">Manifest</th>
              <th className="p-2">Eff. Hourly</th>
              <th className="p-2">Profit Score</th>
              <th className="p-2">Feedback Alert</th>
            </tr>
          </thead>
          <tbody className="text-[10px] font-bold divide-y divide-neutral-200">
            {clientData.map((client, idx) => {
              const effectiveRate = client.hoursSpent > 0 ? Math.round(client.revenue / client.hoursSpent) : client.revenue;
              const isHighEffort = effectiveRate < 45 || client.revisions > 10;
              return (
                <tr key={idx} className={effectiveRate > 100 ? "bg-[#EFFFEC]" : "bg-white"}>
                  <td className="p-2 uppercase font-black">{client.name}</td>
                  <td className="p-2">${effectiveRate}/hr</td>
                  <td className="p-2">⚡ {client.profitScore}/100</td>
                  <td className="p-2">
                    {isHighEffort ? (
                      <span className="bg-[#FF6B6B] text-black border border-black px-1 py-0.5 text-[8px] uppercase tracking-tighter rounded">⚠️ EFFORT ALERT</span>
                    ) : (
                      <span className="text-green-700 text-[8px] uppercase tracking-widest">★ HIGH_YIELD</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// --- NEW FEATURE 5: CONTENT PIPELINE ---
// ==========================================
function ContentPipelineView({ cards }) {
  return (
    <div className="w-full bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono rounded-2xl">
      <div className="border-b-4 border-black pb-3 mb-4 flex justify-between items-center">
        <span className="text-sm font-black uppercase tracking-tight">📋 Content Production Pipeline Layout</span>
        <span className="text-[9px] bg-[#FFDE4D] border-2 border-black px-2 py-0.5 font-bold uppercase rounded">Hacker Matrix</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {STAGES.map((stage, sIdx) => {
          const stageCards = cards.filter(c => c.stage.toUpperCase() === stage);
          return (
            <div key={sIdx} className="bg-[#F9F9F9] border-2 border-black p-2 min-h-[180px] flex flex-col rounded-xl">
              <div className="bg-black text-white text-[9px] p-1 font-black text-center tracking-tight uppercase mb-2 rounded">
                {stage} ({stageCards.length})
              </div>
              <div className="space-y-2 flex-1 overflow-y-auto">
                {stageCards.map((card, cIdx) => (
                  <div key={cIdx} className="bg-white border border-black p-2 rounded-lg shadow-[2px_2px_0px_0px_#000]">
                    <div className="flex justify-between items-center text-[8px] mb-1">
                      <span className="font-bold border border-black px-0.5 bg-neutral-100 uppercase">{card.platform}</span>
                      <span className={card.priority === 'HIGH' ? 'text-red-600 font-black' : 'text-gray-400'}>{card.priority}</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-tight leading-tight">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// --- NEW FEATURE 6: BURNOUT PREVENTION ---
// ==========================================
function BurnoutPreventionSystem({ telemetry }) {
  const recoveryScore = Math.max(0, Math.min(100, Math.round(
    (telemetry.sleepHours * 8) - (telemetry.consecutiveWorkDays * 5) - (telemetry.editingHours * 2) + 50
  )));
  const burnoutRisk = 100 - recoveryScore;

  let panelTone = "bg-[#B1E55A]"; 
  let directive = "SYSTEM INTEGRITY RECOVERY MATRIX IS NOMINAL. CONTINUE WORKFLOW SLOTS.";

  if (burnoutRisk >= 50 && burnoutRisk < 75) {
    panelTone = "bg-[#FFDE4D]"; 
    directive = "DECREASE EDIT BATCH VELOCITY. SCHEDULE 2-HOUR OFFLINE RECOVERY.";
  } else if (burnoutRisk >= 75) {
    panelTone = "bg-[#FF6B6B]"; 
    directive = "CRITICAL EXHAUSTION IMMINENT. TERMINATE ACTIVE APP INSTANCES.";
  }

  return (
    <div className="w-full bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono relative rounded-2xl">
      <div className="border-b-4 border-black pb-3 mb-4 flex justify-between items-center">
        <h3 className="text-xs font-black uppercase tracking-tight">🫀 PILOT HEALTH WELLNESS SYSTEM</h3>
        <span className="text-[9px] bg-black text-white px-1.5 font-bold rounded">BIO_METRIC_V2</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3 text-[10px] font-bold">
        <div className="border border-black p-1.5 bg-neutral-50 rounded-lg">💤 Sleep: {telemetry.sleepHours} Hrs</div>
        <div className="border border-black p-1.5 bg-neutral-50 rounded-lg">📅 Stack: {telemetry.consecutiveWorkDays} Days</div>
        <div className="border border-black p-1.5 bg-neutral-50 rounded-lg">🎬 Cuts: {telemetry.editingHours} Hrs/d</div>
        <div className="border border-black p-1.5 bg-neutral-50 rounded-lg">🔋 Core: {telemetry.energyLevel}</div>
      </div>
      <div className="border border-black p-2 bg-[#FAF9F6] mb-3 rounded-xl">
        <div className="flex justify-between text-[9px] font-black mb-1">
          <span>BURNOUT RISK VECTOR</span>
          <span>{burnoutRisk}% RATIO</span>
        </div>
        <div className="w-full bg-neutral-200 h-2 border border-black rounded overflow-hidden">
          <div className={`h-full ${panelTone}`} style={{ width: `${burnoutRisk}%` }} />
        </div>
      </div>
      <div className={`border-2 border-black p-2.5 text-[10px] font-black rounded-xl ${panelTone}`}>
        <p className="uppercase tracking-tight leading-tight">{directive}</p>
      </div>
    </div>
  );
}

// ==========================================
// --- COMPONENT: STICKY TODO LOG ---
// ==========================================
const StickyTodoLog = ({ refreshTrigger, onTodoStateChange }) => {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState('');
  const [expandedDates, setExpandedDates] = useState({});

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
    onTodoStateChange(updated.filter(t => t.completed).length);
    await supabase.from('todos').update({ completed: !currentStatus }).eq('id', id);
  };

  const deleteTodo = async (id) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    onTodoStateChange(updated.filter(t => t.completed).length);
    await supabase.from('todos').delete().eq('id', id);
  };

  const toggleDateAccordion = (dateStr) => {
    setExpandedDates(prev => ({ ...prev, [dateStr]: !prev[dateStr] }));
  };

  const formatGroupHeader = (dateStr) => {
    if (dateStr === todayStr) return "⚡ TODAY'S ACTION RUN";
    const event = new Date(dateStr + 'T00:00:00');
    return event.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();
  };

  return (
    <div className="bg-[#C3F2CB] border-3 border-black rounded-2xl p-4 shadow-[5px_5px_0px_0px_#000] lg:-rotate-1 w-full relative overflow-hidden">
      <div className="absolute -top-3 left-1/3 -translate-x-1/2 bg-neutral-900/10 backdrop-blur-xs border border-dashed border-black/30 px-4 py-1 text-[9px] font-mono tracking-widest text-black/60 uppercase rotate-1">
        📝 TASK VAULT
      </div>

      <div className="mb-3 border-b-2 border-black pb-1.5 mt-2">
        <span className="text-[11px] font-black text-black uppercase tracking-wider block font-mono-display">CHRONO LOG MATRIX</span>
      </div>

      <form onSubmit={handleAddTodo} className="flex gap-1.5 mb-4">
        <input 
          type="text"
          value={newText}
          onChange={e => setNewText(e.target.value)}
          placeholder="ADD DAILY CUT OBJECTIVE..."
          className="flex-1 border-2 border-black bg-white rounded-xl px-2.5 py-2 text-[10px] font-mono font-black placeholder-black/30 outline-none uppercase"
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
                    <div key={todo.id} className="flex items-center justify-between p-1.5 rounded-lg border border-black/10 hover:border-black bg-white transition-all group">
                      <div onClick={() => toggleTodo(todo.id, todo.completed)} className="flex items-center space-x-2 cursor-pointer flex-1 min-w-0">
                        <div className={`w-3.5 h-3.5 rounded border border-black flex items-center justify-center shrink-0 ${todo.completed ? 'bg-black text-[#C3F2CB]' : 'bg-neutral-50'}`}>
                          {todo.completed && <span className="text-[8px] font-black">✓</span>}
                        </div>
                        <span className={`text-[10px] font-mono font-bold uppercase truncate ${todo.completed ? 'line-through text-black/30' : 'text-black'}`}>
                          {todo.text}
                        </span>
                      </div>
                      <button type="button" onClick={() => deleteTodo(todo.id)} className="text-[9px] font-black text-red-500 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all px-1">✕</button>
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
};

// ==========================================
// --- COMPONENT: ROLLING MATRIX CALENDAR ---
// ==========================================
const GlobalCalendarSticky = ({ clients }) => {
  const today = new Date();
  const [monthOffset, setMonthOffset] = useState(0);

  const rollingDays = useMemo(() => {
    const days = [];
    const baseDateAdjustment = monthOffset * 30; 
    
    for (let i = 0; i < 35; i++) {
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + baseDateAdjustment + i);
      days.push(futureDate);
    }
    return days;
  }, [monthOffset]);

  const dayScheduleMap = useMemo(() => {
    const map = {};
    rollingDays.forEach(dateObj => {
      const dateKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
      map[dateKey] = [];
      clients.forEach(client => {
        if (!client.agreementDate) return;
        const agreement = new Date(client.agreementDate);
        if (agreement.getDate() === dateObj.getDate()) {
          map[dateKey].push(client);
        }
      });
    });
    return map;
  }, [clients, rollingDays]);

  const startMonthLabel = rollingDays[0]?.toLocaleString('default', { month: 'short' }).toUpperCase();
  const endMonthLabel = rollingDays[rollingDays.length - 1]?.toLocaleString('default', { month: 'short' }).toUpperCase();
  const rangeLabel = startMonthLabel === endMonthLabel ? startMonthLabel : `${startMonthLabel} / ${endMonthLabel}`;

  return (
    <div className="bg-[#FEF08A] border-3 border-black rounded-2xl p-4 shadow-[5px_5px_0px_0px_#000] lg:rotate-1 w-full relative">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900/10 backdrop-blur-xs border border-dashed border-black/30 px-6 py-1 text-[9px] font-mono tracking-widest text-black/60 uppercase -rotate-2">
        📌 PAYMENT RADAR
      </div>

      <div className="flex justify-between items-center mb-3 border-b-2 border-black pb-2 mt-2">
        <button type="button" onClick={() => setMonthOffset(prev => prev - 1)} className="bg-black text-white hover:bg-neutral-800 font-mono font-black w-6 h-6 rounded flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_#fff] text-xs transition-transform active:translate-y-0.5">◀</button>
        <div className="text-center">
          <span className="text-[11px] font-black text-black uppercase tracking-wider block font-mono-display">UPCOMING REVENUE</span>
          <span className="font-mono text-[9px] font-black bg-black text-white px-2 py-0.5 rounded tracking-tighter inline-block mt-0.5">{rangeLabel} {rollingDays[0]?.getFullYear()}</span>
        </div>
        <button type="button" onClick={() => setMonthOffset(prev => prev + 1)} className="bg-black text-white hover:bg-neutral-800 font-mono font-black w-6 h-6 rounded flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_#fff] text-xs transition-transform active:translate-y-0.5">▶</button>
      </div>
      
      <div className="grid grid-cols-7 gap-1.5">
        {rollingDays.map((dateObj, i) => {
          const dayNumber = dateObj.getDate();
          const monthLabel = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
          const dateKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
          const matchingClients = dayScheduleMap[dateKey] || [];
          const hasPayments = matchingClients.length > 0;
          const isAbsoluteToday = dateObj.getFullYear() === today.getFullYear() && dateObj.getMonth() === today.getMonth() && dateObj.getDate() === today.getDate();
          const isPastDay = dateObj < today && !isAbsoluteToday;
          const isFirstOfMonth = dayNumber === 1;

          let gridBgStyle = {};
          let cardClasses = "border-black/10 text-black/30 bg-white/40";

          if (hasPayments) {
            if (isPastDay) {
              cardClasses = "border-neutral-300 bg-neutral-200/50 text-neutral-400 line-through opacity-40 select-none pointer-events-none";
            } else {
              const firstClientTheme = generateUniqueTheme(matchingClients[0].id + matchingClients[0].name);
              gridBgStyle = { backgroundColor: firstClientTheme.accent };
              cardClasses = "border-3 border-black font-black text-black shadow-[3px_3px_0px_0px_#000] scale-105 z-10 cursor-help transition-transform hover:scale-110";
            }
          } else if (isAbsoluteToday) {
            cardClasses = "border-2 border-black text-black font-black bg-white/90 ring-4 ring-black/5";
          } else if (isFirstOfMonth) {
            cardClasses = "border border-neutral-400 text-neutral-800 font-black bg-amber-100/70";
          }

          return (
            <div key={dateKey} className={`aspect-square text-[9px] flex flex-col items-center justify-between border rounded p-0.5 relative group transition-all ${cardClasses}`} style={gridBgStyle}>
              <div className="flex justify-between w-full items-center leading-none">
                <span className="font-mono font-black">{dayNumber}</span>
                {isAbsoluteToday && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />}
              </div>
              {(isFirstOfMonth || i === 0 || i === 34) && <span className="text-[7px] uppercase tracking-tighter text-black/50 font-sans font-extrabold block text-center scale-90">{monthLabel}</span>}
              {hasPayments && (
                <>
                  <div className="flex space-x-0.5 max-w-full overflow-hidden justify-center pb-0.5">
                    {matchingClients.map(c => <div key={c.id} className={`w-2 h-2 rounded-full border border-black/30 ${isPastDay ? 'bg-neutral-400' : 'bg-emerald-500'}`} />)}
                  </div>
                  {!isPastDay && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-[9px] p-2 rounded-lg border-2 border-black font-black whitespace-nowrap z-50 shadow-[2px_2px_0px_0px_#A3E635]">
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
          <p className="text-[10px] font-bold font-mono text-black/40 italic">No active production streams connected.</p>
        ) : (
          <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
            {rollingDays
              .filter(dateObj => {
                const dateKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
                const hasMatch = (dayScheduleMap[dateKey] || []).length > 0;
                const isAbsoluteToday = dateObj.getFullYear() === today.getFullYear() && dateObj.getMonth() === today.getMonth() && dateObj.getDate() === today.getDate();
                return hasMatch && !(dateObj < today && !isAbsoluteToday);
              })
              .map(dateObj => {
                const dateKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
                const matchedList = dayScheduleMap[dateKey];
                return matchedList.map(c => (
                  <div key={`${dateKey}-${c.id}`} className="flex justify-between items-center text-[10px] font-black border border-black p-1.5 rounded bg-white shadow-[1px_1px_0px_0px_#000]">
                    <span className="flex items-center truncate max-w-[150px]">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black mr-1.5 inline-block" />
                      <span className="truncate">{c.name}</span>
                    </span>
                    <span className="font-mono bg-black text-white px-1.5 rounded text-[8px] uppercase tracking-tighter">{dateObj.toLocaleString('default', { month: 'short' }).toUpperCase()} {dateObj.getDate()}</span>
                  </div>
                ));
              })}
            {rollingDays.every(d => {
              const dk = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
              return (dayScheduleMap[dk] || []).length === 0 || (d < today && !(d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()));
            }) && (
              <p className="text-[10px] text-neutral-400 font-bold italic font-mono py-2 text-center bg-white/30 border border-dashed border-black/10 rounded-xl">No upcoming payouts pending.</p>
            )}
          </div>
        )}
        {monthOffset !== 0 && <button type="button" onClick={() => setMonthOffset(0)} className="w-full text-center text-[8px] font-black uppercase text-blue-600 block pt-1 hover:underline tracking-tight">↺ RESET TARGET TO TODAY</button>}
      </div>
    </div>
  );
};

// ==========================================
// --- CORE WORKSPACE OPERATING SYSTEM ---
// ==========================================
export default function App() {
  const [clients, setClients] = useState([]);
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedTodosCount, setCompletedTodosCount] = useState(0);
  const [todoRefreshTrigger, setTodoRefreshTrigger] = useState(0);
  const [showRevenue, setShowRevenue] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTotalPayment, setNewTotalPayment] = useState('');
  const [newRemaining, setNewRemaining] = useState('');
  const [newVideosPerWeek, setNewVideosPerWeek] = useState('');

  const [editingClientId, setEditingClientId] = useState(null);
  const [editTotalPayment, setEditTotalPayment] = useState('');
  const [editPaid, setEditPaid] = useState('');
  const [editVideosPerWeek, setEditVideosPerWeek] = useState('');

  // Mock data states hooked up to pipeline matrices
  const [mockShoots] = useState([
    { clientName: "AMHARIC MAGNETIC ALPHABET", date: "2026-06-04", location: "Studio Zone B (Addis Ababa)", deliverables: ["3x Macro Product Reels", "1x BTS Loop"], equipment: [{ name: "FX3 Rig Alpha", packed: true }, { name: "90mm Macro Lens", packed: true }, { name: "DJI Mic Tx/Rx", packed: false }], approved: true, assignedBatch: "BATCH_RUN_04_AMHARIC" },
    { clientName: "FAATRA TRADING", date: "2026-06-10", location: "Global Logistics Hub", deliverables: ["1x Futuristic Corporate Ad"], equipment: [{ name: "Mavic 3 Cine Drone", packed: false }, { name: "Anamorphic Prime Kit", packed: true }], approved: false, assignedBatch: "BATCH_RUN_05_LOGISTICS" }
  ]);

  const [mockPipelineCards] = useState([
    { id: "204", title: "Injera Character Asset Loop V1", stage: "EDITING", platform: "TIKTOK", priority: "HIGH" },
    { id: "205", title: "Jebena Silhouette Drop Frame Cut", stage: "AWAITING APPROVAL", platform: "INSTAGRAM", priority: "MEDIUM" },
    { id: "206", title: "Amharic Typography Kinetic Intro", stage: "IDEAS", platform: "YOUTUBE", priority: "LOW" },
    { id: "207", title: "FAATRA Drone Run B-Roll Sequence", stage: "SHOT", platform: "YOUTUBE", priority: "HIGH" }
  ]);

  const [vitalTelemetry] = useState({ 
    sleepHours: 5.8, 
    consecutiveWorkDays: 6, 
    editingHours: 9.5, 
    energyLevel: "DIMINISHED" 
  });

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase.from('clients').select('*').order('position', { ascending: true });
      if (error) throw error;
      const mapped = (data || []).map(c => ({
        id: c.id,
        name: c.name,
        agreementDate: c.agreement_date,
        videosRemaining: c.videos_remaining,
        videosCompleted: c.videos_completed,
        totalContractPayment: c.total_contract_payment,
        amountPaid: c.amount_paid,
        videosPerWeek: c.videos_per_week || 0,
        position: c.position
      }));
      setClients(mapped);
      if (mapped.length > 0 && !expandedClientId) setExpandedClientId(mapped[0].id);
    } catch (err) {
      console.error("Database sync dropped:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  // Compute stats for dynamic performance matrices
  const totalRemainingVideosCount = useMemo(() => clients.reduce((sum, c) => sum + c.videosRemaining, 0), [clients]);
  const totalWeeklyQuotaHours = useMemo(() => clients.reduce((sum, c) => sum + (c.videosPerWeek * 2.5), 0), [clients]);

  const totalPendingPayout = useMemo(() => {
    return clients.reduce((sum, c) => sum + Math.max(0, c.totalContractPayment - c.amountPaid), 0);
  }, [clients]);

  const convertedProfitMatrixLogs = useMemo(() => {
    return clients.map(c => ({
      name: c.name,
      revenue: c.totalContractPayment,
      hoursSpent: (c.videosCompleted * 3) || 1,
      revisions: 4,
      difficultyRating: c.videosPerWeek > 4 ? 4 : 2,
      profitScore: c.totalContractPayment > 3000 ? 92 : 65
    }));
  }, [clients]);

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newName || !newDate) return;
    
    const id = Date.now().toString();
    const videoCount = parseInt(newRemaining) || 0;
    const weeklyTarget = parseInt(newVideosPerWeek) || 0;
    
    const clientPayload = {
      id, 
      name: newName.toUpperCase(), 
      agreement_date: newDate,
      videos_remaining: videoCount, 
      videos_completed: 0,
      total_contract_payment: parseInt(newTotalPayment) || 0, 
      amount_paid: 0,
      videos_per_week: weeklyTarget
    };

    try {
      const { error: clientError } = await supabase.from('clients').insert([clientPayload]);
      if (clientError) throw clientError;

      const generatedTasks = [];
      const todayStr = new Date().toISOString().split('T')[0];

      if (videoCount > 0) {
        for (let i = 1; i <= videoCount; i++) {
          generatedTasks.push({
            id: `${id}-task-${i}-${Date.now()}`,
            text: `${newName.toUpperCase()} - REEL #${i} CUT`,
            completed: false,
            date: todayStr
          });
        }
      }

      if (weeklyTarget > 0) {
        for (let i = 1; i <= weeklyTarget; i++) {
          generatedTasks.push({
            id: `${id}-weekly-task-${i}-${Date.now()}`,
            text: `${newName.toUpperCase()} - WEEKLY REEL #${i}`,
            completed: false,
            date: todayStr
          });
        }
        const dailyTargetValue = Math.ceil(weeklyTarget / 5);
        generatedTasks.push({
          id: `${id}-daily-target-${Date.now()}`,
          text: `🎯 ${newName.toUpperCase()} - DAILY TARGET: ${dailyTargetValue} ${dailyTargetValue === 1 ? 'VIDEO' : 'VIDEOS'} / DAY`,
          completed: false,
          date: todayStr
        });
      }

      if (generatedTasks.length > 0) {
        const { error: todoError } = await supabase.from('todos').insert(generatedTasks);
        if (todoError) throw todoError;
      }

      await fetchClients();
      setTodoRefreshTrigger(prev => prev + 1);
      setExpandedClientId(id);
      setNewName(''); setNewDate(''); setNewTotalPayment(''); setNewRemaining(''); setNewVideosPerWeek('');
    } catch (err) { 
      alert("Failed creating client sequence nodes: " + err.message); 
    }
  };

  const startEditing = (client) => {
    setEditingClientId(client.id);
    setEditTotalPayment(client.totalContractPayment);
    setEditPaid(client.amountPaid);
    setEditVideosPerWeek(client.videosPerWeek);
  };

  const saveEdit = async (clientId) => {
    const weeklyTarget = parseInt(editVideosPerWeek) || 0;
    const client = clients.find(c => c.id === clientId);

    try {
      const { error } = await supabase.from('clients').update({ 
        total_contract_payment: parseInt(editTotalPayment) || 0, 
        amount_paid: parseInt(editPaid) || 0,
        videos_per_week: weeklyTarget
      }).eq('id', clientId);
      if (error) throw error;

      const todayStr = new Date().toISOString().split('T')[0];
      const incrementalTasks = [];

      if (weeklyTarget > (client?.videosPerWeek || 0)) {
        const discrepancy = weeklyTarget - (client?.videosPerWeek || 0);
        for (let i = 1; i <= discrepancy; i++) {
          incrementalTasks.push({
            id: `${clientId}-incremental-task-${i}-${Date.now()}`,
            text: `${client.name} - NEW WEEKLY OBJ COMPONENT`,
            completed: false,
            date: todayStr
          });
        }
      }

      if (weeklyTarget > 0 && weeklyTarget !== client?.videosPerWeek) {
        const revisedDailyTarget = Math.ceil(weeklyTarget / 5);
        incrementalTasks.push({
          id: `${clientId}-revised-daily-${Date.now()}`,
          text: `🎯 ${client.name} - REVISED TARGET: ${revisedDailyTarget} VIDEOS / DAY`,
          completed: false,
          date: todayStr
        });
      }

      if (incrementalTasks.length > 0) {
        await supabase.from('todos').insert(incrementalTasks);
        setTodoRefreshTrigger(prev => prev + 1);
      }

      setClients(prev => prev.map(c => c.id === clientId ? { 
        ...c, 
        totalContractPayment: parseInt(editTotalPayment) || 0, 
        amountPaid: parseInt(editPaid) || 0,
        videosPerWeek: weeklyTarget
      } : c));
      setEditingClientId(null);
    } catch (err) { alert("Failed updating database row parameters: " + err.message); }
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
    } catch (err) { console.error("Increment sync drop:", err.message); }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("ERASE THIS ACTIVE RECORD PROFILE?")) return;
    try {
      const { error } = await supabase.from('clients').delete().eq('id', clientId);
      if (error) throw error;
      setClients(prev => prev.filter(c => c.id !== clientId));
      if (expandedClientId === clientId) setExpandedClientId(null);
    } catch (err) { alert("Drop command failure: " + err.message); }
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
    } catch (err) { console.error("Restructuring aborted:", err.message); }
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] text-black p-4 lg:p-6 font-mono relative selection:bg-black selection:text-white antialiased">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="relative z-10 max-w-[1750px] mx-auto space-y-6">
        
        {/* --- OS TERMINAL COMMAND HEADER --- */}
        <header className="bg-black text-white p-4 border-4 border-black shadow-[5px_5px_0px_0px_#000000] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-2xl">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
              <span>⚡ NATEHUB // OPERATING_SYSTEM</span>
              <span className="text-[10px] bg-[#B1E55A] text-black font-black px-1 py-0.5 tracking-normal">V2.0_SYS</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">
              Freelance Agency Control Center Terminal // Live Supabase Connection Node
            </p>
          </div>
          <div className="text-right text-[10px] font-bold bg-neutral-900 border border-neutral-800 p-2 text-[#B1E55A] rounded">
            PENDING_PAYOUT: <span className="text-white">${totalPendingPayout}</span>
          </div>
        </header>

        {/* --- MODULE LAYER 1: CAPACITY METRIC VECTOR PANELS --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CapacityAnalyzer assignedVideos={totalRemainingVideosCount} totalHours={totalWeeklyQuotaHours} />
          <BurnoutPreventionSystem telemetry={vitalTelemetry} />
        </div>

        {/* --- CORE SPLIT MONITOR GRID: FORMS, CABINETS, & UTILITIES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CLIENT CABINET CONTROLS (COLUMNS 1-7) */}
          <div className="lg:col-span-7 space-y-6 w-full">
            <section className="bg-white border-3 border-black rounded-2xl p-5 shadow-[5px_5px_0px_0px_#000] relative overflow-hidden">
              <h2 className="font-black text-[11px] uppercase tracking-wider mb-4 text-neutral-400 font-mono-display">CREATE REVENUE NODE</h2>
              <form onSubmit={handleAddClient} className="space-y-3">
                <input type="text" placeholder="CLIENT IDENTIFIER NAME" value={newName} onChange={e => setNewName(e.target.value)} className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent focus:bg-amber-50/30 outline-none placeholder-neutral-400 transition-all uppercase" required />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none transition-all" required />
                  <input type="number" placeholder="TOTAL CONTRACT PAYMENT ($)" value={newTotalPayment} onChange={e => setNewTotalPayment(e.target.value)} className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="TOTAL VIDEOS IN QUEUE" value={newRemaining} onChange={e => setNewRemaining(e.target.value)} className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" />
                  <input type="number" placeholder="VIDEOS WANTED PER WEEK" value={newVideosPerWeek} onChange={e => setNewVideosPerWeek(e.target.value)} className="w-full border-3 border-emerald-500 rounded-xl p-3 text-xs font-black bg-emerald-5/10 focus:bg-emerald-50/40 outline-none placeholder-neutral-400 transition-all" />
                </div>
                <button type="submit" className="w-full bg-black hover:bg-neutral-900 text-white font-black py-3.5 text-xs rounded-xl uppercase tracking-widest transition-all active:translate-y-0.5">GENERATE REVENUE NODE</button>
              </form>
            </section>

            {loading ? (
              <div className="text-center py-16">
                <p className="text-xs font-black font-mono-display animate-bounce">READING CORE SYNC TABLES...</p>
              </div>
            ) : (
              <section className="space-y-10 pt-4">
                {clients.map((client, index) => {
                  const isExpanded = client.id === expandedClientId;
                  const totalVideos = client.videosRemaining + client.videosCompleted;
                  const progressPercent = totalVideos > 0 ? (client.videosCompleted / totalVideos) * 100 : 0;
                  const theme = generateUniqueTheme(client.id + client.name);

                  return (
                    <div key={client.id} className={`relative transition-all duration-200 ${isExpanded ? 'transform -translate-y-1' : ''}`}>
                      <div onClick={() => setExpandedClientId(isExpanded ? null : client.id)} className="w-40 h-8 rounded-t-xl border-t-3 border-x-3 border-black absolute -top-8 left-4 cursor-pointer flex items-center px-3 shadow-inner" style={{ backgroundColor: theme.tabBg }}>
                        <span className="text-[10px] font-black tracking-widest uppercase font-mono-display truncate text-black flex items-center">📂 {client.name.split(' ')[0]}</span>
                      </div>

                      <div className={`border-3 border-black bg-white overflow-hidden shadow-[5px_5px_0px_0px_#000] ${isExpanded ? 'rounded-b-2xl rounded-tr-2xl' : 'rounded-2xl'}`}>
                        <div className="p-4 flex justify-between items-center border-b-3 border-black" style={{ backgroundColor: theme.bg }}>
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
                                  <button onClick={() => adjustVideoCount(client.id, 'videosCompleted', -1)} className="bg-neutral-200 text-black w-6 h-6 rounded border font-bold">-</button>
                                  <span className="font-black text-sm">{client.videosCompleted}</span>
                                  <button onClick={() => adjustVideoCount(client.id, 'videosCompleted', 1)} className="bg-neutral-200 text-black w-6 h-6 rounded border font-bold">+</button>
                                </div>
                              </div>
                            </div>

                            {editingClientId === client.id ? (
                              <div className="p-3 border-2 border-dashed border-black bg-amber-50/40 rounded-xl space-y-3">
                                <div className="grid grid-cols-3 gap-2">
                                  <input type="number" value={editTotalPayment} onChange={e => setEditTotalPayment(e.target.value)} placeholder="Total Contract" className="border-2 border-black p-2 rounded text-[10px]" />
                                  <input type="number" value={editPaid} onChange={e => setEditPaid(e.target.value)} placeholder="Amount Paid" className="border-2 border-black p-2 rounded text-[10px]" />
                                  <input type="number" value={editVideosPerWeek} onChange={e => setEditVideosPerWeek(e.target.value)} placeholder="Per Week Quota" className="border-2 border-black p-2 rounded text-[10px]" />
                                </div>
                                <button onClick={() => saveEdit(client.id)} className="w-full bg-black text-white py-1.5 rounded text-[10px] font-bold">SAVE SCHEMA CHANGES</button>
                              </div>
                            ) : (
                              <div className="flex justify-between items-center text-[10px] bg-neutral-900 text-white p-3 rounded-xl">
                                <div>FINANCIAL STATEMENT: Payout Total: ${client.totalContractPayment} // Received: ${client.amountPaid}</div>
                                <button onClick={() => startEditing(client)} className="bg-white text-black px-2 py-1 rounded font-bold text-[9px]">EDIT</button>
                              </div>
                            )}

                            <div className="flex justify-between items-center pt-2 text-[9px]">
                              <div className="flex space-x-1">
                                <button onClick={() => moveClient(index, 'up')} disabled={index === 0} className="border p-1 bg-white rounded disabled:opacity-30">▲</button>
                                <button onClick={() => moveClient(index, 'down')} disabled={index === clients.length - 1} className="border p-1 bg-white rounded disabled:opacity-30">▼</button>
                              </div>
                              <button onClick={() => handleDeleteClient(client.id)} className="text-red-500 font-bold hover:underline">ERASE NODE PROFILE</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </section>
            )}
          </div>

          {/* SYSTEM SIDEBAR TARGETING LOGISTICS (COLUMNS 8-12) */}
          <div className="lg:col-span-5 space-y-6 w-full">
            <StickyTodoLog refreshTrigger={todoRefreshTrigger} onTodoStateChange={setCompletedTodosCount} />
            <GlobalCalendarSticky clients={clients} />
          </div>

        </div>

        {/* --- MODULE LAYER 2: KANBAN PRODUCTION ROUTE GRID MATRIX --- */}
        <div className="w-full">
          <ContentPipelineView cards={mockPipelineCards} />
        </div>

        {/* --- MODULE LAYER 3: LOGISTICS SCHEDULING, MARGINS, AND FORECASTERS --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <ShootScheduler shoots={mockShoots} />
            <ProfitabilityMatrix clientData={convertedProfitMatrixLogs} />
          </div>
          <div className="xl:col-span-1">
            <DeadlinePredictor totalVideos={clients.reduce((s,c)=>s+c.videosRemaining+c.videosCompleted, 0)} completedVideos={clients.reduce((s,c)=>s+c.videosCompleted, 0)} weeklyVelocity={4.5} />
          </div>
        </div>
      </div>

      {/* REVENUE VISIBILITY TOGGLE */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-[9999] font-mono">

        <button
          type="button"
          onClick={() => setShowRevenue(prev => !prev)}
          className="w-full bg-black text-white p-4 rounded-xl border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-between cursor-pointer select-none active:translate-x-[4px] active:translate-y-[4px]"
        >

          <div className="text-left">
            <h3 className="font-bold uppercase text-xs tracking-wider text-neutral-400">
              AGGREGATE PIPELINE REVENUE
            </h3>

            <p className="text-[9px] text-neutral-500 font-black uppercase mt-0.5 tracking-tight">
              {showRevenue
                ? "👉 CLICK TO HIDE PIPELINE STREAM"
                : "👉 CLICK TO REVEAL PIPELINE STREAM"}
            </p>
          </div>

          <div className="bg-[#5cd6ff] text-black font-black px-4 py-2 rounded-lg border-2 border-black text-xl tracking-wide font-mono min-w-[135px] text-center shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">

            {showRevenue ? (
              `$${totalPendingPayout.toLocaleString()}`
            ) : (
              <span className="tracking-[0.25em] font-sans text-lg block translate-y-[-1px]">
                ••••••
              </span>
            )}

          </div>

        </button>
      </div>

    </div>
  );
}

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
  const hues = [195, 45, 145, 25, 165, 330, 280, 95];
  const selectedHue = hues[Math.abs(hash) % hues.length];
  return `hsl(${selectedHue}, 95%, 78%)`;
};

const STAGES = ["RAW DEPLOY", "ASSEMBLY CUT", "FINE COLOR", "AUDIO SWEET", "VFX WRAP", "ARCHIVE DONE"];

// ==========================================
// --- NEW FEATURE 1: BURNOUT MONITOR ---
// ==========================================
function BurnoutMonitor({ assignedVideos, completedVideos }) {
  const remaining = Math.max(0, assignedVideos - completedVideos);
  const totalHours = remaining * 6; // Standard 6-hour edit model per project matrix node
  
  // High-octane scale calculating capacity stress curves
  const utilization = Math.min(100, Math.round((totalHours / 45) * 100));

  let statusLabel = "NOMINAL // STEADY CAP";
  let systemColor = "bg-[#B1E55A]";
  let panelTone = "bg-[#E2F5C4]";
  let directive = "SYSTEM HEALTH OPTIMAL. SYSTEM CONTINUITY ASSURED.";

  if (utilization > 85) {
    statusLabel = "CRITICAL METRIC OVERFLOW";
    systemColor = "bg-[#FF6B6B]";
    panelTone = "bg-[#FFE3E3]";
    directive = "IMMEDIATE BURNOUT DETECTED. HALT AD-HOC ONBOARDING DEPLOYMENTS.";
  } else if (utilization > 50) {
    statusLabel = "ELEVATED RUNTIME STRESS";
    systemColor = "bg-[#FFDE4D]";
    panelTone = "bg-[#FFF9D2]";
    directive = "NODE WARNING: HIGH SYSTEM SATURATION. SCALE EDITING VELOCITY STREAMS.";
  }

  const burnoutRisk = utilization;

  return (
    <div className="w-full bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono rounded-2xl relative overflow-hidden">
      <div className="border-b-4 border-black pb-3 mb-4 flex justify-between items-center">
        <span className="font-black uppercase tracking-tight text-xs">⚡ CAP_SYS // STRESS METRICS</span>
        <span className="bg-black text-white text-[8px] px-1.5 font-bold uppercase tracking-widest animate-pulse">
          REAL-TIME
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="relative w-full flex justify-center p-3 border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000000] rounded-xl">
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

      <div className="mt-5 pt-3 border-t-2 border-black border-dashed grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <div>
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
    </div>
  );
}

// ==========================================
// --- NEW FEATURE 2: SHOOT SCHEDULER ---
// ==========================================
function ShootScheduler({ shoots }) {
  return (
    <div className="w-full bg-[#FCF8F2] border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono rounded-2xl">
      <div className="border-b-4 border-black pb-3 mb-4 flex justify-between items-center">
        <span className="text-sm font-black uppercase tracking-tight">📹 FIELD LOGISTICS MATRIX (LOG_RUN)</span>
        <span className="text-[9px] bg-black text-white px-2 py-0.5 font-bold uppercase rounded">Grip Gear Logs</span>
      </div>

      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
        {shoots.map((shoot, idx) => {
          const allPacked = shoot.equipment.every(e => e.packed);
          return (
            <div key={idx} className="bg-white border-3 border-black p-4 rounded-xl shadow-[3px_3px_0px_0px_#000000] relative">
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className={`border-2 border-black px-1.5 py-0.5 text-[8px] font-black rounded uppercase ${shoot.approved ? 'bg-[#B1E55A]' : 'bg-[#FF6B6B]'}`}>
                  {shoot.approved ? "DEPLOYED" : "TENTATIVE"}
                </span>
                <span className={`border-2 border-black px-1.5 py-0.5 text-[8px] font-black rounded uppercase ${allPacked ? 'bg-[#5cd6ff]' : 'bg-[#FFDE4D]'}`}>
                  {allPacked ? "GEAR_READY" : "PACK_WARN"}
                </span>
              </div>

              <h4 className="font-black text-base uppercase tracking-tight text-neutral-900 mb-0.5">{shoot.clientName} // LOCATION RECORD</h4>
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide">📍 {shoot.location}</p>
              
              <div className="mt-2.5 bg-neutral-50 border border-neutral-300 p-2 rounded-lg flex flex-wrap gap-2 justify-between items-center text-[10px]">
                <span className="font-black text-black bg-[#FFDE4D] px-1.5 py-0.5 border border-black uppercase rounded">🗓️ CAPTURE TIMESTAMP: {shoot.date}</span>
                <div className="flex gap-1">
                  {shoot.deliverables.map((d, dIdx) => (
                    <span key={dIdx} className="bg-neutral-200 font-bold px-1.5 py-0.5 rounded border border-neutral-400 uppercase">{d}</span>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-200">
                <span className="text-[9px] font-black text-neutral-400 block uppercase mb-1">EQUIPMENT LOAD MANIFEST:</span>
                <div className="flex flex-wrap gap-1.5">
                  {shoot.equipment.map((item, eIdx) => (
                    <span key={eIdx} className={`border text-[9px] px-2 py-0.5 font-bold rounded-md flex items-center gap-1 transition-all ${item.packed ? 'bg-neutral-900 text-neutral-100 border-black' : 'bg-white text-red-500 border-red-400 border-dashed animate-pulse'}`}>
                      {item.packed ? "✓" : "⚠"} {item.name.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
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
  
  const formattedDate = estCompletionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
        <div className="w-full flex justify-between text-[10px] font-bold uppercase mb-1">
          <span>PIPELINE SATURATION STAGE</span>
          <span>{completionPercentage}% DONE</span>
        </div>
        <div className="w-full h-4 bg-neutral-200 border-2 border-black rounded-lg overflow-hidden relative">
          <div className="h-full bg-[#5cd6ff] transition-all duration-500" style={{ width: `${completionPercentage}%` }} />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-black">
            {completedVideos} / {totalVideos} COMPLETIONS
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// --- NEW FEATURE 4: AUDIT LOG VIEW ---
// ==========================================
function FinancialAuditTable({ rows }) {
  return (
    <div className="w-full bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_#000000] font-mono rounded-2xl">
      <div className="border-b-4 border-black pb-3 mb-4 flex justify-between items-center">
        <span className="text-sm font-black uppercase tracking-tight">💼 FINANCIAL PERFORMANCE MATRIX</span>
        <span className="text-[9px] bg-[#B1E55A] border-2 border-black px-2 py-0.5 font-bold uppercase rounded">COMPLIANT</span>
      </div>

      <div className="overflow-x-auto border-2 border-black rounded-xl">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-black text-white text-[10px] uppercase tracking-wider border-b-2 border-black">
              <th className="p-2.5 font-black">NODE ID</th>
              <th className="p-2.5 font-black">YIELD REVENUE</th>
              <th className="p-2.5 font-black">COMPUTE HOURS</th>
              <th className="p-2.5 font-black">HOURLY VALUE</th>
              <th className="p-2.5 font-black">REVISION LOOP COUNT</th>
              <th className="p-2.5 font-black text-right">PROFIT LEVEL</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black text-[11px] font-bold text-neutral-800">
            {rows.map((row, idx) => {
              const hourlyRate = row.hoursSpent > 0 ? Math.round(row.revenue / row.hoursSpent) : 0;
              return (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-2.5 uppercase font-black">{row.name}</td>
                  <td className="p-2.5">${row.revenue.toLocaleString()}</td>
                  <td className="p-2.5">{row.hoursSpent} Hrs</td>
                  <td className="p-2.5">${hourlyRate}/hr</td>
                  <td className="p-2.5 text-center font-mono">
                    <span className={`px-1.5 py-0.5 rounded border border-black ${row.revisions > 10 ? 'bg-[#FF6B6B] text-black' : 'bg-neutral-100'}`}>
                      {row.revisions}x
                    </span>
                  </td>
                  <td className="p-2.5 text-right font-black">
                    <span className="mr-1">{row.profitScore}%</span>
                    {row.profitScore > 80 && (
                      <span className="bg-[#B1E55A] border border-black text-[8px] font-black px-1 rounded uppercase">HIGH_YIELD</span>
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
                      <span className={card.priority === 'HIGH' ? 'text-red-500 font-black animate-pulse' : 'text-neutral-400'}>⚡</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-tight leading-tight text-neutral-800">{card.title}</p>
                    <span className="text-[8px] font-bold text-neutral-400 block mt-1 uppercase">BY: {card.editor}</span>
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
    return Object.keys(groupedTodos).sort((a, b) => b.localeCompare(a));
  }, [groupedTodos]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const { error } = await supabase
      .from('todos')
      .insert([{ text: newText.trim(), completed: false, date: todayStr }]);

    if (!error) {
      setNewText('');
      fetchTodos();
    }
  };

  const toggleTodo = async (id, currentVal) => {
    const { error } = await supabase
      .from('todos')
      .update({ completed: !currentVal })
      .eq('id', id);

    if (!error) {
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchTodos();
    }
  };

  const toggleDateAccordion = (dateStr) => {
    setExpandedDates(prev => ({ ...prev, [dateStr]: !prev[dateStr] }));
  };

  const formatHeaderDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();
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
            <div key={dateStr} className="border-2 border-black rounded-xl bg-white/70 overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              <div
                onClick={() => !isToday && toggleDateAccordion(dateStr)}
                className={`p-2 flex justify-between items-center text-[10px] font-black border-b-2 border-black select-none ${isToday ? 'bg-black text-white' : 'bg-neutral-100 text-black cursor-pointer'}`}
              >
                <span>{isToday ? "⚡ TODAY'S OBJECTIVES" : formatHeaderDate(dateStr)}</span>
                <span className="bg-neutral-200 text-black px-1.5 py-0.5 rounded border border-black/40 text-[8px]">
                  {completedCount}/{items.length} DONE {!isToday && (isCollapsed ? '▼' : '▲')}
                </span>
              </div>

              {!isCollapsed && (
                <div className="divide-y divide-black/10 bg-white p-1.5 space-y-1">
                  {items.map(todo => (
                    <div key={todo.id} className="flex items-center justify-between gap-2 p-1 hover:bg-neutral-50 rounded transition-colors group">
                      <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => toggleTodo(todo.id, todo.completed)}>
                        <div className={`w-4 h-4 border-2 border-black rounded flex items-center justify-center font-black text-xs ${todo.completed ? 'bg-[#A3E635]' : 'bg-white'}`}>
                          {todo.completed && "✓"}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-tight break-all leading-tight ${todo.completed ? 'line-through text-black/40' : 'text-neutral-800'}`}>
                          {todo.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 opacity-60 hover:opacity-100 font-bold text-xs px-1 transition-opacity"
                      >
                        ✕
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
};

// ==========================================
// --- COMPONENT: PAYMENT RADAR CALENDAR ---
// ==========================================
const PaymentRadar = ({ clients }) => {
  const [monthOffset, setMonthOffset] = useState(0);
  const today = useMemo(() => new Date(), []);

  const rollingDays = useMemo(() => {
    const days = [];
    const baseDateAdjustment = monthOffset * 35;
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
        <button
          type="button"
          onClick={() => setMonthOffset(prev => prev - 1)}
          className="bg-black text-white hover:bg-neutral-800 font-mono font-black w-6 h-6 rounded flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_#fff] text-xs transition-transform active:translate-y-0.5"
        >
          ◀
        </button>
        <span className="text-[11px] font-black text-black tracking-wider uppercase font-mono-display">
          RADAR RANGE // {rangeLabel}
        </span>
        <button
          type="button"
          onClick={() => setMonthOffset(prev => prev + 1)}
          className="bg-black text-white hover:bg-neutral-800 font-mono font-black w-6 h-6 rounded flex items-center justify-center border border-black shadow-[1px_1px_0px_0px_#fff] text-xs transition-transform active:translate-y-0.5"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 bg-black/5 p-1 rounded-xl border-2 border-black/10">
        {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((wd, i) => (
          <span key={i} className="text-center font-black text-[8px] text-black/50 py-0.5">{wd}</span>
        ))}

        {rollingDays.map((dateObj, i) => {
          const dayNumber = dateObj.getDate();
          const isFirstOfMonth = dayNumber === 1;
          const monthLabel = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
          const dateKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
          const matchingClients = dayScheduleMap[dateKey] || [];
          const hasPayments = matchingClients.length > 0;

          const isAbsoluteToday =
            dateObj.getDate() === today.getDate() &&
            dateObj.getMonth() === today.getMonth() &&
            dateObj.getFullYear() === today.getFullYear();

          const isPastDay = dateObj < today && !isAbsoluteToday;

          let cardClasses = "bg-white text-black border-black/40 hover:border-black";
          let gridBgStyle = {};

          if (isAbsoluteToday) {
            cardClasses = "bg-black text-white border-black z-10 shadow-[2px_2px_0px_0px_#E11D48]";
          } else if (hasPayments) {
            const seedName = matchingClients[0]?.name || "default";
            gridBgStyle = { backgroundColor: generateUniqueTheme(seedName) };
            cardClasses = "border-black shadow-[2px_2px_0px_0px_#000]";
          } else if (isPastDay) {
            cardClasses = "bg-neutral-100/50 text-neutral-400 border-neutral-200/60";
          } else if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
            cardClasses = "bg-amber-50/70 border-black/20 text-black/70 font-black bg-amber-100/70";
          }

          return (
            <div key={dateKey} className={`aspect-square text-[9px] flex flex-col items-center justify-between border rounded p-0.5 relative group transition-all ${cardClasses}`} style={gridBgStyle}>
              <div className="flex justify-between w-full items-center leading-none">
                <span className="font-mono font-black">{dayNumber}</span>
                {isAbsoluteToday && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />}
              </div>
              {(isFirstOfMonth || i === 0 || i === 34) && (
                <span className="text-[7px] uppercase tracking-tighter text-black/50 font-sans font-extrabold block text-center scale-90">
                  {monthLabel}
                </span>
              )}
              {hasPayments && (
                <>
                  <div className="flex space-x-0.5 max-w-full overflow-hidden justify-center pb-0.5">
                    {matchingClients.map(c => (
                      <div key={c.id} className={`w-2 h-2 rounded-full border border-black/30 ${isPastDay ? 'bg-neutral-400' : 'bg-emerald-500'}`} />
                    ))}
                  </div>
                  {!isPastDay && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-[9px] p-2 rounded-lg border-2 border-black font-black whitespace-nowrap z-50 shadow-[2px_2px_0px_0px_#A3E635]">
                      {matchingClients.map(c => (
                        <div key={c.id} className="uppercase font-mono-display tracking-tight">
                          💰 {c.name.split(' ')[0]}: {monthLabel} {dayNumber}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t-2 border-black border-dashed space-y-1.5">
        <div className="flex justify-between text-[10px] font-black uppercase text-black/60">
          <span>LEGEND INDEX</span>
          <span>SYSTEM RADAR LINKED</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[9px] font-bold text-black">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-black border border-black rounded" /> <span>TODAY NODE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-white border border-neutral-300 rounded" /> <span>OPEN TRACKS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-emerald-400 border border-black rounded" /> <span>PAYMENT MATRICES</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// --- CORE APPLICATION EXPORT ENGINE ---
// ==========================================
export default function App() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRevenue, setShowRevenue] = useState(true);
  const [isRevenueDrawerCollapsed, setIsRevenueDrawerCollapsed] = useState(false);

  // Modal State Triggers
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [todoRefreshTrigger, setTodoRefreshTrigger] = useState(0);
  const [completedTodosCount, setCompletedTodosCount] = useState(0);

  // New Form Entry Capture Objects
  const [newClientName, setNewClientName] = useState('');
  const [newClientRate, setNewClientRate] = useState('');
  const [newClientRemaining, setNewClientRemaining] = useState('');
  const [newClientAgreement, setNewClientAgreement] = useState('');

  // Static Mock Performance Audit Data Sets
  const [auditRows] = useState([
    { id: '1', name: 'ALPHA MEDIA', agreementDate: '2026-05-01', revenue: 45000, hoursSpent: 210, profitScore: 88, revisions: 4 },
    { id: '2', name: 'APEX CLOTHING CO', agreementDate: '2026-05-12', revenue: 35000, hoursSpent: 850, profitScore: 42, revisions: 14 },
    { id: '3', name: 'BROLF FILMS', agreementDate: '2026-06-18', revenue: 20000, hoursSpent: 120, profitScore: 95, revisions: 2 },
    { id: '4', name: 'ROBEL SHOES', agreementDate: '2026-06-24', revenue: 15000, hoursSpent: 280, profitScore: 71, revisions: 8 }
  ]);

  const [shoots] = useState([
    { clientName: "HAIR BRAND", approved: true, location: "STUDIO A, DOWNTOWN", date: "2026-05-30", deliverables: ["3 REELS", "1 MAIN CUT"], equipment: [{ name: "RED KOMODO", packed: true }, { name: "APUTURE 600D", packed: true }, { name: "DJI RONIN RS3", packed: false }] },
    { clientName: "D.G APPAREL", approved: false, location: "WAREHOUSE DISTRICT", date: "2026-06-05", deliverables: ["5 SHORTS"], equipment: [{ name: "SONY FX3", packed: true }, { name: "WIRELESS GO II", packed: false }] }
  ]);

  const [pipelineCards] = useState([
    { title: "Commercial Intro Cut", stage: "RAW DEPLOY", platform: "TIKTOK", priority: "HIGH", editor: "Aman" },
    { title: "Color Match Grading v2", stage: "FINE COLOR", platform: "YOUTUBE", priority: "LOW", editor: "Aman" },
    { title: "Sound Design Mix Master", stage: "AUDIO SWEET", platform: "INSTAGRAM", priority: "HIGH", editor: "Aman" },
    { title: "VFX Mask Tracking Clean", stage: "VFX WRAP", platform: "TIKTOK", priority: "LOW", editor: "Aman" },
    { title: "Rough Comp Timeline Assembly", stage: "ASSEMBLY CUT", platform: "YOUTUBE", priority: "HIGH", editor: "Aman" }
  ]);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setClients(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const totalAssignedVideos = useMemo(() => {
    return clients.reduce((acc, curr) => acc + (curr.videos_remaining || 0), 0);
  }, [clients]);

  const productionVelocity = useMemo(() => {
    if (completedTodosCount === 0) return 4; // Native fallback default velocity cadence
    return Math.max(1, Math.min(8, Math.ceil(completedTodosCount * 1.5)));
  }, [completedTodosCount]);

  const handleCreateClient = async (e) => {
    e.preventDefault();
    if (!newClientName || !newClientRate || !newClientRemaining) return;

    const { error } = await supabase
      .from('clients')
      .insert([{
        name: newClientName,
        rate_per_video: parseFloat(newClientRate),
        videos_remaining: parseInt(newClientRemaining),
        agreement_date: newClientAgreement || new Date().toISOString().split('T')[0]
      }]);

    if (!error) {
      setNewClientName('');
      setNewClientRate('');
      setNewClientRemaining('');
      setNewClientAgreement('');
      setIsAddClientOpen(false);
      fetchClients();
    }
  };

  const incrementVideo = async (id, currentCount) => {
    const { error } = await supabase
      .from('clients')
      .update({ videos_remaining: currentCount + 1 })
      .eq('id', id);

    if (!error) fetchClients();
  };

  const decrementVideo = async (id, currentCount) => {
    if (currentCount <= 0) return;
    const { error } = await supabase
      .from('clients')
      .update({ videos_remaining: currentCount - 1 })
      .eq('id', id);

    if (!error) {
      fetchClients();
      setTodoRefreshTrigger(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-black p-4 md:p-8 font-mono select-none antialiased selection:bg-black selection:text-white">
      {/* GLOBAL HUD APP RUN BAR HEADER */}
      <header className="w-full bg-black text-white p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_#000000] mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#B1E55A] animate-ping" />
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase font-mono-display">
              BUILD // MODE // TRACKER
            </h1>
          </div>
          <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest font-mono">
            SYS STATUS: PRODUCTION ENGINE LIVESTREAM STABLE // OPERATOR: AMAN
          </p>
        </div>

        {/* NEO-BRUTALIST TAB RIG MATRIX */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 text-xs font-black uppercase rounded-xl border-2 transition-all cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#FFDE4D] text-black border-white shadow-[2px_2px_0px_0px_#fff]' : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'}`}
          >
            🖲️ CORE HUD
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2 text-xs font-black uppercase rounded-xl border-2 transition-all cursor-pointer ${activeTab === 'pipeline' ? 'bg-[#5cd6ff] text-black border-white shadow-[2px_2px_0px_0px_#fff]' : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'}`}
          >
            📋 STAGE LAYOUT
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs font-black uppercase rounded-xl border-2 transition-all cursor-pointer ${activeTab === 'audit' ? 'bg-[#FF6B6B] text-black border-white shadow-[2px_2px_0px_0px_#fff]' : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'}`}
          >
            💼 VALUATION
          </button>
        </div>
      </header>

      {/* RENDER SWITCH BOARD CONTAINER PORTAL */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6 animate-fadeIn">
          <ContentPipelineView cards={pipelineCards} />
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <FinancialAuditTable rows={auditRows} />
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COMMAND RACK NODES */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* CORE CLIENT METRIC CONTROLLERS PANEL */}
            <div className="bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_#000000] relative">
              <div className="border-b-4 border-black pb-4 mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-tight font-mono-display">
                    CLIENT NODES SYSTEM MATRIX
                  </h2>
                  <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">
                    Live dynamic updates bound directly to backend database streams
                  </p>
                </div>

                <button
                  onClick={() => setIsAddClientOpen(!isAddClientOpen)}
                  className="bg-[#B1E55A] hover:bg-[#9cd145] text-black font-black px-4 py-2 text-xs rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer uppercase tracking-tight"
                >
                  {isAddClientOpen ? "✕ Close Console" : "➕ Onboard Client Node"}
                </button>
              </div>

              {/* SLIDE DOWN MODAL CONSOLE DROPDOWN */}
              {isAddClientOpen && (
                <form onSubmit={handleCreateClient} className="mb-6 p-4 bg-[#FCF8F2] border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_#000000] space-y-4 animate-slideDown">
                  <span className="block text-[10px] font-black uppercase text-gray-500 border-b border-dashed border-neutral-400 pb-1">
                    💾 INITIALIZE NEW WORKFLOW PROPERTY MAPPING
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase">Client Tag Name</label>
                      <input type="text" required value={newClientName} onChange={e => setNewClientName(e.target.value)} placeholder="e.g. FAATRA TRADING" className="border-2 border-black bg-white rounded-lg p-2 text-xs outline-none uppercase font-bold" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase">Rate ($ / Video)</label>
                      <input type="number" required value={newClientRate} onChange={e => setNewClientRate(e.target.value)} placeholder="e.g. 250" className="border-2 border-black bg-white rounded-lg p-2 text-xs outline-none font-bold" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase">Contract Node Remainder</label>
                      <input type="number" required value={newClientRemaining} onChange={e => setNewClientRemaining(e.target.value)} placeholder="e.g. 8" className="border-2 border-black bg-white rounded-lg p-2 text-xs outline-none font-bold" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase">Agreement Timestamp</label>
                      <input type="date" value={newClientAgreement} onChange={e => setNewClientAgreement(e.target.value)} className="border-2 border-black bg-white rounded-lg p-2 text-xs outline-none font-bold" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-black hover:bg-neutral-800 text-white font-black text-xs p-2.5 rounded-xl border border-black uppercase shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] transition-transform" >
                    🚀 Deploy System Matrix Instance Node
                  </button>
                </form>
              )}

              {/* DATA PIPELINE LOADING SPINNERS */}
              {loading ? (
                <div className="py-12 border-4 border-dashed border-black/20 rounded-2xl flex flex-col items-center justify-center bg-neutral-50">
                  <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-2" />
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">QUERYING BACKEND TABLE PARAMS...</span>
                </div>
              ) : clients.length === 0 ? (
                <div className="py-12 border-4 border-dashed border-black/20 rounded-2xl text-center bg-neutral-50">
                  <p className="text-sm font-bold text-neutral-400 italic uppercase">No active workspace configurations registered.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clients.map((client) => {
                    const clientTheme = generateUniqueTheme(client.name);
                    const pendingCash = (client.videos_remaining || 0) * (client.rate_per_video || 0);

                    return (
                      <div
                        key={client.id}
                        className="bg-white border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-between group transition-all"
                      >
                        {/* CARD HEADING STICKER STRIP */}
                        <div className="p-4 border-b-4 border-black flex justify-between items-start gap-2" style={{ backgroundColor: clientTheme }}>
                          <div className="max-w-[70%]">
                            <h3 className="font-black text-base uppercase tracking-tight truncate leading-tight text-neutral-900">
                              {client.name}
                            </h3>
                            <span className="text-[8px] bg-black text-white font-mono px-1 py-0.5 rounded uppercase mt-1 inline-block tracking-tight font-extrabold">
                              AGREEMENT: {client.agreement_date || "N/A"}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-bold text-neutral-700 block uppercase leading-none">RATE VALUE</span>
                            <span className="text-lg font-black font-mono-display text-neutral-900">${client.rate_per_video}</span>
                          </div>
                        </div>

                        {/* INTERACTION DECK STEP CONTROLLERS */}
                        <div className="p-4 bg-white space-y-4 flex-1 flex flex-col justify-between">
                          <div className="flex items-center justify-between border-2 border-black p-2.5 bg-neutral-50 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                            <div>
                              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-tight">PIPELINE QUEUE</span>
                              <span className="text-xl font-black font-mono-display text-black">{client.videos_remaining} CLIPS LEFT</span>
                            </div>

                            {/* STICKER-STYLE BUTTON SYSTEM */}
                            <div className="flex gap-1">
                              <button
                                onClick={() => decrementVideo(client.id, client.videos_remaining)}
                                disabled={client.videos_remaining <= 0}
                                className="w-8 h-8 bg-white disabled:opacity-40 disabled:pointer-events-none hover:bg-neutral-100 text-black border-2 border-black font-black flex items-center justify-center rounded-lg shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#000] transition-all text-xs select-none cursor-pointer"
                                title="Complete video project node"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => incrementVideo(client.id, client.videos_remaining)}
                                className="w-8 h-8 bg-white hover:bg-neutral-100 text-black border-2 border-black font-black flex items-center justify-center rounded-lg shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#000] transition-all text-xs select-none cursor-pointer"
                                title="Add additional contract slot allocation"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* FINANCIAL VAULT LEDGER SUB MODULE */}
                          <div className="border-t-2 border-black border-dashed pt-3 flex justify-between items-center">
                            <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">
                              EXPECTED PIPELINE YIELD:
                            </span>
                            <div className="bg-black text-white font-black px-2.5 py-1 text-xs font-mono rounded border border-black shadow-[1.5px_1.5px_0px_0px_#A3E635]">
                              <span className={showRevenue ? "" : "blur-xs select-none pointer-events-none"}>
                                ${pendingCash} USD
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* STRESS ENGINE FORECASTER MONITOR */}
            <BurnoutMonitor assignedVideos={totalAssignedVideos} completedVideos={completedTodosCount} />
            <DeadlinePredictor totalVideos={totalAssignedVideos} completedVideos={completedTodosCount} weeklyVelocity={productionVelocity} />
          </div>

          {/* CHRONO TASK MATRIX LOG */}
          <div className="lg:col-span-4 space-y-8">
            <StickyTodoLog refreshTrigger={todoRefreshTrigger} onTodoStateChange={(count) => setCompletedTodosCount(count)} />
            <PaymentRadar clients={clients} />
            <ShootScheduler shoots={shoots} />
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* --- DETACHED UTILITY: REVENUE VAULT VISIBILITY MASK --- */}
      {/* ========================================================== */}
      <div className="fixed bottom-4 right-4 z-50 font-mono select-none">
        {isRevenueDrawerCollapsed ? (
          /* Tiny Floating Sticker Badge when Collapsed */
          <button
            onClick={() => setIsRevenueDrawerCollapsed(false)}
            className="bg-[#5cd6ff] text-black font-black p-3 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all text-xs flex items-center gap-2 uppercase cursor-pointer"
          >
            💼 Open Revenue Vault
          </button>
        ) : (
          /* Full Control Window Box */
          <div className="w-80 md:w-96 bg-black text-white p-4 rounded-xl border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative">
            
            {/* Neo-Brutalist Window Header Controls */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
              <button
                type="button"
                onClick={() => setShowRevenue(!showRevenue)}
                title={showRevenue ? "Blind stream" : "Reveal stream"}
                className="bg-white hover:bg-neutral-200 text-black border-2 border-black font-black w-6 h-6 flex items-center justify-center text-xs rounded transition-colors cursor-pointer"
              >
                {showRevenue ? "👁️" : "🙈"}
              </button>
              <button
                type="button"
                onClick={() => setIsRevenueDrawerCollapsed(true)}
                title="Minimize Window"
                className="bg-[#FF6B6B] hover:bg-red-400 text-black border-2 border-black font-black w-6 h-6 flex items-center justify-center text-xs rounded transition-colors cursor-pointer"
              >
                _
              </button>
            </div>

            <div className="pr-16 cursor-pointer" onClick={() => setShowRevenue(!showRevenue)}>
              <h3 className="font-bold uppercase text-[10px] tracking-wider text-neutral-400">
                AGGREGATE PIPELINE REVENUE
              </h3>
              <p className="text-[9px] text-neutral-500 font-black uppercase mt-0.5 tracking-tight">
                {showRevenue ? "STATUS // STREAM ACTIVE" : "STATUS // STREAM BLINDED"}
              </p>
            </div>

            {/* Heavy neo-brutalist balance display drawer */}
            <div className="mt-3 flex items-center justify-between bg-neutral-900 border-2 border-neutral-700 p-2 rounded-lg">
              <span className="text-[10px] text-neutral-400 uppercase font-bold">Estimated Pipeline:</span>
              <div className="bg-[#5cd6ff] text-black font-black px-4 py-1.5 rounded border-2 border-black text-lg tracking-wide shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] min-w-[140px] text-center transition-all duration-300">
                <span className={showRevenue ? "" : "blur-md select-none pointer-events-none"}>
                  ${clients.reduce((acc, curr) => acc + ((curr.videos_remaining || 0) * (curr.rate_per_video || 0)), 0)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
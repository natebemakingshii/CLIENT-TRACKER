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
  const hue = hues[Math.abs(hash % hues.length)];
  
  return {
    bg: `hsl(${hue}, 95%, 85%)`,
    accent: `hsl(${hue}, 100%, 70%)`,
    tabBg: `hsl(${hue}, 95%, 78%)`
  };
};

// --- COMPONENT: HISTORICAL ARCHIVE TODO ENGINE ---
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

// --- COMPONENT: PAGINATED ROLLING FORECAST MATRIX CALENDAR ---
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

// --- MAIN APPLICATION INTERFACE ---
export default function App() {
  const [clients, setClients] = useState([]);
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedTodosCount, setCompletedTodosCount] = useState(0);
  const [todoRefreshTrigger, setTodoRefreshTrigger] = useState(0);

  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTotalPayment, setNewTotalPayment] = useState('');
  const [newRemaining, setNewRemaining] = useState('');
  const [newVideosPerWeek, setNewVideosPerWeek] = useState('');

  const [editingClientId, setEditingClientId] = useState(null);
  const [editTotalPayment, setEditTotalPayment] = useState('');
  const [editPaid, setEditPaid] = useState('');
  const [editVideosPerWeek, setEditVideosPerWeek] = useState('');

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

  const totalPendingPayout = useMemo(() => {
    return clients.reduce((sum, c) => sum + Math.max(0, c.totalContractPayment - c.amountPaid), 0);
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

      // Automatically generate regular client queue items
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

      // Automatically compile weekly content obligations
      if (weeklyTarget > 0) {
        for (let i = 1; i <= weeklyTarget; i++) {
          generatedTasks.push({
            id: `${id}-weekly-task-${i}-${Date.now()}`,
            text: `${newName.toUpperCase()} - WEEKLY REEL #${i}`,
            completed: false,
            date: todayStr
          });
        }

        // Calculate and append the Daily Editing Target (Assumes a standard 5-day active work week)
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

      // Automatically push an updated daily quota alert task if parameters shift
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
    <div className="min-h-screen text-black p-4 pb-40 max-w-7xl mx-auto relative select-none antialiased">
      <header className="text-center my-6">
        <div className="inline-block bg-black text-white px-4 py-1 rounded-md text-[10px] font-black tracking-widest uppercase mb-2 border-2 border-black shadow-[2px_2px_0px_0px_#A3E635]">⚡ CONTRACT WEEKLY TARGET COMPILER ACTIVE ⚡</div>
        <h1 className="text-4xl font-black tracking-tight uppercase font-mono-display relative inline-block block">NATEHUB_<span className="absolute -bottom-1 left-0 w-full h-1 bg-black rounded-full"></span></h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
        
        {/* COLUMN 1: LEFT CARD CABINET */}
        <div className="lg:col-span-6 space-y-6 max-w-md lg:max-w-none mx-auto w-full">
          <section className="bg-white border-3 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_#000] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 border-b-3 border-l-3 border-black flex items-center justify-center font-black text-xl rotate-12 translate-x-4 -translate-y-4">+</div>
            <h2 className="font-black text-[11px] uppercase tracking-wider mb-4 text-neutral-400 font-mono-display">CREATE REVENUE NODE</h2>
            <form onSubmit={handleAddClient} className="space-y-3">
              <input type="text" placeholder="CLIENT IDENTIFIER NAME" value={newName} onChange={e => setNewName(e.target.value)} className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent focus:bg-amber-50/30 outline-none placeholder-neutral-400 transition-all" required />
              
              <div className="grid grid-cols-2 gap-2">
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none transition-all" required />
                <input type="number" placeholder="TOTAL CONTRACT PAYMENT ($)" value={newTotalPayment} onChange={e => setNewTotalPayment(e.target.value)} className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="TOTAL VIDEOS IN QUEUE" value={newRemaining} onChange={e => setNewRemaining(e.target.value)} className="w-full border-3 border-black rounded-xl p-3 text-xs font-black bg-transparent outline-none placeholder-neutral-400 transition-all" />
                <input type="number" placeholder="VIDEOS WANTED PER WEEK" value={newVideosPerWeek} onChange={e => setNewVideosPerWeek(e.target.value)} className="w-full border-3 border-emerald-500 rounded-xl p-3 text-xs font-black bg-emerald-5/10 focus:bg-emerald-50/40 outline-none placeholder-neutral-400 transition-all" />
              </div>

              <button type="submit" className="w-full bg-black hover:bg-neutral-900 text-white font-black py-3.5 text-xs rounded-xl uppercase tracking-widest transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-y-0.5">GENERATE REVENUE NODE</button>
            </form>
          </section>

          {loading ? (
            <div className="text-center py-16 space-y-2">
              <p className="text-sm font-black font-mono-display animate-bounce">READING CORE SYNC TABLES...</p>
              <div className="w-12 h-2 bg-black mx-auto rounded-full animate-pulse"></div>
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
                      <span className="text-[10px] font-black tracking-widest uppercase font-mono-display truncate text-black flex items-center"><span className="mr-1.5 text-xs">📂</span> {client.name.split(' ')[0]}</span>
                    </div>

                    <div className={`border-3 border-black bg-white overflow-hidden shadow-[5px_5px_0px_0px_#000] ${isExpanded ? 'rounded-b-2xl rounded-tr-2xl' : 'rounded-2xl'}`}>
                      <div className="p-4 flex justify-between items-center border-b-3 border-black" style={{ backgroundColor: theme.bg }}>
                        <div onClick={() => setExpandedClientId(isExpanded ? null : client.id)} className="cursor-pointer flex-1 pr-2">
                          <h3 className="font-black text-lg tracking-tight text-black font-mono-display uppercase">{client.name}</h3>
                          <p className="text-[10px] font-bold text-black/60 mt-0.5">CONTRACT OPENED: {client.agreementDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] px-2.5 py-0.5 rounded-md font-black border-2 border-black bg-white text-black shadow-[1px_1px_0px_0px_#000] mb-1">{client.videosRemaining} REMAINING</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded font-mono font-black border border-black bg-emerald-300 text-black uppercase tracking-tighter">⚡ {client.videosPerWeek}/WEEK TARGET</span>
                          </div>
                          <div className="flex flex-col bg-white border-2 border-black rounded-lg overflow-hidden text-[9px] font-black shadow-[1px_1px_0px_0px_#000]">
                            <button type="button" onClick={() => moveClient(index, 'up')} disabled={index === 0} className="px-2 py-1 border-b-2 border-black hover:bg-neutral-100 disabled:opacity-30">▲</button>
                            <button type="button" onClick={() => moveClient(index, 'down')} disabled={index === clients.length - 1} className="px-2 py-1 hover:bg-neutral-100 disabled:opacity-30">▼</button>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-5 bg-white space-y-6">
                          <div>
                            <div className="flex justify-between text-[10px] font-black text-neutral-400 mb-1.5 font-mono-display">
                              <span>TIMELINE VELOCITY COMPLETION PROFILE</span>
                              <span className="text-black bg-neutral-100 px-1.5 py-0.5 border border-black rounded font-mono">{client.videosCompleted} / {totalVideos} FILMS</span>
                            </div>
                            <div className="w-full bg-neutral-100 border-3 border-black h-6 rounded-full p-0.5 overflow-hidden shadow-sm">
                              <div className="h-full rounded-full border-r-2 border-black transition-all duration-500 pattern-stripe" style={{ width: `${progressPercent}%`, backgroundColor: theme.accent }} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="border-2 border-black rounded-xl p-3 bg-neutral-50/50 flex flex-col items-center shadow-[2px_2px_0px_0px_#000]">
                              <span className="text-[9px] font-black text-neutral-400 uppercase tracking-wider mb-2">Backlog Queue</span>
                              <div className="flex items-center space-x-4">
                                <button type="button" onClick={() => adjustVideoCount(client.id, 'videosRemaining', -1)} className="w-7 h-7 rounded-lg border-2 border-black bg-white font-black shadow-[1px_1px_0px_0px_#000] flex items-center justify-center">-</button>
                                <span className="font-black font-mono text-sm">{client.videosRemaining}</span>
                                <button type="button" onClick={() => adjustVideoCount(client.id, 'videosRemaining', 1)} className="w-7 h-7 rounded-lg border-2 border-black bg-white font-black shadow-[1px_1px_0px_0px_#000] flex items-center justify-center">+</button>
                              </div>
                            </div>
                            <div className="border-2 border-black rounded-xl p-3 bg-neutral-50/50 flex flex-col items-center shadow-[2px_2px_0px_0px_#000]">
                              <span className="text-[9px] font-black text-neutral-400 uppercase tracking-wider mb-2">Delivered cuts</span>
                              <div className="flex items-center space-x-4">
                                <button type="button" onClick={() => adjustVideoCount(client.id, 'videosCompleted', -1)} className="w-7 h-7 rounded-lg border-2 border-black bg-white font-black shadow-[1px_1px_0px_0px_#000] flex items-center justify-center">-</button>
                                <span className="font-black font-mono text-sm">{client.videosCompleted}</span>
                                <button type="button" onClick={() => adjustVideoCount(client.id, 'videosCompleted', 1)} className="w-7 h-7 rounded-lg border-2 border-black bg-white font-black shadow-[1px_1px_0px_0px_#000] flex items-center justify-center">+</button>
                              </div>
                            </div>
                          </div>

                          <div className="border-2 border-black rounded-xl p-4 bg-white space-y-2.5 text-xs font-semibold shadow-[2px_2px_0px_0px_#000]">
                            {editingClientId === client.id ? (
                              <div className="space-y-3 pt-1">
                                <div className="flex items-center justify-between"><label className="text-[10px] font-black text-neutral-400 font-mono-display">CONTRACT VALUE ($):</label><input type="number" value={editTotalPayment} onChange={e => setEditTotalPayment(e.target.value)} className="w-28 border-2 border-black rounded-lg p-1.5 text-right font-mono font-bold bg-amber-50/40" /></div>
                                <div className="flex items-center justify-between"><label className="text-[10px] font-black text-neutral-400 font-mono-display">RETAINER PAID ($):</label><input type="number" value={editPaid} onChange={e => setEditPaid(e.target.value)} className="w-28 border-2 border-black rounded-lg p-1.5 text-right font-mono font-bold bg-amber-50/40" /></div>
                                <div className="flex items-center justify-between"><label className="text-[10px] font-black text-emerald-500 font-mono-display">VIDEOS PER WEEK:</label><input type="number" value={editVideosPerWeek} onChange={e => setEditVideosPerWeek(e.target.value)} className="w-28 border-2 border-emerald-500 rounded-lg p-1.5 text-right font-mono font-bold bg-emerald-50/10" /></div>
                                <button type="button" onClick={() => saveEdit(client.id)} className="w-full bg-black text-white text-[10px] font-black py-2.5 rounded-lg uppercase tracking-wider mt-1">COMMIT VALUE PARAMETERS</button>
                              </div>
                            ) : (
                              <>
                                <div className="flex justify-between text-neutral-600"><span>Weekly Delivery Velocity:</span><span className="font-mono font-bold text-emerald-600">{client.videosPerWeek} clips / week</span></div>
                                <div className="flex justify-between text-neutral-600"><span>Total Contract Cap:</span><span className="font-mono font-bold text-black">${client.totalContractPayment}</span></div>
                                <div className="flex justify-between text-neutral-600"><span>Retainer Cleared:</span><span className="font-mono font-bold text-emerald-600">+{client.amountPaid}</span></div>
                                <div className="flex justify-between border-t-2 border-black pt-2.5 mt-2 font-black text-black">
                                  <span className="font-mono-display text-[11px] uppercase tracking-wider">Unbilled Collection:</span>
                                  <span className="font-mono text-base text-blue-600 bg-blue-50 border border-blue-400 px-2 rounded-md">${Math.max(0, client.totalContractPayment - client.amountPaid)}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                  <button type="button" onClick={() => startEditing(client)} className="bg-neutral-50 hover:bg-neutral-100 border-2 border-black rounded-lg font-black py-2 text-[10px] uppercase shadow-[1px_1px_0px_0px_#000]">Modify Ledger</button>
                                  <button type="button" onClick={() => handleDeleteClient(client.id)} className="bg-red-50 hover:bg-red-100 border-2 border-red-500 text-red-600 rounded-lg font-black py-2 text-[10px] uppercase shadow-[1px_1px_0px_0px_#EF4444]">Drop Record</button>
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
        </div>

        {/* COLUMN 2: CENTER PANEL STICKY CARD */}
        <div className="lg:col-span-3 w-full max-w-md lg:max-w-none mx-auto lg:sticky lg:top-6">
          <GlobalCalendarSticky clients={clients} />
        </div>

        {/* COLUMN 3: RIGHT PANEL STICKY CARD */}
        <div className="lg:col-span-3 w-full max-w-md lg:max-w-none mx-auto lg:sticky lg:top-6">
          <StickyTodoLog refreshTrigger={todoRefreshTrigger} onTodoStateChange={(count) => setCompletedTodosCount(count)} />
        </div>

      </div>

      {/* FOOTER PIPELINE STATUS LEDGER */}
      <footer className="fixed bottom-6 left-6 right-6 bg-black text-white border-3 border-black p-4 rounded-2xl flex justify-between items-center shadow-[4px_4px_0px_0px_#A3E635] max-w-md mx-auto z-50">
        <div className="pl-1">
          <span className="text-[10px] font-black text-neutral-400 block uppercase tracking-widest font-mono-display">AGGREGATE PIPELINE REVENUE</span>
          <p className="text-[10px] text-neutral-400/60 font-medium font-mono">Completed tasks: {completedTodosCount}</p>
        </div>
        <div className="bg-[#73C2FB] text-black border-2 border-black px-4 py-2 rounded-xl">
          <span className="text-base font-black font-mono">${totalPendingPayout.toLocaleString()}</span>
        </div>
      </footer>
    </div>
  );
}
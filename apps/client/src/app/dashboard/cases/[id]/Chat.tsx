'use client';

import { useEffect, useRef, useState } from 'react';
import { caseApi } from '../../../../services/api';
import { useAuth } from '../../../../contexts/AuthContext';

interface ChatProps {
  caseId: string;
}

export default function Chat({ caseId }: ChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Polling para mensajes (cada 3s)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchMessages = () => {
      caseApi.getCaseMessages(caseId)
        .then((res) => setMessages(res.data))
        .catch((err) => setError(err.response?.data?.message || 'Error al cargar mensajes'))
        .finally(() => setLoading(false));
    };
    fetchMessages();
    interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [caseId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    try {
      await caseApi.sendCaseMessage(caseId, input);
      setInput('');
      // Refrescar mensajes inmediatamente
      const res = await caseApi.getCaseMessages(caseId);
      setMessages(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al enviar mensaje');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="text-slate-600 dark:text-slate-400">Cargando chat...</div>;
  if (error) return <div className="text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mt-8">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Chat del Caso Clínico</h2>
      <div className="h-64 overflow-y-auto space-y-2 mb-4 bg-slate-50 dark:bg-slate-900 rounded p-2">
        {!messages || messages.length === 0 ? (
          <div className="text-slate-500 dark:text-slate-400 text-sm">No hay mensajes aún.</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg shadow text-sm ${msg.senderId === user?.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'}`}>
                <div className="font-semibold mb-1">
                  {msg.senderType === 'doctor' ? 'Médico' : 'Paciente'}
                  {msg.senderId === user?.id && ' (Tú)'}
                </div>
                <div>{msg.content}</div>
                <div className="text-xs text-slate-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          placeholder="Escribe un mensaje..."
          disabled={sending}
        />
        <button type="submit" disabled={sending || !input.trim()} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          Enviar
        </button>
      </form>
    </div>
  );
} 
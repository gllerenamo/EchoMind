'use client';

import { useEffect, useState } from 'react';
import { chatApi } from '../../../services/api';
import Link from 'next/link';

export default function ChatsPage() {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    chatApi.getUserChats()
      .then(setChats)
      .catch(() => setError('Error al cargar chats'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Historial de Chats</h1>
      {loading ? (
        <div className="text-slate-600 dark:text-slate-400">Cargando...</div>
      ) : error ? (
        <div className="text-red-600 dark:text-red-400">{error}</div>
      ) : chats.length === 0 ? (
        <div className="text-slate-500 dark:text-slate-400">No hay chats disponibles.</div>
      ) : (
        <div className="space-y-4">
          {chats.map((item: any) => (
            <Link key={item.case.id} href={`/dashboard/cases/${item.case.id}`} className="block bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  <strong>Caso:</strong> {item.case.title}
                </div>
                <div className="text-xs text-slate-400">
                  {item.lastMessage?.createdAt ? new Date(item.lastMessage.createdAt).toLocaleString() : 'Sin mensajes'}
                </div>
              </div>
              <div className="text-sm text-slate-900 dark:text-white mb-1">
                {item.lastMessage?.content ? (
                  <>
                    <strong>Último mensaje:</strong> {item.lastMessage.content}
                  </>
                ) : (
                  <span className="text-slate-400">Sin mensajes aún</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 
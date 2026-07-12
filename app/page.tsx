'use client';
import { useState } from 'react';

export default function Home() {
  const [script, setScript] = useState('');
  const [rawUrl, setRawUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!script.trim()) return;
    setLoading(true);
    const res = await fetch('/api/paste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script }),
    });
    const data = await res.json();
    setRawUrl(data.raw_url);
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Lua Script Pastebin</h1>
      <textarea
        value={script}
        onChange={e => setScript(e.target.value)}
        placeholder="Вставь Lua‑скрипт..."
        rows={15}
        style={{ width: '100%', maxWidth: 600, display: 'block', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Сохраняю...' : 'Сохранить'}
      </button>
      {rawUrl && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Raw‑ссылка (для executor):</strong><br />
          <a href={rawUrl} target="_blank" rel="noopener noreferrer">{rawUrl}</a>
        </div>
      )}
    </main>
  );
}

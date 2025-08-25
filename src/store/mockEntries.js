// Simple localStorage-backed mock data store for daily wellness entries
// Entry shape: { id, date (YYYY-MM-DD), steps (number), sleepHours (number), mood (1-5), notes (string) }

const STORAGE_KEY = "wellness_entries";

function readEntriesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeEntriesToStorage(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getAllEntries() {
  // Sort by date desc by default
  return readEntriesFromStorage().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestEntry() {
  const all = getAllEntries();
  return all[0] || null;
}

export function addEntry(entry) {
  const entries = readEntriesFromStorage();
  const withId = { ...entry, id: generateId() };
  entries.push(withId);
  writeEntriesToStorage(entries);
  return withId;
}

export function updateEntry(id, updates) {
  const entries = readEntriesFromStorage();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  entries[idx] = { ...entries[idx], ...updates };
  writeEntriesToStorage(entries);
  return entries[idx];
}

export function deleteEntry(id) {
  const entries = readEntriesFromStorage();
  const filtered = entries.filter((e) => e.id !== id);
  writeEntriesToStorage(filtered);
}

export function clearAllEntries() {
  writeEntriesToStorage([]);
}

export function exportEntriesAsCSV() {
  const entries = getAllEntries();
  const header = ["Date", "Steps", "SleepHours", "Mood", "Notes"];
  const rows = entries.map((e) => [e.date, e.steps, e.sleepHours, e.mood, (e.notes || "").replace(/\n/g, " ")]);
  const csv = [header, ...rows]
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wellness_entries.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function exportEntriesAsPDFLike() {
  // Open a printable window; users can choose "Save as PDF"
  const entries = getAllEntries();
  const w = window.open("", "_blank");
  if (!w) return;
  const rows = entries
    .map(
      (e) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">${e.date}</td>
          <td style="padding:8px;border:1px solid #ddd;">${e.steps}</td>
          <td style="padding:8px;border:1px solid #ddd;">${e.sleepHours}</td>
          <td style="padding:8px;border:1px solid #ddd;">${e.mood}</td>
          <td style="padding:8px;border:1px solid #ddd;">${(e.notes || "").replace(/</g, "&lt;")}</td>
        </tr>`
    )
    .join("");
  w.document.write(`
    <html>
      <head>
        <title>Wellness Entries</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; }
          h1 { margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { font-size: 12px; }
          th { background: #f3f4f6; }
        </style>
      </head>
      <body>
        <h1>Wellness Entries</h1>
        <table>
          <thead>
            <tr>
              <th style="padding:8px;border:1px solid #ddd;">Date</th>
              <th style="padding:8px;border:1px solid #ddd;">Steps</th>
              <th style="padding:8px;border:1px solid #ddd;">Sleep</th>
              <th style="padding:8px;border:1px solid #ddd;">Mood</th>
              <th style="padding:8px;border:1px solid #ddd;">Notes</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `);
  w.document.close();
}

export function seedIfEmpty() {
  const existing = readEntriesFromStorage();
  if (existing.length > 0) return;
  const today = new Date();
  const toISODate = (d) => d.toISOString().slice(0, 10);
  const samples = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return {
      id: generateId(),
      date: toISODate(d),
      steps: 4000 + Math.floor(Math.random() * 6000),
      sleepHours: 5 + Math.round(Math.random() * 5),
      mood: 2 + Math.floor(Math.random() * 4),
      notes: "Seeded entry",
    };
  });
  writeEntriesToStorage(samples);
}



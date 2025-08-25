const STORAGE_KEY = "wellness_entries";

const sampleData = [
  { id: 1, date: "2025-01-15", steps: 8432, sleepHours: 7.5, mood: 4, notes: "Good day, felt energetic" },
  { id: 2, date: "2025-01-16", steps: 10234, sleepHours: 8.2, mood: 5, notes: "Excellent sleep, very productive" },
  { id: 3, date: "2025-01-17", steps: 5678, sleepHours: 6.8, mood: 3, notes: "Tired, need more rest" },
  { id: 4, date: "2025-01-18", steps: 12345, sleepHours: 7.0, mood: 4, notes: "Long walk, feeling good" },
  { id: 5, date: "2025-01-19", steps: 7890, sleepHours: 8.5, mood: 5, notes: "Great weekend, well rested" },
  { id: 6, date: "2025-01-20", steps: 6543, sleepHours: 6.5, mood: 2, notes: "Stressful day, poor sleep" },
  { id: 7, date: "2025-01-21", steps: 9876, sleepHours: 7.8, mood: 4, notes: "Recovered well, good mood" },
  { id: 8, date: "2025-01-22", steps: 11234, sleepHours: 8.0, mood: 5, notes: "Perfect day, all goals met" },
  { id: 9, date: "2025-01-23", steps: 4567, sleepHours: 6.2, mood: 3, notes: "Busy day, limited exercise" },
  { id: 10, date: "2025-01-24", steps: 13456, sleepHours: 7.5, mood: 4, notes: "Active day, feeling strong" },
];

export function getAllEntries() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return sampleData;
  } catch {
    return sampleData;
  }
}

export function getLatestEntry() {
  const entries = getAllEntries();
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

export function addEntry(entry) {
  const entries = getAllEntries();
  const newEntry = {
    ...entry,
    id: Date.now(),
    date: entry.date || new Date().toISOString().split('T')[0]
  };
  const updatedEntries = [...entries, newEntry];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
  return newEntry;
}

export function updateEntry(id, updates) {
  const entries = getAllEntries();
  const updatedEntries = entries.map(entry => 
    entry.id === id ? { ...entry, ...updates } : entry
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
  return updatedEntries.find(entry => entry.id === id);
}

export function deleteEntry(id) {
  const entries = getAllEntries();
  const updatedEntries = entries.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
}

export function seedIfEmpty() {
  const entries = getAllEntries();
  if (entries.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
  }
}

export function exportToCSV() {
  const entries = getAllEntries();
  const headers = ["Date", "Steps", "Sleep Hours", "Mood", "Notes"];
  const csvContent = [
    headers.join(","),
    ...entries.map(entry => [
      entry.date,
      entry.steps,
      entry.sleepHours,
      entry.mood,
      `"${entry.notes || ''}"`
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `wellness_data_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function exportToPDF() {
  const entries = getAllEntries();
  const printWindow = window.open("", "_blank");
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wellness Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <h1>Wellness Tracking Report</h1>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Steps</th>
            <th>Sleep Hours</th>
            <th>Mood</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${entries.map(entry => `
            <tr>
              <td>${entry.date}</td>
              <td>${entry.steps}</td>
              <td>${entry.sleepHours}</td>
              <td>${entry.mood}</td>
              <td>${entry.notes || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.print();
}



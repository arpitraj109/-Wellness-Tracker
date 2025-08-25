import { useEffect, useMemo, useState } from "react";
import { addEntry, deleteEntry, getAllEntries, updateEntry } from "../store/mockEntries";

export default function AddEntry() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ id: null, date: "", steps: "", sleepHours: "", mood: "3", notes: "" });
  const isEditing = useMemo(() => Boolean(form.id), [form.id]);

  useEffect(() => {
    setEntries(getAllEntries());
  }, []);

  const resetForm = () => setForm({ id: null, date: "", steps: "", sleepHours: "", mood: "3", notes: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      date: form.date || new Date().toISOString().slice(0, 10),
      steps: Number(form.steps) || 0,
      sleepHours: Number(form.sleepHours) || 0,
      mood: Number(form.mood) || 3,
      notes: form.notes || "",
    };
    if (isEditing) {
      updateEntry(form.id, payload);
    } else {
      addEntry(payload);
    }
    setEntries(getAllEntries());
    resetForm();
  };

  const handleEdit = (entry) => {
    setForm({
      id: entry.id,
      date: entry.date,
      steps: String(entry.steps),
      sleepHours: String(entry.sleepHours),
      mood: String(entry.mood),
      notes: entry.notes || "",
    });
  };

  const handleDelete = (id) => {
    deleteEntry(id);
    setEntries(getAllEntries());
    if (form.id === id) resetForm();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Entries</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Date</label>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Steps</label>
          <input type="number" min="0" value={form.steps} onChange={(e) => setForm({ ...form, steps: e.target.value })} className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Sleep (hours)</label>
          <input type="number" min="0" step="0.5" value={form.sleepHours} onChange={(e) => setForm({ ...form, sleepHours: e.target.value })} className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Mood (1-5)</label>
          <input type="number" min="1" max="5" value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })} className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Notes</label>
          <input type="text" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700" />
        </div>
        <div className="md:col-span-6 flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">{isEditing ? "Update" : "Add"} Entry</button>
          {isEditing && (
            <button type="button" onClick={resetForm} className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md">Cancel</button>
          )}
        </div>
      </form>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Steps</th>
              <th className="px-4 py-2">Sleep</th>
              <th className="px-4 py-2">Mood</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-gray-100 dark:border-gray-800">
                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{e.date}</td>
                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{e.steps}</td>
                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{e.sleepHours}h</td>
                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{e.mood}</td>
                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{e.notes}</td>
                <td className="px-4 py-2 text-right">
                  <button onClick={() => handleEdit(e)} className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No entries yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { clearAllEntries, exportEntriesAsCSV, exportEntriesAsPDFLike, getAllEntries } from "../store/mockEntries";

export default function Settings() {
  const hasEntries = getAllEntries().length > 0;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <button onClick={exportEntriesAsCSV} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" disabled={!hasEntries}>
            Export CSV
          </button>
          <button onClick={exportEntriesAsPDFLike} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md" disabled={!hasEntries}>
            Export PDF
          </button>
          <button
            onClick={() => {
              if (confirm("Clear all entries?")) {
                clearAllEntries();
                location.reload();
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Clear All Data
          </button>
        </div>
        {!hasEntries && <p className="text-sm text-gray-500 dark:text-gray-400">No entries to export.</p>}
      </div>
    </div>
  );
}

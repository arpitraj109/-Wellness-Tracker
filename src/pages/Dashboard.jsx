import { useEffect, useMemo, useState } from "react";
import { getAllEntries, getLatestEntry } from "../store/mockEntries";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ReferenceLine,
  AreaChart,
  Area,
} from "recharts";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false
  );
  const latest = useMemo(() => getLatestEntry(), [entries]);

  useEffect(() => {
    setEntries(getAllEntries());
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const htmlEl = document.documentElement;
    const update = () => setIsDark(htmlEl.classList.contains("dark"));
    const observer = new MutationObserver(update);
    observer.observe(htmlEl, { attributes: true, attributeFilter: ["class"] });
    update();
    return () => observer.disconnect();
  }, []);

  const data = useMemo(
    () =>
      getAllEntries()
        .slice()
        .reverse()
        .map((e) => ({ date: e.date, steps: e.steps, sleep: e.sleepHours, mood: e.mood })),
    [entries]
  );

  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const axisColor = isDark ? "#9CA3AF" : "#374151";
  const tooltipStyles = isDark
    ? {
        contentStyle: { backgroundColor: "#111827", border: "1px solid #374151", borderRadius: 8 },
        labelStyle: { color: "#F9FAFB" },
        itemStyle: { color: "#F9FAFB" },
      }
    : {
        contentStyle: { backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 8 },
        labelStyle: { color: "#111827" },
        itemStyle: { color: "#111827" },
      };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Latest Steps</div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{latest?.steps ?? "-"}</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Latest Sleep</div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{latest?.sleepHours ?? "-"}h</div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Latest Mood</div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{latest?.mood ?? "-"}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Steps</h3>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="date" tick={{ fill: axisColor }} stroke={axisColor} />
                <YAxis tick={{ fill: axisColor }} stroke={axisColor} />
                <Tooltip {...tooltipStyles} />
                <Legend />
                <Line type="monotone" dataKey="steps" stroke="#2563eb" dot={false} name="Steps" />
                <Brush dataKey="date" height={20} travellerWidth={12} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sleep</h3>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="date" tick={{ fill: axisColor }} stroke={axisColor} />
                <YAxis tick={{ fill: axisColor }} stroke={axisColor} />
                <Tooltip {...tooltipStyles} />
                <Legend />
                <ReferenceLine y={8} stroke="#10b981" strokeDasharray="4 4" label="Sleep target" />
                <Line type="monotone" dataKey="sleep" stroke="#059669" dot={false} name="Sleep (h)" />
                <Brush dataKey="date" height={20} travellerWidth={12} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Mood</h3>
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" tick={{ fill: axisColor }} stroke={axisColor} />
              <YAxis domain={[1, 5]} tick={{ fill: axisColor }} stroke={axisColor} />
              <Tooltip {...tooltipStyles} />
              <Legend />
              <Area type="monotone" dataKey="mood" stroke="#8b5cf6" fill="url(#moodGradient)" name="Mood (1-5)" />
              <Brush dataKey="date" height={20} travellerWidth={12} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

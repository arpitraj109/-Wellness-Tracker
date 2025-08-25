import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddEntry from "./pages/AddEntry";
import Settings from "./pages/Settings";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import { seedIfEmpty } from "./store/mockEntries";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsAuthenticated(true);
    seedIfEmpty();
    
    const setFromWidth = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    setFromWidth();
    window.addEventListener("resize", setFromWidth);
    return () => window.removeEventListener("resize", setFromWidth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route
              path="/login"
              element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <div className="flex items-start justify-center p-6 pt-10">
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  </div>
                </div>
              }
            />
            <Route
              path="/signup"
              element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <div className="flex items-start justify-center p-6 pt-10">
                    <Signup setIsAuthenticated={setIsAuthenticated} />
                  </div>
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <div className="flex">
                  <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
                  />
                  {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/40 md:hidden z-30" onClick={() => setSidebarOpen(false)} />
                  )}
                  <div className={`flex-1 ${sidebarOpen ? (sidebarCollapsed ? "md:ml-16" : "md:ml-64") : "md:ml-0"}`}>
                    <Navbar onLogout={handleLogout} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
                    <div className="p-6">
                      <Dashboard />
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path="/add"
              element={
                <div className="flex">
                  <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
                  />
                  {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/40 md:hidden z-30" onClick={() => setSidebarOpen(false)} />
                  )}
                  <div className={`flex-1 ${sidebarOpen ? (sidebarCollapsed ? "md:ml-16" : "md:ml-64") : "md:ml-0"}`}>
                    <Navbar onLogout={handleLogout} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
                    <div className="p-6">
                      <AddEntry />
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="flex">
                  <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
                  />
                  {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/40 md:hidden z-30" onClick={() => setSidebarOpen(false)} />
                  )}
                  <div className={`flex-1 ${sidebarOpen ? (sidebarCollapsed ? "md:ml-16" : "md:ml-64") : "md:ml-0"}`}>
                    <Navbar onLogout={handleLogout} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
                    <div className="p-6">
                      <Settings />
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { pujas, temples, bookings } from "@/lib/data";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

type Tab = "overview" | "pujas" | "temples" | "bookings";

const statusColors: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { id: "overview" as Tab, icon: LayoutDashboard, label: "Overview" },
    { id: "pujas" as Tab, icon: BookOpen, label: "Manage Pujas" },
    { id: "temples" as Tab, icon: Building2, label: "Manage Temples" },
    { id: "bookings" as Tab, icon: CalendarCheck, label: "Bookings" },
  ];

  const totalRevenue = bookings.filter(b => b.status !== "cancelled").reduce((s, b) => s + b.amount, 0);
  const confirmedCount = bookings.filter(b => b.status === "confirmed").length;
  const pendingCount = bookings.filter(b => b.status === "pending").length;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">🙏</span>
              <span className="font-heading font-bold text-gradient-sacred">Admin</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-sidebar-accent">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                activeTab === item.id
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <Link to="/" className="text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-heading text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: "💰" },
                  { label: "Total Bookings", value: bookings.length, icon: "📋" },
                  { label: "Confirmed", value: confirmedCount, icon: "✅" },
                  { label: "Pending", value: pendingCount, icon: "⏳" },
                ].map((card) => (
                  <div key={card.label} className="rounded-xl bg-card p-5 shadow-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{card.label}</span>
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <div className="font-heading text-2xl font-bold">{card.value}</div>
                  </div>
                ))}
              </div>

              <h2 className="font-heading text-lg font-semibold mb-4">Recent Bookings</h2>
              <div className="rounded-xl bg-card shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">ID</th>
                      <th className="text-left p-4 font-semibold">Devotee</th>
                      <th className="text-left p-4 font-semibold">Puja</th>
                      <th className="text-left p-4 font-semibold">Amount</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map(b => (
                      <tr key={b.id} className="border-t border-border">
                        <td className="p-4 font-mono text-xs">{b.id}</td>
                        <td className="p-4">{b.userName}</td>
                        <td className="p-4 text-muted-foreground">{b.pujaTitle}</td>
                        <td className="p-4 font-semibold">₹{b.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[b.status]}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "pujas" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-heading text-2xl font-bold">Manage Pujas</h1>
                <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-sacred px-4 py-2 text-sm font-semibold text-primary-foreground shadow-warm">
                  <Plus className="w-4 h-4" /> Add Puja
                </button>
              </div>
              <div className="rounded-xl bg-card shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Puja</th>
                      <th className="text-left p-4 font-semibold">Temple</th>
                      <th className="text-left p-4 font-semibold">Date</th>
                      <th className="text-left p-4 font-semibold">Price</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pujas.map(p => (
                      <tr key={p.id} className="border-t border-border">
                        <td className="p-4">
                          <div className="font-semibold">{p.title}</div>
                          <div className="text-xs text-muted-foreground">{p.category}</div>
                        </td>
                        <td className="p-4 text-muted-foreground">{p.temple}</td>
                        <td className="p-4">{p.date}</td>
                        <td className="p-4 font-semibold">₹{p.price.toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "temples" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-heading text-2xl font-bold">Manage Temples</h1>
                <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-sacred px-4 py-2 text-sm font-semibold text-primary-foreground shadow-warm">
                  <Plus className="w-4 h-4" /> Add Temple
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {temples.map(t => (
                  <div key={t.id} className="rounded-xl bg-card p-5 shadow-card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading font-semibold">{t.name}</h3>
                        <p className="text-sm text-muted-foreground">{t.location}</p>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-md hover:bg-muted"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                        <button className="p-1.5 rounded-md hover:bg-muted"><Trash2 className="w-4 h-4 text-destructive" /></button>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{t.deity}</span>
                    <p className="text-sm text-muted-foreground mt-3">{t.description}</p>
                    <div className="text-xs text-muted-foreground mt-3">{t.pujaCount} pujas linked</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "bookings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-heading text-2xl font-bold mb-6">All Bookings</h1>
              <div className="rounded-xl bg-card shadow-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">ID</th>
                      <th className="text-left p-4 font-semibold">Devotee</th>
                      <th className="text-left p-4 font-semibold">Puja</th>
                      <th className="text-left p-4 font-semibold">Temple</th>
                      <th className="text-left p-4 font-semibold">Date</th>
                      <th className="text-left p-4 font-semibold">Amount</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className="border-t border-border">
                        <td className="p-4 font-mono text-xs">{b.id}</td>
                        <td className="p-4">{b.userName}</td>
                        <td className="p-4">{b.pujaTitle}</td>
                        <td className="p-4 text-muted-foreground">{b.temple}</td>
                        <td className="p-4">{b.date}</td>
                        <td className="p-4 font-semibold">₹{b.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[b.status]}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 rounded-md hover:bg-muted"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                            <button className="p-1.5 rounded-md hover:bg-muted"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

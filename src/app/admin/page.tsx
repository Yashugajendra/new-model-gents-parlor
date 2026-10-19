"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scissors,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  AlertTriangle,
  User,
  Phone,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Lock,
  LogOut,
  ArrowLeft,
  Share2,
  DollarSign,
  Layers,
} from "lucide-react";
import { Appointment, Service, ShopSettings } from "@/types/database.types";
import { INITIAL_SHOP_SETTINGS, NewModelData } from "@/lib/data";
import { formatDate, formatTime, formatCurrency, generateWhatsAppLink } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"pending" | "confirmed" | "services" | "settings">("pending");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<ShopSettings>(
    INITIAL_SHOP_SETTINGS
  );

  useEffect(() => {
    setServices(NewModelData.getServices());

    const savedSettings = NewModelData.getSettings();

    setSettings({
      ...savedSettings,
      address: savedSettings.address
        .replace(/\s*,\s*/g, ", ")
        .trim(),
    });
  }, []);

  // Modal states
  const [conflictModalData, setConflictModalData] = useState<{
    target: Appointment;
    conflict: Appointment;
  } | null>(null);

  const [rejectModalData, setRejectModalData] = useState<{
    appointment: Appointment;
    reason: string;
  } | null>(null);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Success toast
  const [toastMessage, setToastMessage] = useState("");

  const refreshData = () => {
    setAppointments(NewModelData.getAppointments());
    setServices(NewModelData.getServices());
    setSettings(NewModelData.getSettings());
  };

  useEffect(() => {
    // Check if owner session exists in sessionStorage
    const session = sessionStorage.getItem("newmodel_admin_auth");
    if (session === "true") {
      setIsAuthenticated(true);
    }
    refreshData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode: 1234 or newmodel
    if (pinInput === "1234" || pinInput.toLowerCase() === "newmodel" || pinInput.toLowerCase() === "ritualcut") {
      setIsAuthenticated(true);
      sessionStorage.setItem("newmodel_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid passcode. Use demo passcode: 1234");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("newmodel_admin_auth");
  };

  // Concurrency-Safe Approval Handler
  const handleApprove = (appointment: Appointment) => {
    const result = NewModelData.approveAppointment(appointment.id);
    if (!result.success) {
      if (result.code === "CONFLICT_OVERLAPPING_CONFIRMED" && result.conflictingAppointment) {
        setConflictModalData({
          target: appointment,
          conflict: result.conflictingAppointment,
        });
      } else {
        alert(result.message);
      }
      return;
    }
    refreshData();
    showToast(`Confirmed appointment ${appointment.booking_reference} for ${appointment.customer_name}!`);
  };

  // Rejection Handler
  const handleRejectConfirm = () => {
    if (!rejectModalData) return;
    NewModelData.rejectAppointment(rejectModalData.appointment.id, rejectModalData.reason);
    refreshData();
    setRejectModalData(null);
    showToast(`Rejected request ${rejectModalData.appointment.booking_reference}.`);
  };

  const handleUpdateStatus = (id: string, status: Appointment["status"]) => {
    NewModelData.updateAppointmentStatus(id, status);
    refreshData();
    showToast(`Updated status to ${status}.`);
  };

  // Service CRUD
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    NewModelData.saveService(editingService);
    refreshData();
    setIsServiceModalOpen(false);
    setEditingService(null);
    showToast("Service saved successfully.");
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      NewModelData.deleteService(id);
      refreshData();
      showToast("Service deleted.");
    }
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    NewModelData.updateSettings(settings);
    refreshData();
    showToast("Shop settings updated.");
  };

  // Filter lists
  const pendingAppointments = appointments.filter((a) => a.status === "PENDING");
  const confirmedAppointments = appointments.filter(
    (a) => a.status === "CONFIRMED" || a.status === "COMPLETED"
  );

  // If not logged in, render PIN prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#121215] border border-white/[0.08] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#1a1a1f] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold">Owner Sanctuary Access</h2>
            <p className="text-xs text-[#94a3b8]">
              Enter master PIN to manage appointments, services, and shop availability.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Master Passcode (Demo: 1234)
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passcode"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#18181d] border border-white/[0.1] text-white text-center text-lg tracking-widest font-mono focus:outline-none focus:border-[#c5a880]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b38f5c] text-[#09090b] font-semibold text-sm hover:brightness-110 transition-all"
            >
              Unlock Dashboard
            </button>
            <div className="text-center">
              <Link href="/" className="text-xs text-gray-500 hover:text-white">
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f8fafc] flex flex-col">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#16161b] border border-[#c5a880] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#c5a880]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="border-b border-white/[0.08] bg-[#0d0d10] py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a1a20] to-[#121215] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <span className="font-serif font-bold text-xs text-[#c5a880]">NM</span>
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                NEW MODEL <span className="text-[#c5a880]">GENTS PARLOR</span>
              </span>
              <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-[#c5a880]/20 text-[#c5a880] font-semibold uppercase tracking-wider">
                Owner Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              target="_blank"
              className="text-[#94a3b8] hover:text-white hidden sm:flex items-center gap-1"
            >
              <span>View Live Website</span>
              <ArrowLeft className="w-3 h-3 rotate-135" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-500/50 hover:bg-red-950/20 text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#121215] border border-white/[0.06]">
            <div className="flex items-center justify-between text-xs text-[#94a3b8]">
              <span>Pending Queue</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-white mt-1">
              {pendingAppointments.length}
            </div>
            <span className="text-[10px] text-amber-400">Needs master review</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121215] border border-white/[0.06]">
            <div className="flex items-center justify-between text-xs text-[#94a3b8]">
              <span>Confirmed Slots</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-white mt-1">
              {confirmedAppointments.filter((a) => a.status === "CONFIRMED").length}
            </div>
            <span className="text-[10px] text-emerald-400">Locked in calendar</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121215] border border-white/[0.06]">
            <div className="flex items-center justify-between text-xs text-[#94a3b8]">
              <span>Active Services</span>
              <Layers className="w-4 h-4 text-[#c5a880]" />
            </div>
            <div className="text-2xl font-serif font-bold text-white mt-1">
              {services.filter((s) => s.is_active).length}
            </div>
            <span className="text-[10px] text-[#94a3b8]">On customer menu</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121215] border border-white/[0.06]">
            <div className="flex items-center justify-between text-xs text-[#94a3b8]">
              <span>Total History</span>
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-serif font-bold text-white mt-1">
              {appointments.length}
            </div>
            <span className="text-[10px] text-[#94a3b8]">All-time bookings</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/[0.08] gap-4 overflow-x-auto text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${activeTab === "pending"
              ? "border-[#c5a880] text-[#c5a880] font-semibold"
              : "border-transparent text-[#94a3b8] hover:text-white"
              }`}
          >
            <span>Pending Requests</span>
            {pendingAppointments.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                {pendingAppointments.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("confirmed")}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${activeTab === "confirmed"
              ? "border-[#c5a880] text-[#c5a880] font-semibold"
              : "border-transparent text-[#94a3b8] hover:text-white"
              }`}
          >
            <span>Confirmed Schedule</span>
            <span className="text-xs text-gray-500">
              ({confirmedAppointments.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${activeTab === "services"
              ? "border-[#c5a880] text-[#c5a880] font-semibold"
              : "border-transparent text-[#94a3b8] hover:text-white"
              }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Services & Rates</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${activeTab === "settings"
              ? "border-[#c5a880] text-[#c5a880] font-semibold"
              : "border-transparent text-[#94a3b8] hover:text-white"
              }`}
          >
            <Settings className="w-4 h-4" />
            <span>Shop Settings</span>
          </button>
        </div>

        {/* TAB 1: PENDING REQUESTS QUEUE */}
        {activeTab === "pending" && (
          <div className="space-y-4">
            {pendingAppointments.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#121215] border border-white/[0.06] space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="font-serif text-lg text-white">Queue is Clear!</h3>
                <p className="text-xs text-[#94a3b8]">
                  No pending appointment requests waiting for review.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-5 rounded-2xl bg-[#121215] border border-amber-500/20 space-y-4 shadow-lg hover:border-amber-500/40 transition-all"
                  >
                    <div className="flex items-start justify-between border-b border-white/[0.06] pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#c5a880]">
                          {apt.booking_reference}
                        </span>
                        <h4 className="font-medium text-white text-base">
                          {apt.customer_name}
                        </h4>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        Pending Approval
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#94a3b8]">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Scissors className="w-3.5 h-3.5 text-[#c5a880]" /> Service:
                        </span>
                        <span className="text-white font-medium">
                          {apt.service_name_snapshot} ({apt.service_duration_snapshot}m)
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#c5a880]" /> Requested:
                        </span>
                        <span className="text-white font-medium">
                          {formatDate(apt.start_time)} at {formatTime(apt.start_time)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#c5a880]" /> Phone:
                        </span>
                        <a
                          href={`tel:${apt.customer_phone}`}
                          className="text-white hover:text-[#c5a880] underline"
                        >
                          {apt.customer_phone}
                        </a>
                      </div>

                      {apt.customer_notes && (
                        <div className="p-2.5 rounded-lg bg-[#18181d] text-[11px] text-gray-300 italic border border-white/[0.04]">
                          &ldquo;{apt.customer_notes}&rdquo;
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(apt)}
                        className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Slot</span>
                      </button>

                      <button
                        onClick={() => setRejectModalData({ appointment: apt, reason: "" })}
                        className="py-2 px-3 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-medium flex items-center justify-center gap-1 transition-all"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Decline</span>
                      </button>

                      <a
                        href={generateWhatsAppLink(
                          apt.customer_phone,
                          `Hello ${apt.customer_name}, this is the Master Barber from ${settings.shop_name || "New Model Gents Beauty Parlor"} regarding your appointment request (Ref: ${apt.booking_reference}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30"
                        title="Chat on WhatsApp"
                      >
                        <Share2 className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONFIRMED SCHEDULE */}
        {activeTab === "confirmed" && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl bg-[#121215] border border-white/[0.08] shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#18181d] border-b border-white/[0.06] text-[#94a3b8] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Ref Code</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Scheduled Time</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {confirmedAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#c5a880]">
                        {apt.booking_reference}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white">{apt.customer_name}</div>
                        <div className="text-[11px] text-gray-500">{apt.customer_phone}</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-300">
                        {apt.service_name_snapshot} ({formatCurrency(apt.service_price_snapshot)})
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-white font-medium">{formatDate(apt.start_time)}</div>
                        <div className="text-[11px] text-gray-400">
                          {formatTime(apt.start_time)} – {formatTime(apt.end_time)}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${apt.status === "CONFIRMED"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                            }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {apt.status === "CONFIRMED" && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, "COMPLETED")}
                            className="px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-[11px] font-medium"
                          >
                            Mark Done
                          </button>
                        )}
                        <button
                          onClick={() => handleUpdateStatus(apt.id, "CANCELLED")}
                          className="px-2 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-300 text-[11px]"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES & RATES */}
        {activeTab === "services" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg text-white">Barbershop Service Catalog</h3>
              <button
                onClick={() => {
                  setEditingService({
                    id: `srv-${Date.now()}`,
                    name: "",
                    slug: `custom-${Date.now()}`,
                    description: "",
                    duration_minutes: 45,
                    price: 800,
                    is_active: true,
                    display_order: services.length + 1,
                  });
                  setIsServiceModalOpen(true);
                }}
                className="py-2 px-3.5 rounded-lg bg-[#c5a880] text-[#09090b] font-semibold text-xs flex items-center gap-1.5 hover:brightness-110"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-5 rounded-2xl bg-[#121215] border border-white/[0.08] flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-base text-white font-medium">{srv.name}</h4>
                      {srv.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#c5a880]/20 text-[#c5a880]">
                          {srv.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#94a3b8] mt-2 line-clamp-2">{srv.description}</p>
                  </div>

                  <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-white font-bold text-sm">
                        {formatCurrency(srv.price)}
                      </span>
                      <span className="text-gray-400 ml-2">({srv.duration_minutes} mins)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingService(srv);
                          setIsServiceModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/[0.05]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 rounded hover:bg-white/[0.05]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SHOP SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-[#121215] p-6 rounded-2xl border border-white/[0.08] shadow-xl">
            <h3 className="font-serif text-lg text-white mb-4">Shop Settings & Business Rules</h3>
            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Barbershop Brand Name</label>
                <input
                  type="text"
                  value={settings.shop_name}
                  onChange={(e) => setSettings({ ...settings, shop_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone_number}
                    onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">WhatsApp Number (with country code)</label>
                  <input
                    type="text"
                    value={settings.whatsapp_number}
                    onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Opening Time</label>
                  <input
                    type="time"
                    value={settings.opening_time}
                    onChange={(e) => setSettings({ ...settings, opening_time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Closing Time</label>
                  <input
                    type="time"
                    value={settings.closing_time}
                    onChange={(e) => setSettings({ ...settings, closing_time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Slot Interval (Minutes)</label>
                <select
                  value={settings.slot_interval_minutes}
                  onChange={(e) => setSettings({ ...settings, slot_interval_minutes: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                >
                  <option value={15}>15 Minutes</option>
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Physical Address</label>
                <textarea
                  rows={2}
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 rounded-lg bg-[#c5a880] text-[#09090b] font-semibold text-xs hover:brightness-110"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}
      </div>

      {/* CONFLICT MODAL: Proves the transactional booking rule! */}
      {conflictModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#141418] border border-red-500/50 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg font-bold text-white">
                Booking Conflict Detected
              </h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              You cannot confirm this appointment because its requested time window directly overlaps with
              an already <strong className="text-emerald-400 font-semibold">CONFIRMED</strong> appointment in the database.
            </p>

            <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/40 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Target Request:</span>
                <span className="text-white font-medium">
                  {conflictModalData.target.customer_name} ({formatTime(conflictModalData.target.start_time)} - {formatTime(conflictModalData.target.end_time)})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Existing Confirmed Slot:</span>
                <span className="text-emerald-300 font-medium">
                  {conflictModalData.conflict.customer_name} (Ref: {conflictModalData.conflict.booking_reference})
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#94a3b8]">
              Recommendation: Contact {conflictModalData.target.customer_name} via WhatsApp to offer an alternative slot, or decline this request.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <a
                href={generateWhatsAppLink(
                  conflictModalData.target.customer_phone,
                  `Hello ${conflictModalData.target.customer_name}, I am following up on your ${settings.shop_name || "New Model Gents Beauty Parlor"} request (Ref: ${conflictModalData.target.booking_reference}). The requested time has already been booked. Would you like to reschedule for another time today?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Message Customer</span>
              </a>
              <button
                onClick={() => setConflictModalData(null)}
                className="py-2 px-4 rounded-lg bg-[#27272a] text-white text-xs hover:bg-[#3f3f46]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#141418] border border-white/[0.1] shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Decline Appointment Request</h3>
            <p className="text-xs text-gray-400">
              Provide a reason for declining this request ({rejectModalData.appointment.booking_reference}). The customer will be able to see this reason on their status page.
            </p>
            <textarea
              rows={3}
              placeholder="e.g. Barber attending training, or slot unavailable..."
              value={rejectModalData.reason}
              onChange={(e) =>
                setRejectModalData({ ...rejectModalData, reason: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-[#18181d] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-[#c5a880]"
            />
            <div className="flex justify-end gap-2 pt-2 text-xs">
              <button
                onClick={() => setRejectModalData(null)}
                className="py-2 px-3.5 rounded-lg border border-white/10 text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="py-2 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE EDIT/ADD MODAL */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#141418] border border-white/[0.1] shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">
              {editingService.name ? "Edit Service" : "Add New Service"}
            </h3>
            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Duration (Minutes) *</label>
                  <input
                    type="number"
                    required
                    min={10}
                    step={5}
                    value={editingService.duration_minutes}
                    onChange={(e) => setEditingService({ ...editingService, duration_minutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={50}
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Badge (Optional, e.g. &apos;Signature&apos;)</label>
                <input
                  type="text"
                  value={editingService.badge || ""}
                  onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#18181d] border border-white/[0.1] text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="srv-active"
                  checked={editingService.is_active}
                  onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked })}
                  className="rounded border-white/20"
                />
                <label htmlFor="srv-active" className="text-gray-300">
                  Visible on public website menu
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="py-2 px-3.5 rounded-lg border border-white/10 text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-[#c5a880] text-[#09090b] font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

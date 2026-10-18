import React, { useState, useEffect } from 'react';
import {
  RegistrationRecord,
  TournamentSettings,
  PrizeItemSettings,
} from '../types';
import {
  fetchAllRegistrations,
  saveSettings,
  SUPABASE_SQL_SETUP_SCRIPT,
  getSupabaseClient,
} from '../lib/supabase';
import {
  Users,
  Settings,
  Gift,
  Database,
  Search,
  Download,
  ExternalLink,
  Check,
  X,
  Lock,
  RefreshCw,
  Copy,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TournamentSettings;
  onSettingsUpdated: (newSettings: TournamentSettings) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsUpdated,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState<'records' | 'whatsapp' | 'prizes' | 'supabase'>('records');
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [isFromSupabase, setIsFromSupabase] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState<string>('all');

  // Editable settings copy
  const [editableSettings, setEditableSettings] = useState<TournamentSettings>(settings);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    setEditableSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadRecords();
    }
  }, [isOpen, isAuthenticated]);

  const loadRecords = async () => {
    setIsLoadingRecords(true);
    try {
      const res = await fetchAllRegistrations();
      setRecords(res.data);
      setIsFromSupabase(res.fromSupabase);
    } catch (e) {
      console.error('Error cargando registros:', e);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === settings.adminPin || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN incorrecto. El PIN por defecto es 1234');
    }
  };

  const handleSaveAllSettings = async () => {
    setIsSavingSettings(true);
    const success = await saveSettings(editableSettings);
    setIsSavingSettings(false);
    if (success) {
      onSettingsUpdated(editableSettings);
      setSaveSuccessMessage('¡Configuración guardada exitosamente!');
      setTimeout(() => setSaveSuccessMessage(''), 3000);
    }
  };

  const exportToCSV = () => {
    if (records.length === 0) return;

    const headers = ['ID', 'Nombre Completo', 'WhatsApp', 'Municipio', 'Barrio', 'Serial Carton', 'Invitado Por', 'Fecha Registro', 'Unido a WhatsApp', 'Estado'];
    const rows = records.map((r) => [
      `"${r.id}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.city.replace(/"/g, '""')}"`,
      `"${r.neighborhood.replace(/"/g, '""')}"`,
      `"${r.serialNumber}"`,
      `"${(r.invitedBy || 'Directo').replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString('es-CO')}"`,
      `"${r.joinedWhatsApp ? 'SI' : 'NO'}"`,
      `"${r.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inscritos_bingo_torneo_free_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySql = () => {
    navigator.clipboard?.writeText?.(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  if (!isOpen) return null;

  // Filtered records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.phone.includes(searchQuery) ||
      rec.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = filterCity === 'all' || rec.city.toLowerCase() === filterCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const uniqueCities = Array.from(new Set(records.map((r) => r.city))).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-[#E8D5B5] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#C45A3C] flex items-center justify-center text-sm font-black">
              B
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight font-heading">
                Panel Administrativo y de Configuración
              </h2>
              <p className="text-xs text-stone-400">
                Bingo Torneo · Comunitario · Maicao, La Guajira
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Cerrar panel administrativo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#C45A3C]/10 text-[#C45A3C] flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-stone-900 font-heading">
                Acceso al Panel de Control
              </h3>
              <p className="text-xs text-stone-600">
                Ingresa el PIN de seguridad para consultar los inscritos y cambiar los premios o el enlace de WhatsApp.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={10}
                  placeholder="PIN de acceso (Por defecto: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-center text-lg font-mono tracking-widest text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#00C2D1]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">{pinError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#00C2D1] hover:bg-[#00A9B7] transition-all shadow-sm cursor-pointer"
              >
                Ingresar al Panel
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Navigation Tabs */}
            <div className="bg-[#FAF6EF] border-b border-[#E8D5B5] px-4 sm:px-6 flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('records')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'records'
                    ? 'border-[#C45A3C] text-[#C45A3C]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Inscritos ({records.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'border-[#C45A3C] text-[#C45A3C]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Grupo de WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('prizes')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'prizes'
                    ? 'border-[#C45A3C] text-[#C45A3C]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Gift className="w-4 h-4" />
                <span>Premios en Especie</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('supabase')}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'supabase'
                    ? 'border-[#C45A3C] text-[#C45A3C]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Supabase & Base de Datos</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
              
              {saveSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{saveSuccessMessage}</span>
                </div>
              )}

              {/* TAB 1: REGISTRATIONS LIST */}
              {activeTab === 'records' && (
                <div className="space-y-4">
                  
                  {/* Top Stats & Actions Toolbar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-stone-100 text-stone-700">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-stone-500 font-medium">Total Registros:</span>{' '}
                        <strong className="text-stone-900 font-mono text-sm">{records.length}</strong>
                      </div>
                      <span className="text-stone-300">|</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isFromSupabase
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isFromSupabase ? 'Sincronizado Supabase' : 'Almacenamiento Local'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={loadRecords}
                        disabled={isLoadingRecords}
                        className="py-1.5 px-3 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
                        title="Refrescar lista"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRecords ? 'animate-spin' : ''}`} />
                        <span>Actualizar</span>
                      </button>

                      <button
                        type="button"
                        onClick={exportToCSV}
                        disabled={records.length === 0}
                        className="py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Exportar a Excel (CSV)</span>
                      </button>
                    </div>
                  </div>

                  {/* Search and City Filter */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    <div className="sm:col-span-8 relative">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar por nombre, número de WhatsApp o serial de cartón..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2D1]"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <select
                        value={filterCity}
                        onChange={(e) => setFilterCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2D1]"
                      >
                        <option value="all">Todos los municipios ({records.length})</option>
                        {uniqueCities.map((city) => (
                          <option key={city} value={city}>
                            {city} ({records.filter((r) => r.city === city).length})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                    <div className="overflow-x-auto max-h-[380px]">
                      <table className="w-full text-left text-xs text-stone-700">
                        <thead className="bg-[#FAF6EF] text-stone-900 font-bold uppercase tracking-wider text-[10px] sticky top-0 border-b border-[#E8D5B5]">
                          <tr>
                            <th className="py-2.5 px-3">Jugador / Nombre</th>
                            <th className="py-2.5 px-3">WhatsApp</th>
                            <th className="py-2.5 px-3">Municipio & Barrio</th>
                            <th className="py-2.5 px-3">Serial Cartón</th>
                            <th className="py-2.5 px-3">Invitado Por</th>
                            <th className="py-2.5 px-3">Grupo WhatsApp</th>
                            <th className="py-2.5 px-3">Fecha</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {filteredRecords.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-stone-400">
                                No se encontraron registros que coincidan con la búsqueda.
                              </td>
                            </tr>
                          ) : (
                            filteredRecords.map((r) => (
                              <tr key={r.id} className="hover:bg-stone-50 transition-colors">
                                <td className="py-2.5 px-3 font-bold text-stone-900">
                                  {r.fullName}
                                </td>
                                <td className="py-2.5 px-3">
                                  <a
                                    href={`https://wa.me/57${r.phone}?text=${encodeURIComponent(
                                      `Hola ${r.fullName}, te saludamos de Bingo Torneo Comunitario Maicao. Tu cartón es ${r.serialNumber}.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#4A6C6F] font-mono hover:underline flex items-center gap-1"
                                  >
                                    <span>+57 {r.phone}</span>
                                    <ExternalLink className="w-3 h-3 text-stone-400" />
                                  </a>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="font-semibold text-stone-800">{r.city}</span>
                                  <span className="text-stone-400 block text-[10px]">{r.neighborhood}</span>
                                </td>
                                <td className="py-2.5 px-3 font-mono font-bold text-[#C45A3C]">
                                  {r.serialNumber}
                                </td>
                                <td className="py-2.5 px-3">
                                  {r.invitedBy ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                                      <span>👤</span>
                                      <span>{r.invitedBy}</span>
                                    </span>
                                  ) : (
                                    <span className="text-stone-400 text-[10px]">Directo</span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3">
                                  <span
                                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      r.joinedWhatsApp
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-stone-100 text-stone-600'
                                    }`}
                                  >
                                    {r.joinedWhatsApp ? '✓ Unido' : 'Pendiente'}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-stone-500 text-[10px]">
                                  {new Date(r.createdAt).toLocaleDateString('es-CO', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: WHATSAPP LINK CONFIGURATION */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-5 max-w-xl">
                  <div>
                    <h3 className="text-base font-black text-stone-900 font-heading">
                      Enlace Oficial al Grupo de WhatsApp
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Este es el link que se abre automáticamente en el modal de confirmación obligatoria cuando una persona solicita su cartón gratis.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                      URL de Invitación al Grupo de WhatsApp
                    </label>
                    <input
                      type="url"
                      placeholder="https://chat.whatsapp.com/TU_CODIGO_DE_GRUPO"
                      value={editableSettings.whatsappGroupLink}
                      onChange={(e) =>
                        setEditableSettings({
                          ...editableSettings,
                          whatsappGroupLink: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 font-mono text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#00C2D1]"
                    />
                    <p className="text-[11px] text-stone-400">
                      Copia el enlace de invitación de tu grupo desde la app de WhatsApp (Ajustes del grupo &gt; Enlace de invitación).
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={editableSettings.whatsappGroupLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <span>Probar enlace de WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleSaveAllSettings}
                      disabled={isSavingSettings}
                      className="py-2 px-4 text-xs font-bold text-white bg-[#00C2D1] hover:bg-[#00A9B7] rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      {isSavingSettings ? 'Guardando...' : 'Guardar Enlace'}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: IN-KIND PRIZES CONFIGURATION */}
              {activeTab === 'prizes' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-black text-stone-900 font-heading">
                      Configuración de Premios en Especie y Bonos de Mercado
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Edita los valores, títulos y descripciones de los 3 puestos del torneo. Los cambios se actualizan en tiempo real en la página principal.
                    </p>
                  </div>

                  {/* 1st Prize */}
                  <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#C45A3C]/30 bg-[#FAF6EF] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#C45A3C]">
                        Primer Puesto (Meta 500 Pts)
                      </span>
                      <span className="w-6 h-6 rounded-md bg-[#C45A3C] text-white flex items-center justify-center text-xs font-black">
                        1º
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Título del Premio
                        </label>
                        <input
                          type="text"
                          value={editableSettings.firstPrize.title}
                          onChange={(e) =>
                            setEditableSettings({
                              ...editableSettings,
                              firstPrize: { ...editableSettings.firstPrize, title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Subtítulo / Canasta
                        </label>
                        <input
                          type="text"
                          value={editableSettings.firstPrize.subtitle || ''}
                          onChange={(e) =>
                            setEditableSettings({
                              ...editableSettings,
                              firstPrize: { ...editableSettings.firstPrize, subtitle: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Descripción Detallada
                      </label>
                      <textarea
                        rows={2}
                        value={editableSettings.firstPrize.description}
                        onChange={(e) =>
                          setEditableSettings({
                            ...editableSettings,
                            firstPrize: { ...editableSettings.firstPrize, description: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* 2nd Prize */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-[#4A6C6F]">
                        Segundo Puesto
                      </span>
                      <span className="w-6 h-6 rounded-md bg-[#4A6C6F] text-white flex items-center justify-center text-xs font-black">
                        2º
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Título del Premio
                        </label>
                        <input
                          type="text"
                          value={editableSettings.secondPrize.title}
                          onChange={(e) =>
                            setEditableSettings({
                              ...editableSettings,
                              secondPrize: { ...editableSettings.secondPrize, title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Valor Referencial
                        </label>
                        <input
                          type="text"
                          value={editableSettings.secondPrize.voucherValue}
                          onChange={(e) =>
                            setEditableSettings({
                              ...editableSettings,
                              secondPrize: { ...editableSettings.secondPrize, voucherValue: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Descripción
                      </label>
                      <textarea
                        rows={2}
                        value={editableSettings.secondPrize.description}
                        onChange={(e) =>
                          setEditableSettings({
                            ...editableSettings,
                            secondPrize: { ...editableSettings.secondPrize, description: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                      />
                    </div>
                  </div>

                  {/* 3rd Prize */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-stone-600">
                        Tercer Puesto
                      </span>
                      <span className="w-6 h-6 rounded-md bg-stone-300 text-stone-800 flex items-center justify-center text-xs font-black">
                        3º
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Título del Premio
                        </label>
                        <input
                          type="text"
                          value={editableSettings.thirdPrize.title}
                          onChange={(e) =>
                            setEditableSettings({
                              ...editableSettings,
                              thirdPrize: { ...editableSettings.thirdPrize, title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Valor Referencial
                        </label>
                        <input
                          type="text"
                          value={editableSettings.thirdPrize.voucherValue}
                          onChange={(e) =>
                            setEditableSettings({
                              ...editableSettings,
                              thirdPrize: { ...editableSettings.thirdPrize, voucherValue: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Descripción
                      </label>
                      <textarea
                        rows={2}
                        value={editableSettings.thirdPrize.description}
                        onChange={(e) =>
                          setEditableSettings({
                            ...editableSettings,
                            thirdPrize: { ...editableSettings.thirdPrize, description: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSaveAllSettings}
                      disabled={isSavingSettings}
                      className="py-2.5 px-5 text-xs font-bold text-white bg-[#00C2D1] hover:bg-[#00A9B7] rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      {isSavingSettings ? 'Guardando Premios...' : 'Guardar Cambios de Premios'}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: SUPABASE DATABASE CONNECTION */}
              {activeTab === 'supabase' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-black text-stone-900 font-heading">
                      Conexión con Supabase
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      Conecta tu proyecto de Supabase para almacenar las inscripciones en la nube de forma persistente y segura.
                    </p>
                  </div>

                  {/* Credentials Input */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EF] border border-[#E8D5B5] space-y-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                        Supabase Project URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://xyzcompany.supabase.co"
                        value={editableSettings.supabaseUrl}
                        onChange={(e) =>
                          setEditableSettings({
                            ...editableSettings,
                            supabaseUrl: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono text-stone-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                        Supabase Anon Key (Public)
                      </label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                        value={editableSettings.supabaseAnonKey}
                        onChange={(e) =>
                          setEditableSettings({
                            ...editableSettings,
                            supabaseAnonKey: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono text-stone-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                        PIN de Acceso a este Panel
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={editableSettings.adminPin}
                        onChange={(e) =>
                          setEditableSettings({
                            ...editableSettings,
                            adminPin: e.target.value,
                          })
                        }
                        className="w-48 px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-mono text-stone-800"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveAllSettings}
                      disabled={isSavingSettings}
                      className="py-2 px-4 text-xs font-bold text-white bg-[#00C2D1] hover:bg-[#00A9B7] rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      {isSavingSettings ? 'Guardando...' : 'Guardar Credenciales de Supabase'}
                    </button>
                  </div>

                  {/* 1-Click SQL Setup Script */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-stone-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#00C2D1]" />
                        <span className="text-xs font-bold text-white font-heading">
                          Script SQL para Crear Tablas en Supabase
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopySql}
                        className="py-1 px-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSql ? '¡Copiado!' : 'Copiar SQL'}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-400">
                      En tu panel de Supabase ve a <strong>SQL Editor</strong> &gt; <strong>New Query</strong>, pega este script y haz clic en <strong>Run</strong>:
                    </p>

                    <pre className="p-3 bg-black/60 rounded-xl text-[10px] font-mono text-stone-300 overflow-x-auto max-h-44 border border-stone-800">
                      {SUPABASE_SQL_SETUP_SCRIPT}
                    </pre>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

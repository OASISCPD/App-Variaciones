import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiHome, FiUsers, FiLogOut, FiPlus, FiEdit, FiTrash2, FiDownload, FiFilter, FiCalendar, FiDollarSign, FiClock, FiFileText } from 'react-icons/fi';

// Tipos de datos
interface Vale {
    id: number;
    empleado: string;
    turno: string;
    fecha: string;
    importe: number;
    firma_empleado: string;
    created_at: string;
}

interface User {
    legajo: string;
    nombre: string;
    usuario: string;
    permisos: string;
    fecha_registro: string;
    activo: boolean;
}

// Datos mock
const mockVales: Vale[] = [
    {
        id: 1,
        empleado: "13763",
        turno: "Mañana",
        fecha: "2025-08-12",
        importe: 1500,
        firma_empleado: "firma_digital_13763.png",
        created_at: "2025-08-12T08:15:00"
    },
    {
        id: 2,
        empleado: "14220",
        turno: "Tarde",
        fecha: "2025-08-11",
        importe: 980,
        firma_empleado: "firma_digital_14220.png",
        created_at: "2025-08-11T15:45:00"
    },
    {
        id: 3,
        empleado: "10457",
        turno: "Noche",
        fecha: "2025-08-10",
        importe: 2200,
        firma_empleado: "firma_digital_10457.png",
        created_at: "2025-08-10T22:30:00"
    },
    {
        id: 4,
        empleado: "11888",
        turno: "Mañana",
        fecha: "2025-08-09",
        importe: 750,
        firma_empleado: "firma_digital_11888.png",
        created_at: "2025-08-09T09:20:00"
    }
];

const mockUsers: User[] = [
    { legajo: "13763", nombre: "ALEX MAXIMILIANO", usuario: "13763", permisos: "ADMIN", fecha_registro: "06/08/2025 11:16", activo: true },
    { legajo: "14133", nombre: "LUCAS ANDRES", usuario: "14133", permisos: "ADMIN", fecha_registro: "06/08/2025 11:19", activo: true },
    { legajo: "10457", nombre: "MARISA ELISABET", usuario: "10457", permisos: "ADMIN", fecha_registro: "07/08/2025 12:39", activo: true },
    { legajo: "11888", nombre: "PATRICIA ALEJANDRA", usuario: "11888", permisos: "ADMIN", fecha_registro: "07/08/2025 12:58", activo: true }
];

function PageTest() {
    const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');
    const [activeModule, setActiveModule] = useState<'cajas' | 'historial' | 'usuarios' | 'vales'>('vales');
    const [vales, setVales] = useState<Vale[]>(mockVales);
    const [showModal, setShowModal] = useState(false);
    const [editingVale, setEditingVale] = useState<Vale | null>(null);
    const [filters, setFilters] = useState({
        fechaDesde: '',
        fechaHasta: '',
        empleado: '',
        turno: ''
    });

    // Estados del login
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Estados del formulario de vale
    const [valeForm, setValeForm] = useState({
        empleado: '',
        turno: 'Mañana',
        fecha: '',
        importe: ''
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            username: !formData.username.trim() ? 'El usuario es obligatorio' : '',
            password: !formData.password.trim() ? 'La contraseña es obligatoria' : ''
        };

        setErrors(newErrors);
        if (newErrors.username || newErrors.password) return;

        setIsLoading(true);
        setTimeout(() => {
            setCurrentView('dashboard');
            setIsLoading(false);
        }, 1500);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleValeFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValeForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const openModal = (vale?: Vale) => {
        if (vale) {
            setEditingVale(vale);
            setValeForm({
                empleado: vale.empleado,
                turno: vale.turno,
                fecha: vale.fecha,
                importe: vale.importe.toString()
            });
        } else {
            setEditingVale(null);
            setValeForm({
                empleado: '',
                turno: 'Mañana',
                fecha: '',
                importe: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingVale(null);
        setValeForm({
            empleado: '',
            turno: 'Mañana',
            fecha: '',
            importe: ''
        });
    };

    const handleSaveVale = (e: React.FormEvent) => {
        e.preventDefault();

        if (!valeForm.empleado || !valeForm.fecha || !valeForm.importe) {
            alert('Todos los campos son obligatorios');
            return;
        }

        const valeData = {
            empleado: valeForm.empleado,
            turno: valeForm.turno,
            fecha: valeForm.fecha,
            importe: parseFloat(valeForm.importe),
            firma_empleado: `firma_digital_${valeForm.empleado}.png`,
            created_at: new Date().toISOString()
        };

        if (editingVale) {
            setVales(prev => prev.map(v =>
                v.id === editingVale.id
                    ? { ...valeData, id: editingVale.id }
                    : v
            ));
        } else {
            const newVale = {
                ...valeData,
                id: Math.max(...vales.map(v => v.id)) + 1
            };
            setVales(prev => [...prev, newVale]);
        }

        closeModal();
    };

    const handleDeleteVale = (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar este vale?')) {
            setVales(prev => prev.filter(v => v.id !== id));
        }
    };

    const filteredVales = vales.filter(vale => {
        const matchesEmpleado = !filters.empleado || vale.empleado.includes(filters.empleado);
        const matchesTurno = !filters.turno || vale.turno === filters.turno;
        const matchesFechaDesde = !filters.fechaDesde || vale.fecha >= filters.fechaDesde;
        const matchesFechaHasta = !filters.fechaHasta || vale.fecha <= filters.fechaHasta;

        return matchesEmpleado && matchesTurno && matchesFechaDesde && matchesFechaHasta;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-AR');
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('es-AR');
    };

  

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#0D1F2D' }}>
            {/* Header */}
            <header className="border-b" style={{ backgroundColor: '#0D6E6E', borderColor: '#4a9d9c' }}>
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
                            Variaciones de cajas
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200"
                                style={{ color: '#afffff' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <FiHome size={16} />
                                <span>Inicio</span>
                            </button>
                            <button
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200"
                                style={{ color: '#afffff' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => setActiveModule('usuarios')}
                            >
                                <FiUsers size={16} />
                                <span>Usuarios</span>
                            </button>
                            <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: '#4a9d9c', color: '#FFFFFF' }}>
                                Usuario: Alex Becci
                            </div>
                            <button
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200"
                                style={{ color: '#afffff' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => setCurrentView('login')}
                            >
                                <FiLogOut size={16} />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="border-b" style={{ backgroundColor: '#1d2e3d', borderColor: '#354656' }}>
                <div className="px-6">
                    <div className="flex space-x-8">
                        <button
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeModule === 'cajas'
                                    ? 'border-teal-500 text-white'
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                            style={{ color: activeModule === 'cajas' ? '#FFFFFF' : '#e0e0e0' }}
                            onClick={() => setActiveModule('cajas')}
                        >
                            Listado Cajas
                        </button>
                        <button
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeModule === 'historial'
                                    ? 'border-teal-500 text-white'
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                            style={{ color: activeModule === 'historial' ? '#FFFFFF' : '#e0e0e0' }}
                            onClick={() => setActiveModule('historial')}
                        >
                            Historial Cajas
                        </button>
                        <button
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${activeModule === 'vales'
                                    ? 'border-teal-500 text-white'
                                    : 'border-transparent hover:border-gray-300'
                                }`}
                            style={{ color: activeModule === 'vales' ? '#FFFFFF' : '#e0e0e0' }}
                            onClick={() => setActiveModule('vales')}
                        >
                            Vales
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {activeModule === 'vales' && (
                    <div>
                        {/* Header del módulo */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                                Listado de Vales ({filteredVales.length})
                            </h2>
                            <button
                                onClick={() => openModal()}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                                style={{ backgroundColor: '#0D6E6E', color: '#FFFFFF' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0D6E6E'}
                            >
                                <FiPlus size={16} />
                                <span>Agregar Vale</span>
                            </button>
                        </div>

                        {/* Filtros */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: '#1d2e3d' }}>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#e0e0e0' }}>
                                    Fecha desde
                                </label>
                                <input
                                    type="date"
                                    name="fechaDesde"
                                    value={filters.fechaDesde}
                                    onChange={handleFilterChange}
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#e0e0e0' }}>
                                    Fecha hasta
                                </label>
                                <input
                                    type="date"
                                    name="fechaHasta"
                                    value={filters.fechaHasta}
                                    onChange={handleFilterChange}
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#e0e0e0' }}>
                                    Empleado
                                </label>
                                <input
                                    type="text"
                                    name="empleado"
                                    value={filters.empleado}
                                    onChange={handleFilterChange}
                                    placeholder="Buscar por empleado"
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#e0e0e0' }}>
                                    Turno
                                </label>
                                <select
                                    name="turno"
                                    value={filters.turno}
                                    onChange={handleFilterChange}
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                >
                                    <option value="">Todos los turnos</option>
                                    <option value="Mañana">Mañana</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Noche">Noche</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <button
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200"
                                style={{ backgroundColor: '#354656', color: '#e0e0e0' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#354656'}
                            >
                                <FiFilter size={16} />
                                <span>Filtrar</span>
                            </button>
                            <button
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200"
                                style={{ backgroundColor: '#354656', color: '#e0e0e0' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#354656'}
                            >
                                <FiDownload size={16} />
                                <span>Exportar a Excel</span>
                            </button>
                        </div>

                        {/* Tabla */}
                        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#1d2e3d' }}>
                            <table className="w-full">
                                <thead style={{ backgroundColor: '#0D6E6E' }}>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Empleado
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Turno
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Fecha
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Importe
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Creado
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" /* style={{ divideColor: '#354656' }} */>
                                    {filteredVales.map((vale, index) => (
                                        <tr
                                            key={vale.id}
                                            className="hover:bg-opacity-50 transition-colors duration-200"
                                            style={{
                                                backgroundColor: index % 2 === 0 ? '#1d2e3d' : '#354656'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#1d2e3d' : '#354656'}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#FFFFFF' }}>
                                                {vale.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#e0e0e0' }}>
                                                {vale.empleado}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                                    style={{
                                                        backgroundColor: vale.turno === 'Mañana' ? '#0D6E6E' : vale.turno === 'Tarde' ? '#4a9d9c' : '#354656',
                                                        color: '#FFFFFF'
                                                    }}
                                                >
                                                    {vale.turno}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#e0e0e0' }}>
                                                {formatDate(vale.fecha)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#afffff' }}>
                                                {formatCurrency(vale.importe)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#e0e0e0' }}>
                                                {formatDateTime(vale.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openModal(vale)}
                                                        className="p-2 rounded-lg transition-colors duration-200"
                                                        style={{ backgroundColor: '#0D6E6E', color: '#FFFFFF' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0D6E6E'}
                                                    >
                                                        <FiEdit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteVale(vale.id)}
                                                        className="p-2 rounded-lg transition-colors duration-200"
                                                        style={{ backgroundColor: '#FF3D3D', color: '#FFFFFF' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6b6b'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF3D3D'}
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeModule === 'usuarios' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
                            Listado de Usuarios
                        </h2>
                        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#1d2e3d' }}>
                            <table className="w-full">
                                <thead style={{ backgroundColor: '#0D6E6E' }}>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Estado
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Legajo
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Nombre y Apellido
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Usuario
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Permisos
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Fecha Registro
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#FFFFFF' }}>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y" /* style={{ divideColor: '#354656' }} */>
                                    {mockUsers.map((user, index) => (
                                        <tr
                                            key={user.legajo}
                                            style={{ backgroundColor: index % 2 === 0 ? '#1d2e3d' : '#354656' }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: user.activo ? '#0D6E6E' : '#FF3D3D' }}
                                                ></div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#FFFFFF' }}>
                                                {user.legajo}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#e0e0e0' }}>
                                                {user.nombre}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#e0e0e0' }}>
                                                {user.usuario}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#e0e0e0' }}>
                                                {user.permisos}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#e0e0e0' }}>
                                                {user.fecha_registro}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="p-2 rounded-lg transition-colors duration-200"
                                                        style={{ backgroundColor: '#0D6E6E', color: '#FFFFFF' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0D6E6E'}
                                                    >
                                                        <FiEdit size={16} />
                                                    </button>
                                                    <button
                                                        className="p-2 rounded-lg transition-colors duration-200"
                                                        style={{ backgroundColor: '#FF3D3D', color: '#FFFFFF' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff6b6b'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF3D3D'}
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {(activeModule === 'cajas' || activeModule === 'historial') && (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                            {activeModule === 'cajas' ? 'Listado Cajas' : 'Historial Cajas'}
                        </h2>
                        <p style={{ color: '#e0e0e0' }}>
                            Este módulo está en desarrollo
                        </p>
                    </div>
                )}
            </div>

            {/* Modal para crear/editar vale */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="rounded-lg p-6 w-full max-w-md mx-4"
                        style={{ backgroundColor: '#1d2e3d' }}
                    >
                        <h3 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                            {editingVale ? 'Editar Vale' : 'Crear Nuevo Vale'}
                        </h3>

                        <form onSubmit={handleSaveVale} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#e0e0e0' }}>
                                    Empleado *
                                </label>
                                <input
                                    type="text"
                                    name="empleado"
                                    value={valeForm.empleado}
                                    onChange={handleValeFormChange}
                                    required
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                    placeholder="Número de empleado"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#e0e0e0' }}>
                                    Turno *
                                </label>
                                <select
                                    name="turno"
                                    value={valeForm.turno}
                                    onChange={handleValeFormChange}
                                    required
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                >
                                    <option value="Mañana">Mañana</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Noche">Noche</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#e0e0e0' }}>
                                    Fecha *
                                </label>
                                <input
                                    type="date"
                                    name="fecha"
                                    value={valeForm.fecha}
                                    onChange={handleValeFormChange}
                                    required
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#e0e0e0' }}>
                                    Importe *
                                </label>
                                <input
                                    type="number"
                                    name="importe"
                                    value={valeForm.importe}
                                    onChange={handleValeFormChange}
                                    required
                                    step="0.01"
                                    min="0"
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                                    style={{ backgroundColor: '#0D6E6E', color: '#FFFFFF' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0D6E6E'}
                                >
                                    {editingVale ? 'Actualizar' : 'Crear'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                                    style={{ backgroundColor: '#354656', color: '#e0e0e0' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9d9c'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#354656'}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PageTest;
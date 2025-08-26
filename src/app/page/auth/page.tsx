import React, { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error cuando el usuario empiece a escribir
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            username: '',
            password: ''
        };

        if (!formData.username.trim()) {
            newErrors.username = 'El usuario es obligatorio';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'La contraseña es obligatoria';
        }

        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await login(formData.username, formData.password);
            toast.success(`Inicio sesión correctamente`);
            //redireccion
            navigate('/home')

        } catch (error) {
            console.error(error);
            toast.error("Error al iniciar sesión")
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0D1F2D' }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #0D6E6E 0%, transparent 50%)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            {/* Login Container */}
            <div className="relative w-full max-w-md mx-4">
                <div
                    className="rounded-2xl shadow-2xl p-8 border"
                    style={{
                        backgroundColor: '#1d2e3d',
                        borderColor: '#354656'
                    }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: '#0D6E6E' }}
                        >
                            <FiUser size={32} color="#afffff" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                            Iniciar Sesión
                        </h1>
                        <p className="text-sm" style={{ color: '#e0e0e0' }}>
                            Ingresa tus credenciales para continuar
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#e0e0e0' }}
                            >
                                Usuario
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser size={20} color="#4a9d9c" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${errors.username
                                        ? 'border-red-500 focus:ring-red-500/50'
                                        : 'focus:ring-teal-500/50'
                                        }`}
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: errors.username ? '#FF3D3D' : '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                    placeholder="Ingresa tu usuario"
                                />
                            </div>
                            {errors.username && (
                                <p className="mt-1 text-sm" style={{ color: '#FF3D3D' }}>
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: '#e0e0e0' }}
                            >
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock size={20} color="#4a9d9c" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${errors.password
                                        ? 'border-red-500 focus:ring-red-500/50'
                                        : 'focus:ring-teal-500/50'
                                        }`}
                                    style={{
                                        backgroundColor: '#354656',
                                        borderColor: errors.password ? '#FF3D3D' : '#4a9d9c',
                                        color: '#FFFFFF'
                                    }}
                                    placeholder="Ingresa tu contraseña"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} color="#4a9d9c" />
                                    ) : (
                                        <FiEye size={20} color="#4a9d9c" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm" style={{ color: '#FF3D3D' }}>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${isLoading
                                ? 'opacity-75 cursor-not-allowed'
                                : 'hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                            style={{
                                backgroundColor: '#0D6E6E',
                                boxShadow: '0 4px 14px 0 rgba(13, 110, 110, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.backgroundColor = '#4a9d9c';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.backgroundColor = '#0D6E6E';
                                }
                            }}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Iniciando sesión...</span>
                                </div>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm" style={{ color: '#e0e0e0' }}>
                            ¿Problemas para iniciar sesión?{' '}
                            <button
                                className="font-medium hover:underline transition-colors duration-200"
                                style={{ color: '#4a9d9c' }}
                                onClick={() => console.log('Recuperar contraseña')}
                            >
                                Contacta soporte
                            </button>
                        </p>
                    </div>
                </div>

                {/* Version Info */}
                <div className="text-center mt-6">
                    <p className="text-xs" style={{ color: '#e0e0e0', opacity: 0.6 }}>
                        Variaciones de cajas v1.0
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
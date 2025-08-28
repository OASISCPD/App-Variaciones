import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ActiveTabDTO } from '../types';

interface TabContextType {
    activeTab: ActiveTabDTO;
    setActiveTab: (tab: ActiveTabDTO) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

interface TabProviderProps {
    children: ReactNode;
}

const TAB_STORAGE_KEY = 'variaciones_active_tab';

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
    const [activeTab, setActiveTabState] = useState<ActiveTabDTO>(() => {
        // Intentar obtener el tab desde localStorage al inicializar
        if (typeof window !== 'undefined') {
            const savedTab = localStorage.getItem(TAB_STORAGE_KEY);
            if (savedTab && (savedTab === 'listado' || savedTab === 'vales' || savedTab === 'historial')) {
                return savedTab as ActiveTabDTO;
            }
        }
        return 'listado'; // valor por defecto
    });

    const setActiveTab = (tab: ActiveTabDTO) => {
        setActiveTabState(tab);
        // Guardar en localStorage cada vez que cambie
        if (typeof window !== 'undefined') {
            localStorage.setItem(TAB_STORAGE_KEY, tab);
        }
    };

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTab = () => {
    const context = useContext(TabContext);
    if (context === undefined) {
        throw new Error('useTab debe ser usado dentro de un TabProvider');
    }
    return context;
};
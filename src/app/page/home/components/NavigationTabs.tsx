// components/NavigationTabs.tsx
interface Props {
  setActiveTab: React.Dispatch<React.SetStateAction<"listado" | "historial">>
  activeTab: string
}

export const NavigationTabs: React.FC<Props> = ({ setActiveTab, activeTab }) => {
  return (
    <div className="bg-[--bg-100] border-b border-[--bg-300]">
      <div className="px-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("listado")}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === "listado"
              ? "border-[--primary-300] text-[--text-100]"
              : "border-transparent text-gray-100 hover:text-gray-300"
              }`}
          >
            Listado Cajas
          </button>
          <button
            onClick={() => setActiveTab("historial")}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${activeTab === "historial"
              ? "border-[--primary-300] text-[--text-100]"
              : "border-transparent text-gray-100 hover:text-gray-300"
              }`}
          >
            Historial Cajas
          </button>
        </div>
      </div>
    </div>
  )
}
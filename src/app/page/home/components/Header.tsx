export const Header = () => {
    return (
        <div className="bg-[--primary-100] text-[--text-100] px-6 py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Variaciones de Cajas</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm">Usuario admin</span>
                    <span className="text-sm">Admin</span>
                </div>
            </div>
        </div>
    )
}

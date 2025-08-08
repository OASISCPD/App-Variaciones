interface ContainerPagesProps {
    children: React.ReactNode
}
export const ContainerPages: React.FC<ContainerPagesProps> = ({ children }) => {
    return (
        <div className=" min-h-screen bg-[var(--bg-200)] break-words text-xs ">
            {children}
        </div>
    )
}
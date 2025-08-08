// components/UsersSkeleton.tsx

export const UsersSkeleton: React.FC = () => {
    const rows = Array.from({ length: 5 });

    return (
        <tbody className="bg-[--bg-100] divide-y divide-[--bg-300] animate-pulse">
            {rows.map((_, idx) => (
                <tr key={idx}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <td key={i} className="px-6 py-4">
                            <div className="h-4 bg-[--bg-300] rounded w-4/5"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};


import { ReactNode } from 'react'


function DashboardTable({
    children,
    tableHeaders,
    actionOptions,
}: {
    children: ReactNode,
    tableHeaders: string[],
    actionOptions: boolean,
}) {
    
    return (
        <div><div className="overflow-x-auto">
            <table className="w-full min-w-[54rem] border-collapse text-left text-sm">
                <thead>
                    <tr className="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                        <th scope="col" className="px-5 py-3.5 font-medium">
                            #id
                        </th>
                        {
                            tableHeaders.map((th: string) => (
                                <th key={th} scope="col" className="px-5 py-3.5 font-medium">
                                    {th}
                                </th>
                            ))
                        }                     

                        <th scope="col" className="px-5 py-3.5 font-medium">
                            {actionOptions ? "Action" : ""}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                    {children}
                </tbody>
            </table>
        </div></div>
    )
}

export default DashboardTable
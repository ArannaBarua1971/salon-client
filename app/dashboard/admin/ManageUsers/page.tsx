"use client"
import CommonInput from '@/app/components/common/Input'
import ConfirmDialog from '@/app/components/dashboard/ConfirmDialog'
import DashboardPageHeader from '@/app/components/dashboard/DashboardPageHeader'
import DashboardTable from '@/app/components/dashboard/DashboardTable'
import FilterChips from '@/app/components/dashboard/FilterChips'
import StatusBadge from '@/app/components/dashboard/StatusBadge'
import { getAllUsers, updateUser } from '@/lib/applicatonApi/userApi'
import { UserTypes } from '@/types/UserTypes'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'


function page() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [filters, setFilters] = useState([
    { label: "All", count: 8 },
    { label: "Blocked", count: 4 },
    { label: "UnBlocked", count: 2 },
  ])
  const [userData, setUserData] = useState([])
  const [blockUserData, setBlockUserData] = useState([])
  const [unBlockUserData, setUnBlockUserData] = useState([])
  const getUser = async () => {
    const data = await getAllUsers()
    setUserData(data)
    setUnBlockUserData(data.filter((d: UserTypes) => !d.isBlocked))
    setBlockUserData(data.filter((d: UserTypes) => d.isBlocked))
    filters[0].count = data.length;
    filters[1].count = data.filter((d: UserTypes) => d.isBlocked).length;
    filters[2].count = data.filter((d: UserTypes) => !d.isBlocked).length;
    setFilters(filters)
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div>
      <DashboardPageHeader eyebrow='admin' title='User Details' description='Every user account can block and unblock' />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between my-4">
        <CommonInput
          aria-label="Search transactions"
          placeholder="Search customer with name"
          icon={<Search className="size-4" />}
          containerClassName="w-full lg:max-w-sm"
        />
        <FilterChips
          activeIndex={activeIndex}
          chips={filters}
           onSelect={(e)=> {e==0?setUserData([...blockUserData,...unBlockUserData]):e==1?setUserData(blockUserData):setUserData(unBlockUserData) ; setActiveIndex(e)}}
          ariaLabel="Filter transactions by payment status"
        />
      </div>
      <DashboardTable
        tableHeaders={["name", "email", "Block status"]}
        actionOptions={true}
      >
        {userData.map((row: any) => (
          <tr
            key={row._id}
            className="transition-colors hover:bg-rose-gold/5"
          >
            <td className="px-5 py-4 font-medium text-foreground">
              #{row._id}
            </td>
            <td className="px-5 py-4 font-medium text-foreground">
              {row.name}
            </td>
            <td className="px-5 py-4 font-medium text-foreground">
              {row.email}
            </td>
            <td>
              <StatusBadge kind='user' status={row.isBlocked ? "blocked" : "unblocked"} />
            </td>
            <td>
              <ConfirmDialog
                question={`Are you sure for block id: ${row._id}  `}
                description='user going to block he can not use this account'
                func={updateUser}
                id={row._id}
                data={{ isBlocked: !row.isBlocked }}
                onSuccess={getUser}
                buttonName={row.isBlocked ? "unblock" : "block"}
                decisionBtnName={row.isBlocked ? "unblock" : "block"}
                toastMessage='user data updated successfully'
              />
            </td>
          </tr>
        ))}
      </DashboardTable>
    </div>
  )
}

export default page
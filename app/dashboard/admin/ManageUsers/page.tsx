import CommonButton from '@/app/components/common/Button'
import CommonInput from '@/app/components/common/Input'
import DashboardPageHeader from '@/app/components/dashboard/DashboardPageHeader'
import DashboardTable from '@/app/components/dashboard/DashboardTable'
import FilterChips from '@/app/components/dashboard/FilterChips'
import StatusBadge from '@/app/components/dashboard/StatusBadge'
import { Search } from 'lucide-react'

const userData = [
  {
    "_id": "673a1f2b8c4d5e6f7a123001",
    "name": "John Doe",
    "email": "john@gmail.com",
    "isBlocked": false
  },
  {
    "_id": "673a1f2b8c4d5e6f7a123002",
    "name": "Sarah Smith",
    "email": "sarah@gmail.com",
    "isBlocked": true
  },
  {
    "_id": "673a1f2b8c4d5e6f7a123003",
    "name": "Michael Brown",
    "email": "michael@gmail.com",
    "isBlocked": false
  },
  {
    "_id": "673a1f2b8c4d5e6f7a123004",
    "name": "Emma Wilson",
    "email": "emma@gmail.com",
    "isBlocked": false
  },
  {
    "_id": "673a1f2b8c4d5e6f7a123005",
    "name": "David Miller",
    "email": "david@gmail.com",
    "isBlocked": true
  }
]
const filterChips = [
  { label: "All", count: 8 },
  { label: "Blocked", count: 4 },
  { label: "UnBlocked", count: 2 },
]
function page() {
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
          chips={filterChips}
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
              #{row.name}
            </td>
            <td className="px-5 py-4 font-medium text-foreground">
              #{row.email}
            </td>
            <td>
              <StatusBadge kind='user' status={row.isBlocked?"blocked":"unblocked"}/>
            </td>
            <td>
              <CommonButton variant={"outline"} size={"sm"}>{row.isBlocked?"unblock":"block"}</CommonButton>
            </td>
          </tr>
        ))}
      </DashboardTable>
    </div>
  )
}

export default page
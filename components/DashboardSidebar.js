import Link from 'next/link'
import SidebarLinks from './SidebarLinks'

export const DashboardSidebar = ({isAdmin}) => {
  return (
    <div className="flex flex-col h-full bg-amber-50 border-l-2 w-1/2 items-center">
        <SidebarLinks href={"#"} text={"حساب کاربری"} />
        {isAdmin ? (
            <SidebarLinks href={"/tests/manage"} text={"مدیریت آزمون‌ها"} />
            ):("")
        }


    </div>
  )
}

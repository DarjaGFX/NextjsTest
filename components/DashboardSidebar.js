import Link from 'next/link'
import SidebarLinks from './SidebarLinks'

export const DashboardSidebar = ({isAdmin}) => {
  return (
    <div className="flex flex-col h-full bg-amber-50 border-l-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 items-center sm:hidden md:inline ">
        <SidebarLinks href={"#"} text={"حساب کاربری"} />
        {isAdmin ? (
            <SidebarLinks href={"/Tests/Manage"} text={"مدیریت آزمون‌ها"} />
            ):("")
        }


    </div>
  )
}

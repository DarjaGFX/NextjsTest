import Link from 'next/link'

export const DashboardSidebar = ({isAdmin}) => {
  return (
    <div className="flex flex-col h-full bg-amber-50 border-l-2 w-1/2 items-center">
        <div className="mt-10 w-full flex justify-center">
            <Link  href={"#"}>
                حساب کاربری
            </Link>
        </div>
        {isAdmin ? (
            <>
                <div className="mt-10 w-full flex justify-center">
                    <Link href={"#"}>
                        مدیریت آزمون‌ها
                    </Link>
                </div>
            </>
            ):("")
        }


    </div>
  )
}

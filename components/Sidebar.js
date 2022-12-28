import React from 'react'

export default function Sidebar({children}) {
  return (
    <div className="flex flex-col items-center h-full bg-sky-50 border-l-2 hidden lg:inline lg:w-1/3 xl:w-1/4">
        {children}
    </div>
  )
}

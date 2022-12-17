import Link from 'next/link';

const SidebarLinks = ({href, text}) => {
  return (
    <div className="mt-10 w-full flex justify-center">
        <Link  href={href}>
            {text}
        </Link>
    </div>
  )
}

export default SidebarLinks;
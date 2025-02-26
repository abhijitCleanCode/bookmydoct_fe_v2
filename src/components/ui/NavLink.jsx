import Link from 'next/link'
import '../../styles/NavLink.css' // Import the CSS file

export function NavLink({ href, children, className }) {
  return (
    <Link
      href={href}
      className= {`${className} nav-link inline-block rounded-lg py-1 text-slate-900 hover:text-primary font-bold`}
    >
      {children}
    </Link>
  )
}


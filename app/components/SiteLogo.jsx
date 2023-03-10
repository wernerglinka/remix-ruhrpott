import { Link } from '@remix-run/react'

export default function Logo() {
  
  return (
    <p className="text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl">
      <Link to="/">Go HOME</Link>
    </p>
  )
}
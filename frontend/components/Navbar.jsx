import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='flex space-x-4 px-3 py-2 text-blue-500'>
            <Link className='hover:scale-110' href="/">Home</Link>
            <Link className='hover:scale-110' href="/users">Users</Link>
            <Link className='hover:scale-110' href="/business">Businesses</Link>
            <Link className='hover:scale-110' href="/customers">Customers</Link>
        </nav>
    )
}

export default Navbar
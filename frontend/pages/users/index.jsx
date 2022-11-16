import Link from "next/link";
import { useQuery } from "@apollo/client"
import UserRow from "../../components/UserRow"
import { GET_USERS } from "../../graphql/queries/userQueries"


const Users = () => {
    const { loading, error, data } = useQuery(GET_USERS)
    return (
        <div className="px-4">
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong</p>}
            {data && data.users.map(user => (
                <UserRow key={user.id} user={user} />
            ))}
            <button className='text-sm mt-4 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>
                <Link href="/users/create">Create New User</Link>
            </button>
        </div>
    )
}

export default Users
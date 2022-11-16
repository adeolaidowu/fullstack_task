import { useMutation } from "@apollo/client";
import Link from "next/link";
import { DELETE_USER } from "../graphql/mutations/userMutations";
import { GET_USERS } from "../graphql/queries/userQueries";

const UserRow = ({ user }) => {
    const [removeUser] = useMutation(DELETE_USER, {
        variables: { id: user.id },
        update(cache, { data: { removeUser } }) {
            const { users } = cache.readQuery({
                query: GET_USERS
            })

            cache.writeQuery({
                query: GET_USERS,
                data: { users: users.filter(user => user.id != removeUser.id) }
            })
        }

    })
    return (
        <div className="flex mt-3">
            <p><span className="font-bold">Username:</span> {user.name}</p>
            <p className="mx-3"><span className="font-bold">Useremail:</span> {user.email}</p>
            <button onClick={removeUser} className='text-sm rounded-lg mb-2 px-3 py-1 bg-red-700 text-white font-medium'>
                Delete User
            </button>
            <button className='text-sm rounded-lg px-3 py-1 mb-2 ml-3 bg-green-700 text-white font-medium'>
                <Link href={{
                    pathname: '/users/update',
                    query: { id: user.id, name: user.name, email: user.email }
                }}>
                    Update User
                </Link>
            </button>
        </div>
    )
}

export default UserRow
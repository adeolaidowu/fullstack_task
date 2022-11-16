import { useState } from 'react'
import Router from "next/router"
import Link from "next/link";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../graphql/mutations/userMutations';
import { GET_USERS } from '../../graphql/queries/userQueries';

const Create = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [addUser] = useMutation(ADD_USER, {
        variables: { name: formState.name, email: formState.email, password: formState.password },
        update(cache, { data: { addUser } }) {
            const { users } = cache.readQuery({
                query: GET_USERS
            })

            cache.writeQuery({
                query: GET_USERS,
                data: { users: [...users, addUser] }
            })
        },
        onCompleted: () => Router.push("/users")
    })

    return (
        <div className='px-3 py-4'>
            <h1 className='text-xl mb-4'>Create a New User</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addUser(formState.name, formState.email, formState.password);
                    setFormState({
                        name: "",
                        email: "",
                        password: "",
                    })
                }}
            >
                <div>
                    <input
                        className="mr-3 px-2 py-1"
                        value={formState.name}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                name: e.target.value,
                            })
                        }
                        type="text"
                        placeholder="Enter you Full name"
                    />
                    <input
                        className="mr-3 px-2 py-1"
                        value={formState.email}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                email: e.target.value,
                            })
                        }
                        type="text"
                        placeholder="Enter your Email"
                    />
                    <input
                        className="px-2 py-1"
                        type="password"
                        value={formState.password}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                password: e.target.value,
                            })
                        }
                        placeholder="Enter your Password"
                    />
                </div>
                <button type="submit" className='text-sm mt-3 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>Submit</button>
                <button type="button" className='text-sm mt-3 ml-3 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>
                    <Link href="/users">Back</Link>
                </button>
            </form>
        </div>
    )
}

export default Create
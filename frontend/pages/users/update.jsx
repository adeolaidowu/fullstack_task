import { useState } from 'react'
import { useRouter } from "next/router"
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../graphql/mutations/userMutations';
import { GET_USERS } from '../../graphql/queries/userQueries';

const Update = () => {
    const router = useRouter();
    const { id, name, email } = router.query;
    console.log(id, name, email)
    const [formState, setFormState] = useState({
        name: name,
        email: email,
    });


    // get data to update
    const updatedName = formState.name != "" ? formState.name : name;
    const updatedEmail = formState.email != "" ? formState.email : email;

    //console.log(data);

    const [updateUser] = useMutation(UPDATE_USER, {
        variables: { id, name: updatedName, email: updatedEmail },
        refetchQueries: [{ query: GET_USERS }],
        onCompleted: () => router.push("/users")
    })

    return (
        <div className='px-3 py-4'>
            <h1 className='text-xl mb-4'>Update User</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updateUser(id, updatedName, updatedEmail);
                    setFormState({
                        name: "",
                        email: "",
                    })
                }}
            >
                <div>
                    <input
                        className="mr-3 px-2 py-1"
                        value={formState.name}
                        onChange={(e) => {
                            setFormState({
                                ...formState,
                                name: e.target.value,
                            })

                        }
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
                </div>
                <button type="submit" className='text-sm mt-3 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>Submit</button>
            </form>
        </div>
    )
}

export default Update
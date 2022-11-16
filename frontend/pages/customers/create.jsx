import { useState } from 'react'
import Router from "next/router"
import Link from "next/link";
import { useMutation } from '@apollo/client';
import { ADD_CUSTOMER } from '../../graphql/mutations/customerMutations';
import { GET_CUSTOMERS } from '../../graphql/queries/customerQueries';

const Create = () => {
    const [formState, setFormState] = useState({
        name: "",
        businessId: ""
    });

    const [addCustomer] = useMutation(ADD_CUSTOMER, {
        variables: { name: formState.name, businessId: formState.businessId },
        update(cache, { data: { addCustomer } }) {
            const { customers } = cache.readQuery({
                query: GET_CUSTOMERS
            })

            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: { customers: [...customers, addCustomer] }
            })
        },
        onCompleted: () => Router.push("/customers")
    })

    return (
        <div className='px-3 py-4'>
            <h1 className='text-xl mb-4'>Create a New Customer</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addCustomer(formState.name, formState.businessId);
                    setFormState({
                        name: "",
                        businessId: ""
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
                        placeholder="Enter customer name"
                    />
                    <input
                        className="mr-3 px-2 py-1"
                        value={formState.businessId}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                businessId: e.target.value,
                            })
                        }
                        type="text"
                        placeholder="Enter your business Id"
                    />
                </div>
                <button type="submit" className='text-sm mt-3 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>Submit</button>
                <button type="button" className='text-sm mt-3 ml-3 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>
                    <Link href="/customers">Back</Link>
                </button>
            </form>
        </div>
    )
}

export default Create
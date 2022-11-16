import { useState } from 'react'
import Router from "next/router"
import Link from "next/link";
import { useMutation } from '@apollo/client';
import { ADD_BUSINESS } from '../../graphql/mutations/businessMutations';
import { GET_BUSINESSES } from '../../graphql/queries/businessQueries';

const Create = () => {
    const [formState, setFormState] = useState({
        name: "",
        sector: "",
    });

    const [addBusiness] = useMutation(ADD_BUSINESS, {
        variables: { name: formState.name, sector: formState.sector },
        update(cache, { data: { addBusiness } }) {
            const { businesses } = cache.readQuery({
                query: GET_BUSINESSES
            })

            cache.writeQuery({
                query: GET_BUSINESSES,
                data: { businesses: [...businesses, addBusiness] }
            })
        },
        onCompleted: () => Router.push("/business")
    })

    return (
        <div className='px-3 py-4'>
            <h1 className='text-xl mb-4'>Create a New Business</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addBusiness(formState.name, formState.sector);
                    setFormState({
                        name: "",
                        sector: ""
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
                        placeholder="Enter you Business name"
                    />
                    <input
                        className="mr-3 px-2 py-1"
                        value={formState.sector}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                sector: e.target.value,
                            })
                        }
                        type="text"
                        placeholder="Enter your Business Sector"
                    />
                </div>
                <button type="submit" className='text-sm mt-3 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>Submit</button>
                <button type="button" className='text-sm mt-3 ml-3 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>
                    <Link href="/business">Back</Link>
                </button>
            </form>
        </div>
    )
}

export default Create
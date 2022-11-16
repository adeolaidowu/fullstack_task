import { useState } from 'react'
import { useRouter } from "next/router"
import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER } from '../../graphql/mutations/customerMutations';
import { GET_CUSTOMERS } from '../../graphql/queries/customerQueries';

const Update = () => {
    const router = useRouter();
    const { id, name, businessName, businessId } = router.query;
    console.log(id, name, businessName)
    const [formState, setFormState] = useState({
        name,
        businessId,
        businessName
    });


    // get data to update
    const updatedName = formState.name != "" ? formState.name : name;
    const updatedBusinessId = formState.businessId != "" ? formState.businessId : businessId;

    //console.log(data);



    const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
        variables: { id, name: updatedName, businessId: updatedBusinessId },
        refetchQueries: [{ query: GET_CUSTOMERS }],
        onCompleted: () => router.push("/customers")
    })

    return (
        <div className='px-3 py-4'>
            <h1 className='text-xl mb-4'>Update Customer</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updateCustomer(id, updatedName, updatedBusinessId);
                    setFormState({
                        name: "",
                        businessId: "",

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
                        placeholder="Enter customer name"
                    />
                    <input
                        className="mr-3 px-2 py-1"
                        value={formState.businessName}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                businessId: e.target.value,
                                businessName: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Enter your Business"
                    />
                </div>
                <button type="submit" className='text-sm mt-3 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>Submit</button>
            </form>
        </div>
    )
}

export default Update
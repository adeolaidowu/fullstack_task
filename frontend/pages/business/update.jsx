import { useState } from 'react'
import { useRouter } from "next/router"
import { useMutation } from '@apollo/client';
import { UPDATE_BUSINESS } from '../../graphql/mutations/businessMutations';
import { GET_BUSINESSES } from '../../graphql/queries/businessQueries';

const Update = () => {
    const router = useRouter();
    const { id, name, sector } = router.query;
    console.log(id, name, sector)
    const [formState, setFormState] = useState({
        name: name,
        sector: sector,
    });


    // get data to update
    const updatedName = formState.name != "" ? formState.name : name;
    const updatedSector = formState.sector != "" ? formState.sector : sector;

    //console.log(data);

    const [updateBusiness] = useMutation(UPDATE_BUSINESS, {
        variables: { id, name: updatedName, sector: updatedSector },
        refetchQueries: [{ query: GET_BUSINESSES }],
        onCompleted: () => router.push("/business")
    })

    return (
        <div className='px-3 py-4'>
            <h1 className='text-xl mb-4'>Update Business</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updateBusiness(id, updatedName, updatedSector);
                    setFormState({
                        name: "",
                        sector: "",
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
            </form>
        </div>
    )
}

export default Update
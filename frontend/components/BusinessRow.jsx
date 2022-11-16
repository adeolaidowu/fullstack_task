import { useMutation } from "@apollo/client";
import Link from "next/link";
import { DELETE_BUSINESS } from "../graphql/mutations/businessMutations";
import { GET_BUSINESSES } from "../graphql/queries/businessQueries";

const BusinessRow = ({ business }) => {
    const [removeBusiness] = useMutation(DELETE_BUSINESS, {
        variables: { id: business.id },
        update(cache, { data: { removeBusiness } }) {
            const { businesses } = cache.readQuery({
                query: GET_BUSINESSES
            })

            cache.writeQuery({
                query: GET_BUSINESSES,
                data: { businesses: businesses.filter(business => business.id != removeBusiness.id) }
            })
        }

    })
    return (
        <div className="flex mt-3">
            <p><span className="font-bold">Business Name:</span> {business.name}</p>
            <p className="mx-3"><span className="font-bold">Sector:</span> {business.sector}</p>
            <button onClick={removeBusiness} className='text-sm rounded-lg mb-2 px-3 py-1 bg-red-700 text-white font-medium'>
                Delete Business
            </button>
            <button className='text-sm rounded-lg px-3 py-1 mb-2 ml-3 bg-green-700 text-white font-medium'>
                <Link href={{
                    pathname: '/business/update',
                    query: { id: business.id, name: business.name, sector: business.sector }
                }}>
                    Update Business
                </Link>
            </button>
        </div>
    )
}

export default BusinessRow;
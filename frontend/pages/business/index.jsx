import Link from "next/link";
import { useQuery } from "@apollo/client"
import { GET_BUSINESSES } from "../../graphql/queries/businessQueries";
import BusinessRow from "../../components/BusinessRow";


const Business = () => {
    const { loading, error, data } = useQuery(GET_BUSINESSES)
    return (
        <div className="px-4">
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong</p>}
            {data && data.businesses.map(business => (
                <BusinessRow key={business.id} business={business} />
            ))}
            <button className='text-sm mt-4 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>
                <Link href="/business/create">Create New Business</Link>
            </button>
        </div>
    )
}

export default Business;
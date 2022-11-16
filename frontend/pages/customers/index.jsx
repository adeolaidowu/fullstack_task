import Link from "next/link";
import { useQuery } from "@apollo/client"
import { GET_CUSTOMERS } from "../../graphql/queries/customerQueries";
import CustomerRow from "../../components/CustomerRow";


const Customers = () => {
    const { loading, error, data } = useQuery(GET_CUSTOMERS)
    return (
        <div className="px-4">
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong</p>}
            {data && data.customers.map(customer => (
                <CustomerRow key={customer.id} customer={customer} />
            ))}
            <button className='text-sm mt-4 rounded-lg px-3 py-1 bg-teal-700 text-white font-medium'>
                <Link href="/customers/create">Create New Customer</Link>
            </button>
        </div>
    )
}

export default Customers
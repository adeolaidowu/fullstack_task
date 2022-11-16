import { useMutation } from "@apollo/client";
import Link from "next/link";
import { DELETE_CUSTOMER } from "../graphql/mutations/customerMutations";
import { GET_CUSTOMERS } from "../graphql/queries/customerQueries";

const CustomerRow = ({ customer }) => {
    console.log("Customer", customer);
    const [removeCustomer] = useMutation(DELETE_CUSTOMER, {
        variables: { id: customer.id },
        update(cache, { data: { removeCustomer } }) {
            const { customers } = cache.readQuery({
                query: GET_CUSTOMERS
            })

            cache.writeQuery({
                query: GET_CUSTOMERS,
                data: { customers: customers.filter(customer => customer.id != removeCustomer.id) }
            })
        }

    })
    return (
        <div className="flex mt-3">
            <p><span className="font-bold">Username:</span> {customer.name}</p>
            <p className="mx-3"><span className="font-bold">Customer Business:</span> {customer.business.name}</p>
            <button onClick={removeCustomer} className='text-sm rounded-lg mb-2 px-3 py-1 bg-red-700 text-white font-medium'>
                Delete Customer
            </button>
            <button className='text-sm rounded-lg px-3 py-1 mb-2 ml-3 bg-green-700 text-white font-medium'>
                <Link href={{
                    pathname: '/customers/update',
                    query: { id: customer.id, name: customer.name, businessId: customer.business.id, businessName: customer.business.name }
                }}>
                    Update Customer
                </Link>
            </button>
        </div>
    )
}

export default CustomerRow
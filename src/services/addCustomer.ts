import { supabase } from "@/lib/supabase"
import { Customer } from "@/types/types"

const addCustomer = async (customer: Customer) => {

    const { data: existing, error: lookupError } = await supabase
        .from('customers')
        .select("id")
        .eq("email", customer.email)
        .maybeSingle()

    if (lookupError) {console.error(lookupError); return}

    if (existing) {console.log("Ya existe este customers"); return;}

    const { error } = await supabase.from('customers').insert([{
        full_name: customer.full_name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        zip_code: customer.zip_code,
        notes: customer.notes,
        is_frequent: customer.is_frequent,
        total_services: customer.total_services
    }])

    if (error) {
        console.error(error)
    }
}


export default addCustomer
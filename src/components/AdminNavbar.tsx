import Link from "next/link";


export default function AdminNavbar() {


    return (
        <header className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center sticky top-0 z-50">

            <Link href={'/admin'}>
                Dashboard
            </Link>

        </header>
    )
}
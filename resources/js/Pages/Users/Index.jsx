import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Users({ auth, users }) {
    console.log(users)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listado de usuarios</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    {users.map((user) => (
                            <p className="mt-4 text-sm/relaxed text-white">
                            {user.name}
                        </p>
                    ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

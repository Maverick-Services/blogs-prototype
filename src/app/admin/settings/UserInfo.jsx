'use client';

import { useSession, signOut } from 'next-auth/react';

export default function UserInfo() {
    const { data: session, status } = useSession();
    console.log(session);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'unauthenticated') return <p>User not logged in</p>;

    const user = session.user;

    return (
        <div className="p-4 bg-white shadow rounded">
            <p className="font-semibold">Welcome, {user.name || user.email}</p>
            <p>Role: {user.role}</p>

            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Logout
            </button>
        </div>
    );
}

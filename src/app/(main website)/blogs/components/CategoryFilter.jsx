// app/blogs/components/CategoryFilter.jsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }) {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul>
                <li className="mb-2">
                    <Link
                        href="/blogs"
                        className={`block px-4 py-2 rounded-lg hover:bg-gray-100 ${!currentCategory ? 'bg-primary text-white hover:bg-primary-dark' : ''
                            }`}
                    >
                        All Categories
                    </Link>
                </li>

                {categories.map(category => (
                    <li key={category._id} className="mb-2">
                        <Link
                            href={`/blogs?category=${category.slug}`}
                            className={`block px-4 py-2 rounded-lg hover:bg-gray-100 ${currentCategory === category.slug ? 'bg-primary text-white hover:bg-primary-dark' : ''
                                }`}
                        >
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
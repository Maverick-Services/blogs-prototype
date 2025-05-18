"use client";

import Link from "next/link";

export default function CategoriesListView({ loading, error, categories }) {

    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>{error}</h1>;
    }

    if (!categories || categories?.length === 0) {
        return <h1 className="text-center text-gray-500">No Categories Found!</h1>;
    }

    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full border-collapse">

                    <thead>
                        <tr className="bg-gray-50 text-xl border-b text-primary">
                            <th className="px-6 py-3 text-center font-semibold">S. No.</th>
                            <th className="px-6 py-3 text-center font-semibold">Image</th>
                            <th className="px-6 py-3 text-center font-semibold">Name</th>
                            <th className="px-6 py-3 text-center font-semibold">Slug</th>
                            <th className="px-6 py-3 text-center font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories?.map((item, key) => (
                            <tr key={key} className="even:bg-gray-50 hover:bg-gray-100 transition text-center">
                                <td className="px-6 py-3 border-b">{key + 1}</td>
                                <td className="px-6 py-3 border-b flex justify-center items-center">
                                    <img
                                        className="h-14 rounded-md object-cover border"
                                        src={item?.imageURL?.imageURL}
                                        alt="category-img"
                                    />
                                </td>
                                <td className="px-6 py-3 border-b">{item?.name}</td>
                                <td className="px-6 py-3 border-b">{item?.slug}</td>
                                <td className="px-6 py-3 border-b text-center">
                                    <Link href={`/admin/categories/form?id=${item?.id}`}>
                                        <button className="bg-primary text-white rounded-full px-4 py-2 text-sm hover:bg-[#4a0ea3] transition">
                                            Edit
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Loader2, LucideDelete, Pencil, Trash } from "lucide-react";

export default function TagsListView({ isLoading, error, tags, onEdit, onDelete, isDeleting }) {
    // console.log(tags)
    if (isLoading) return <div className="text-center p-4"><Loader2 className="animate-spin inline-block" /></div>;
    if (error) return <div className="text-red-600 p-4">Error: {error.message}</div>;
    if (!tags?.length) return <div className="text-center text-gray-500 p-4">No Tags Found!</div>;

    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-md border border-gray-200">
                <table className="w-full border-collapse">

                    <thead>
                        <tr className="bg-gray-50 text-xl border-b text-primary">
                            <th className="px-6 py-3 text-center font-semibold">S. No.</th>
                            <th className="px-6 py-3 text-center font-semibold">Name</th>
                            <th className="px-6 py-3 text-center font-semibold">Slug</th>
                            <th className="px-6 py-3 text-center font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tags?.map((item, key) => (
                            <tr key={key} className="even:bg-gray-50 hover:bg-gray-100 transition text-center">
                                <td className="px-6 py-3 border-b">{key + 1}</td>
                                <td className="px-6 py-3 border-b">{item?.name}</td>
                                <td className="px-6 py-3 border-b">{item?.slug}</td>
                                <td className="px-6 py-3 border-b text-center flex gap-2 items-center justify-center">
                                    <Button size="icon" variant="outline" className='cursor-pointer' onClick={() => onEdit(item)} >
                                        <Pencil size={16} />
                                    </Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                type="button"
                                                className="bg-red-600 size-icon flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                                            >
                                                <Trash size={20} />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Delete Tag</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete this Tag?
                                                </DialogDescription>
                                            </DialogHeader>

                                            <DialogFooter>
                                                <Button
                                                    type="button"
                                                    onClick={() => onDelete(item._id)}
                                                    disabled={isDeleting}
                                                    className="bg-red-600 w-full flex gap-2 items-center justify-center text-white py-2 px-4 rounded-md hover:bg-red-800 cursor-pointer transition"
                                                >
                                                    {isDeleting ? (
                                                        <Loader2 className="animate-spin" size={20} />
                                                    ) : (
                                                        <>
                                                            <Trash size={20} /> Delete
                                                        </>
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

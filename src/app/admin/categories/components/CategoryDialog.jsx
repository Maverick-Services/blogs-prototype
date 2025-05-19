import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Loader2 } from 'lucide-react';
import ImageSelector from "@/components/ImageSelector";

export default function CategoryDialog({ open, onOpenChange, selectedCategory, onCreate, onUpdate, isSubmitting, error, }) {

    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm()
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (open) {
            if (selectedCategory) {
                reset({
                    name: selectedCategory.name,
                    slug: selectedCategory.slug,
                    imageURL: selectedCategory.imageURL
                });
            } else {
                reset({
                    name: '',
                    slug: '',
                    imageURL: ''
                });
            }
        }
    }, [open, selectedCategory, reset]);

    const watchName = watch("name");

    useEffect(() => {
        // if (!selectedCategory) {
        const generatedSlug = watchName
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
        setValue('slug', generatedSlug);
        // }
    }, [watchName, setValue,]);


    const onSubmit = async (data) => {
        try {
            if (selectedCategory?._id) {
                await onUpdate({ id: selectedCategory._id, data });
                onOpenChange(false);
            } else {
                await onCreate(data);
                onOpenChange(false);
            }
        } catch (error) {
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {selectedCategory ? "Edit Category" : "Add Category"}
                    </DialogTitle>
                    <DialogDescription>
                        Categories help to group your products or services and blogs in your website.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">

                        {/* Image URL */}
                        <div
                            className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer h-48 mb-4 sm:mb-0"
                            // onClick={triggerFileSelect}
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <span className="text-gray-500">Click to select image</span>
                        </div>

                        {/* name */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="name" className="text-right mt-2">
                                Name<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="name"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                    className={clsx("w-full", {
                                        "border-red-500": errors.name,
                                    })}
                                    placeholder="Sports"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* slug */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="slug" className="text-right mt-2">
                                Slug<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="slug"
                                    {...register("slug", {
                                        required: "Slug is required",
                                        validate: value =>
                                            !/\s/.test(value) || "Slug cannot contain spaces",
                                    })}
                                    className={clsx("w-full", { "border-red-500": errors.slug })}
                                    placeholder="sports"
                                    disabled={true}
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.slug.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-600 mb-5 text-sm">Error: {error}</p>
                    )}

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="animate-spin mr-1" />}
                            {selectedCategory ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

            <ImageSelector
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </Dialog>
    )
}

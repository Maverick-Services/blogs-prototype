'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandItem,
} from '@/components/ui/command';
import { useCategories } from '@/hooks/useCategories';
import { useTags } from '@/hooks/useTags';
import { X } from 'lucide-react';

const Step1BasicDetails = () => {
    const { register, formState: { errors }, watch, setValue, } = useFormContext();
    const { categoriesQuery } = useCategories();
    const { tagsQuery } = useTags();

    const allCategories = categoriesQuery.data || [];
    const allTags = tagsQuery.data || [];

    // watch holds array of selected _id strings
    const selectedCats = watch('categories') || [];
    const selectedTags = watch('tags') || [];

    // helper to add/remove
    const toggleSelect = (field, id) => {
        const curr = watch(field) || [];
        if (curr.includes(id)) {
            setValue(
                field,
                curr.filter((x) => x !== id),
                { shouldValidate: true }
            );
        } else {
            setValue(field, [...curr, id], { shouldValidate: true });
        }
    };

    return (
        <div className="grid gap-4 grid-cols-2">
            <div>
                <Label>Name</Label>
                <Input {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <Label>Slug</Label>
                <Input {...register('slug')} />
                {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
            </div>

            <div>
                <Label>Short Description</Label>
                <Textarea {...register('shortDescription')} />
                {errors.shortDescription && (
                    <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>
                )}
            </div>

            <div>
                <Label>Image URL</Label>
                <Input {...register('imageURL')} />
                {errors.imageURL && <p className="text-red-500 text-sm">{errors.imageURL.message}</p>}
            </div>

            <div className="flex items-center gap-2">
                <Label>Status</Label>
                <Switch
                    checked={watch('status')}
                    onCheckedChange={(val) => setValue('status', val)}
                />
            </div>

            <div className="flex items-center gap-2">
                <Label>Featured</Label>
                <Switch
                    checked={watch('featured')}
                    onCheckedChange={(val) => setValue('featured', val)}
                />
            </div>
            {/* Categories Multi-Select */}
            <div>
                <Label>Categories</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <div
                            className="min-h-[38px] w-full flex flex-wrap items-center gap-1 px-2 border rounded cursor-pointer"
                            onClick={(e) => e.currentTarget.nextElementSibling?.dispatchEvent(new MouseEvent('click'))}
                        >
                            {selectedCats.length === 0 && (
                                <span className="text-gray-400">Select categories…</span>
                            )}
                            {selectedCats.map((id) => {
                                const cat = allCategories.find((c) => c._id === id);
                                return (
                                    <span
                                        key={id}
                                        className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-sm"
                                    >
                                        {cat?.name}
                                        <X
                                            className="ml-1 cursor-pointer"
                                            size={12}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSelect('categories', id);
                                            }}
                                        />
                                    </span>
                                );
                            })}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandList>
                                <CommandEmpty>No categories found.</CommandEmpty>
                                {allCategories.map((cat) => (
                                    <CommandItem
                                        key={cat._id}
                                        onSelect={() => toggleSelect('categories', cat._id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCats.includes(cat._id)}
                                            readOnly
                                            className="mr-2"
                                        />
                                        {cat.name}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {errors.categories && (
                    <p className="text-red-500 text-sm">
                        {errors.categories.message}
                    </p>
                )}
            </div>

            {/* Tags Multi-Select (same pattern) */}
            <div>
                <Label>Tags</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <div
                            className="min-h-[38px] w-full flex flex-wrap items-center gap-1 px-2 border rounded cursor-pointer"
                            onClick={(e) => e.currentTarget.nextElementSibling?.dispatchEvent(new MouseEvent('click'))}
                        >
                            {selectedTags.length === 0 && (
                                <span className="text-gray-400">Select tags…</span>
                            )}
                            {selectedTags.map((id) => {
                                const tag = allTags.find((t) => t._id === id);
                                return (
                                    <span
                                        key={id}
                                        className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-sm"
                                    >
                                        {tag?.name}
                                        <X
                                            className="ml-1 cursor-pointer"
                                            size={12}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSelect('tags', id);
                                            }}
                                        />
                                    </span>
                                );
                            })}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search tags..." />
                            <CommandList>
                                <CommandEmpty>No tags found.</CommandEmpty>
                                {allTags.map((tag) => (
                                    <CommandItem
                                        key={tag._id}
                                        onSelect={() => toggleSelect('tags', tag._id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag._id)}
                                            readOnly
                                            className="mr-2"
                                        />
                                        {tag.name}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {errors.tags && (
                    <p className="text-red-500 text-sm">
                        {errors.tags.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Step1BasicDetails;

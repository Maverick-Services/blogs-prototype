'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import PageHeader from '@/components/dashboard/PageHeader';
import { CategoryNameInput } from './CategoryNameInput';
import { CategorySlugInput } from './CategorySlugInput';
import { CategoryImageUpload } from './CategoryImageUpload';
import { CategoryFormButtons } from './CategoryFormButtons';
import { useCategoryFormContext } from '../contexts/CategoryFormContext';
import uploadImage from '@/lib/services/uploadImage';

export default function CategoryForm() {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('id');
    const { creating, deleting, error, handleCreate, handleUpdate, handleDelete } = useCategoryFormContext();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { name: '', slug: '' }
    });

    const [localImage, setLocalImage] = useState(null);
    const [receivedImage, setReceivedImage] = useState(null);

    useEffect(() => {
        if (!categoryId) return;

        const fetchCategory = async () => {
            try {
                const res = await axios.get(`/api/categories/${categoryId}`);
                const data = res.data.data;
                reset({ name: data.name, slug: data.slug });
                setReceivedImage(data.imageURL || null);
                setLocalImage(null);
            } catch (err) {
                console.error('Error fetching category:', err);
            }
        };

        fetchCategory();
    }, [categoryId, reset]);

    const onSubmit = async (values) => {
        try {
            let imageUrl = receivedImage; // default to existing

            // if user selected a new file, upload it
            if (localImage) {
                imageUrl = await uploadImage(localImage);
            }

            if (categoryId) {
                await handleUpdate(categoryId, values, imageUrl);
            } else {
                await handleCreate(values, imageUrl);
            }
        } catch (err) {
            console.error('Error during submission:', err);
        }
    };

    return (
        <InnerDashboardLayout>
            <main className="w-full sm:px-6 sm:pt-3 flex flex-col gap-3">
                <PageHeader heading={categoryId ? 'Update Category' : 'Add New Category'} />

                <Breadcrumb className='mb-3'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/categories">Categories</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{categoryId ? 'Update' : 'Add'} Category</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white border rounded-xl p-7">
                    <div className='grid gap-5 grid-cols-1 sm:grid-cols-2'>
                        <div className='space-y-3'>
                            <CategoryNameInput register={register} error={errors.name} />
                            <CategorySlugInput register={register} error={errors.slug} disabled={!!categoryId} />
                        </div>
                        <CategoryImageUpload
                            receivedImage={receivedImage}
                            localImage={localImage}
                            setLocalImage={setLocalImage}
                            error={null}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <CategoryFormButtons
                        isSubmitting={isSubmitting}
                        creating={creating}
                        deleting={deleting}
                        isUpdate={!!categoryId}
                        onDelete={() => handleDelete(categoryId)}
                    />
                </form>
            </main>
        </InnerDashboardLayout>
    );
}

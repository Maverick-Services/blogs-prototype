'use client';
import { useTags } from '@/hooks/useTags';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import TagsListView from './components/TagsListView';
import TagDialog from './components/TagDialog';
import { useState } from 'react';

export default function Page() {
    const {
        tagsQuery,
        createTag,
        updateTag,
        deleteTag,
    } = useTags();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState();

    return (
        <InnerDashboardLayout>
            <div className='w-full items-center justify-between'>
                <h1 className='text-primary font-bold sm:text-2xl lg:text-4xl mb-3'>Tags</h1>
            </div>
            <div className="">
                <div className="flex justify-between items-center mb-4 mt-4">
                    <div className='space-x-2 flex'>
                        <Button variant="outline">
                            Tags: {tagsQuery.data?.length || 0}
                        </Button>
                    </div>
                    <Button onClick={() => {
                        setSelectedTag(undefined);
                        setIsDialogOpen(true);
                    }}>
                        <CirclePlus className="mr-2 h-4 w-4" />
                        Add New
                    </Button>
                </div>

                <TagsListView
                    tags={tagsQuery.data}
                    onEdit={(tag) => {
                        setSelectedTag(tag);
                        setIsDialogOpen(true);
                    }}
                    onDelete={deleteTag.mutateAsync}
                    isLoading={tagsQuery.isLoading}
                    isDeleting={deleteTag.isLoading}
                    error={tagsQuery.error}
                />

                <TagDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    selectedTag={selectedTag}
                    onCreate={createTag.mutateAsync}
                    onUpdate={updateTag.mutateAsync}
                    isSubmitting={createTag.isLoading || updateTag.isLoading}
                    error={createTag.error?.message || updateTag.error?.message}
                />
            </div>
        </InnerDashboardLayout>
    );
}


//   <Breadcrumb className="mb-3">
//                     <BreadcrumbList>
//                         <BreadcrumbItem>
//                             <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
//                         </BreadcrumbItem>
//                         <BreadcrumbSeparator />
//                         <BreadcrumbItem>
//                             <BreadcrumbPage>Tags</BreadcrumbPage>
//                         </BreadcrumbItem>
//                     </BreadcrumbList>
//                 </Breadcrumb>



// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
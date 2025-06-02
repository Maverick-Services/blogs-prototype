"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import { useEnquiries } from '@/hooks/useEnquiries'
import React, { useMemo, useState } from 'react'
import EnquiryTable from './components/EnquiryTable';

function page() {

    // filters
    const [status, setStatus] = useState('all');
    const [important, setImportant] = useState('all');

    // pagination
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const {
        enquiriesQuery,
        deleteEnquiry,
        updateEnquiry,
        permissions: { canView, canEdit, canDelete, onlyAdmin }
    } = useEnquiries({ status, important, page, pageSize })

    // Memoize expensive computations
    const enquiriesData = useMemo(() => {
        return enquiriesQuery?.data?.data || [];
    }, [enquiriesQuery?.data?.data]);

    const totalCount = useMemo(() => {
        return enquiriesQuery?.data?.totalCount || 0;
    }, [enquiriesQuery.data]);

    const pageCount = Math.ceil(totalCount / pageSize)
    console.log(enquiriesQuery);

    if (!canView) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-red-500">You don't have permission to view enquiries.</p>
            </div>
        );
    }

    return (
        <InnerDashboardLayout>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-primary font-bold sm:text-2xl lg:text-4xl">Enquiries</h1>
            </div>

            <div>

            </div>

            <EnquiryTable
                enquiries={enquiriesData}
                canDelete={canDelete}
                isDeleting={deleteEnquiry.isPending}
                deleteError={deleteEnquiry.error}
                canEdit={canEdit}
                error={enquiriesQuery.error}
                isLoading={enquiriesQuery.isPending}
                onDelete={deleteEnquiry.mutateAsync}
                onPageChange={setPage}
                onlyAdmin={onlyAdmin}
                page={page}
                pageCount={pageCount}
                onToggleImportant={(id, newVal) =>
                    updateEnquiry.mutateAsync({ id, important: newVal })
                }
                onChangeStatus={(id, newStatus) =>
                    updateEnquiry.mutate({ id, status: newStatus })
                }
            />

        </InnerDashboardLayout>
    )
}

export default page
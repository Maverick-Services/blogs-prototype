"use client"
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'
import { Button } from '@/components/ui/button'
import { useUsers } from '@/hooks/useUsers';
import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react'
import UsersListView from './components/UsersListView';
import UserDialog from './components/UserDialog';

function page() {
    // fetch users query
    const { usersQuery, createUser, updateUser, deleteUser } = useUsers();

    // destructure createUser mutation
    const {
        mutateAsync: createUserAsync,
        isPending: isCreating,
        error: createError,
        reset: resetCreate,
    } = createUser;

    // destructure updateUser mutation
    const {
        mutateAsync: updateUserAsync,
        isPending: isUpdating,
        error: updateError,
        reset: resetUpdate,
    } = updateUser;

    // destructure deleteUser mutation
    const {
        mutateAsync: deleteUserAsync,
        isPending: isDeleting,
        error: deleteError,
        reset: resetDelete,
    } = deleteUser;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    // open dialog to add new tag
    const handleAddClick = () => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedUser(undefined);
        setIsDialogOpen(true);
    };

    // open dialog to edit
    const handleEditClick = (tag) => {
        resetCreate();
        resetUpdate();
        resetDelete();
        setSelectedUser(tag);
        setIsDialogOpen(true);
    };

    return (
        <div>
            <InnerDashboardLayout>
                <div className='w-full flex items-center justify-between'>
                    <h1 className='text-primary font-bold sm:text-2xl lg:text-4xl'>Users</h1>
                </div>

                <div className="flex justify-between items-center mb-4 mt-4">
                    <Button variant="outline">
                        Users: 14
                    </Button>
                    <Button onClick={handleAddClick}>
                        <CirclePlus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>

                <UsersListView
                    users={usersQuery.data}
                    onEdit={handleEditClick}
                    onDelete={deleteUserAsync}
                    isLoading={usersQuery.isLoading}
                    error={usersQuery.error}
                    isDeleting={isDeleting}
                    deleteError={deleteError}
                />

                <UserDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    selectedUser={selectedUser}
                    onCreate={createUserAsync}
                    onUpdate={updateUserAsync}
                    isSubmitting={isCreating || isUpdating}
                    error={createError?.message || updateError?.message}
                />

            </InnerDashboardLayout>
        </div>
    )
}

export default page

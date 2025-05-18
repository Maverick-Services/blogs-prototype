export function CategoryFormButtons({ isSubmitting, creating, deleting, isUpdate, onDelete }) {
    return (
        <div className="flex justify-end gap-2">
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-900 rounded-sm px-4 py-2 text-white"
            >
                {creating ? 'Loading...' : isUpdate ? 'Update' : 'Create'}
            </button>
            {isUpdate && (
                <button
                    type="button"
                    onClick={() => {
                        if (window.confirm('Do you want to delete this category?')) onDelete();
                    }}
                    disabled={isSubmitting}
                    className="bg-red-500 rounded-sm px-4 py-2 text-white"
                >
                    {deleting ? 'Loading...' : 'Delete'}
                </button>
            )}
        </div>
    );
}

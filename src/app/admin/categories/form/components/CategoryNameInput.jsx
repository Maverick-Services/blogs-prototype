export function CategoryNameInput({ register, error }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">Category Name <span className="text-red-500">*</span></label>
            <input
                {...register('name', { required: 'Name is required' })}
                className={`px-4 py-2 rounded-sm border ${error ? 'border-red-500 outline-red-500' : 'border-gray-200'} bg-gray-50`}
                placeholder="Enter Category Name"
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}
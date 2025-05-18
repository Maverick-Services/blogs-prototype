export function CategorySlugInput({ register, error, disabled }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-500">Category Slug <span className="text-red-500">*</span></label>
            <input
                {...register('slug', { required: 'Slug is required' })}
                disabled={disabled}
                className={`px-4 py-2 rounded-sm border ${error ? 'border-red-500 outline-red-500' : 'border-gray-200'} bg-gray-50 ${disabled ? 'opacity-50' : ''}`}
                placeholder="Enter Category Slug"
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}
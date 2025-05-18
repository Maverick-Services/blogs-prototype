import { useEffect, useState } from 'react';

export function CategoryImageUpload({
    receivedImage,
    localImage,
    setLocalImage,
    error
}) {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (localImage) {
            const url = URL.createObjectURL(localImage);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreview(null);
        }
    }, [localImage]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 100 * 1024) {
                alert('Image must be less than 100KB');
                return;
            }
            setLocalImage(file);
        } else {
            setLocalImage(null);
        }
    };

    return (
        <div className="space-y-4 p-6 bg-white rounded-xl border border-gray-200 ">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Category Image
                    <span className="ml-1 text-red-500">*</span>
                </label>

                {/* Current Image */}
                {receivedImage && (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500">Current Image</p>
                        <div className="relative group overflow-hidden rounded-lg border border-gray-200">
                            <img
                                src={receivedImage?.imageURL}
                                alt="Current"
                                className="w-full h-40 object-cover transition-opacity group-hover:opacity-75"
                            />
                            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" /> */}
                        </div>
                    </div>
                )}

                {/* Preview Image */}
                {preview && (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500">New Preview</p>
                        <div className="relative group overflow-hidden rounded-lg border border-gray-200">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-40 object-cover transition-opacity group-hover:opacity-75"
                            />
                            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" /> */}
                        </div>
                    </div>
                )}

                {/* Upload Area */}
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors bg-gray-50 hover:bg-gray-100 group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-2 text-gray-400 group-hover:text-blue-500 transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                                {preview || receivedImage ? 'Replace Image' : 'Upload Image'}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG up to 100KB
                            </p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {error && (
                    <div className="flex items-center text-red-600 text-sm mt-2">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {error.message || error}
                    </div>
                )}
            </div>
        </div>
    );
}
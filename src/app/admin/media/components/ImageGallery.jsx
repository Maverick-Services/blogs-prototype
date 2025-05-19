import React from 'react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';

export default function ImageGallery({ images, isLoading, onDelete }) {
    if (isLoading) {
        return <div className=""><Loader /></div>;
    }

    if (images.length === 0) {
        return <p className="text-center py-10 italic text-gray-500">No media uploaded yet.</p>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            {images.map((img) => (
                <div key={img.public_id} className="border rounded-lg overflow-hidden shadow-sm">
                    <img
                        src={img.url}
                        alt={img.public_id}
                        className="w-full h-32 object-cover"
                    />
                    <div className="p-2 space-y-1 text-sm">
                        <p><strong>Format:</strong> {img.format}</p>
                        <p><strong>Size:</strong> {img.size} KB</p>
                    </div>
                    <div className="p-2 flex justify-end">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(img.public_id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

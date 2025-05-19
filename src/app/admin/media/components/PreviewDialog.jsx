'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiTrash2, FiImage, FiInfo, FiCalendar, FiAlertTriangle } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';

export default function PreviewDialog({ open, onOpenChange, image, onDelete, deleting, deleteError, }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <div            >
                <DialogContent className="sm:max-w-3xl rounded-2xl backdrop-blur-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-slate-800">
                            <FiImage className="text-blue-600" />
                            Media Preview
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col sm:flex-row gap-6 p-4">
                        {/* Image Preview Section */}
                        <div
                            className="flex-1 group relative overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center"
                        >
                            <img
                                src={image.url}
                                alt={image.public_id}
                                className="w-full h-72 object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Metadata Section */}
                        <div className="flex-1 space-y-4 text-slate-600">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FiInfo className="text-slate-400" />
                                    <p className="font-medium">ID: <span className="font-mono text-sm text-slate-500">{image.id}</span></p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <FiCalendar className="text-slate-400" />
                                    <p>Uploaded: <span className="text-slate-500">{new Date(image.created_at).toLocaleString()}</span></p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-slate-50 rounded-lg">
                                        <p className="text-xs text-slate-400 mb-1">Format</p>
                                        <p className="font-medium uppercase">{image.format}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg">
                                        <p className="text-xs text-slate-400 mb-1">Dimensions</p>
                                        <p className="font-medium">Height: {image.height}px <br /> Width: {image.width}px</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg">
                                        <p className="text-xs text-slate-400 mb-1">Size</p>
                                        <p className="font-medium">{image.size} KB</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg">
                                        <p className="text-xs text-slate-400 mb-1">Public ID</p>
                                        <p className="font-medium text-sm break-all">{image.public_id}</p>
                                    </div>
                                </div>
                            </div>

                            {deleteError && (
                                <div className="p-3 bg-red-50 rounded-lg flex items-center gap-2 text-red-600">
                                    <FiAlertTriangle />
                                    <p>Error deleting: {deleteError}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <div>
                            <Button
                                variant="destructive"
                                onClick={onDelete}
                                disabled={deleting}
                                className="gap-2 px-6 py-3 transition-all"
                            >
                                {deleting ? (
                                    <>
                                        <Loader2 size={20} className='animate-spin' />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <FiTrash2 className="text-lg" />
                                        Delete Image
                                    </>
                                )}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    );
}
'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Step3PageContent = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'serviceBigDescription',
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Page Content</h3>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        append({ name: '', title: '', content: '' })
                    }
                >
                    + Add Content Section
                </Button>
            </div>

            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="p-4 border rounded-md space-y-4 relative"
                >
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Section {index + 1}</h4>
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                        >
                            Remove
                        </Button>
                    </div>

                    {/* Name */}
                    <div>
                        <Label>Name</Label>
                        <Input
                            {...register(`serviceBigDescription.${index}.name`)}
                            placeholder="e.g. SEO"
                        />
                        {errors.serviceBigDescription?.[index]?.name && (
                            <p className="text-red-500 text-sm">
                                {errors.serviceBigDescription[index].name.message}
                            </p>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <Label>Title</Label>
                        <Input
                            {...register(`serviceBigDescription.${index}.title`)}
                            placeholder="e.g. Improve your visibility"
                        />
                        {errors.serviceBigDescription?.[index]?.title && (
                            <p className="text-red-500 text-sm">
                                {errors.serviceBigDescription[index].title.message}
                            </p>
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <Label>Content</Label>
                        <Textarea
                            {...register(`serviceBigDescription.${index}.content`)}
                            rows={4}
                            placeholder="Detailed content goes here..."
                        />
                        {errors.serviceBigDescription?.[index]?.content && (
                            <p className="text-red-500 text-sm">
                                {errors.serviceBigDescription[index].content.message}
                            </p>
                        )}
                    </div>
                </div>
            ))}

            {errors.serviceBigDescription && typeof errors.serviceBigDescription?.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.serviceBigDescription.message}</p>
            )}
        </div>
    );
};

export default Step3PageContent;

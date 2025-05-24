'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Step2PageDetails = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'serviceTypeDetails',
    });

    return (
        <div className="space-y-6">
            {/* Page Heading */}
            <div>
                <Label>Page Heading</Label>
                <Input {...register('pageHeading')} />
                {errors.pageHeading && (
                    <p className="text-red-500 text-sm">{errors.pageHeading.message}</p>
                )}
            </div>

            {/* Service Type Details */}
            <div>
                <Label>Service Type Details (max 10)</Label>
                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center">
                            <Input
                                {...register(`serviceTypeDetails.${index}`)}
                                placeholder={`Type detail #${index + 1}`}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                                size="icon"
                            >
                                ✕
                            </Button>
                        </div>
                    ))}

                    {errors.serviceTypeDetails && (
                        <p className="text-red-500 text-sm">
                            {errors.serviceTypeDetails.message}
                        </p>
                    )}
                </div>

                {fields.length < 10 && (
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-3"
                        onClick={() => append('')}
                    >
                        + Add Service Type Detail
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Step2PageDetails;

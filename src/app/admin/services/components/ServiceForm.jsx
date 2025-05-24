'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Step1BasicDetails from './steps/Step1BasicDetails';
import Step2PageDetails from './steps/Step2PageDetails';
import Step3PageContent from './steps/Step3PageContent';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/useServices';
import { Loader2 } from 'lucide-react';

// Simple step indicator UI (shadcn style)
const steps = [
    { title: 'Basic Details' },
    { title: 'Page Details' },
    { title: 'Page Content' },
];

const ServiceForm = ({ defaultValues, onSubmit }) => {
    const { createService, updateService } = useServices()

    const methods = useForm({
        mode: 'onChange',
        defaultValues: defaultValues || {
            name: '',
            slug: '',
            shortDescription: '',
            imageURL: '',
            categories: [],
            tags: [],
            status: true,
            featured: false,
            pageHeading: '',
            serviceTypeDetails: [''],
            serviceBigDescription: [],
        },
    });

    const [currentStep, setCurrentStep] = useState(0);

    const onNext = async () => {
        // Validate only fields of current step before proceeding
        let fieldsToValidate = [];
        if (currentStep === 0) {
            fieldsToValidate = ['name', 'slug', 'shortDescription', 'imageURL', 'categories', 'tags', 'status', 'featured'];
        } else if (currentStep === 1) {
            fieldsToValidate = ['pageHeading', 'serviceTypeDetails'];
        } else if (currentStep === 2) {
            fieldsToValidate = ['serviceBigDescription'];
        }

        const valid = await methods.trigger(fieldsToValidate);
        if (valid) {
            setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
        }
    };

    const onPrevious = () => {
        setCurrentStep((step) => Math.max(step - 1, 0));
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                {/* Step Indicator */}
                <div className="flex space-x-4 mb-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex-1 text-center py-2 border-b-2 cursor-pointer ${index === currentStep ? 'border-indigo-600 font-semibold' : 'border-gray-300 text-gray-500'
                                }`}
                            onClick={() => setCurrentStep(index)}
                        >
                            {step.title}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div>
                    {currentStep === 0 && <Step1BasicDetails />}
                    {currentStep === 1 && <Step2PageDetails />}
                    {currentStep === 2 && <Step3PageContent />}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onPrevious}
                        disabled={currentStep === 0}
                    >
                        Previous
                    </Button>

                    {currentStep < steps.length - 1 ? (
                        <Button type="button" onClick={onNext}>
                            Next
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className={`bg-indigo-600 hover:bg-indigo-700`}
                            disabled={createService.isPending}
                        >
                            {createService.isPending || updateService.isPending ? <Loader2 className='animate-spin' /> : 'Submit'}
                        </Button>
                    )}
                </div>
            </form>
        </FormProvider>
    );
};

export default ServiceForm;

'use client';

import { useForm } from 'react-hook-form';

export default function EnquiryForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Form Data:', data);
    };

    return (
        <div className="bg-white p-4 rounded-xl w-full shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-primary mb-3">
                Need help?
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.name ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Contact Number */}
                <div>
                    <input
                        type="tel"
                        placeholder="Contact Number"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.contact ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('contact', {
                            required: 'Contact number is required',
                            minLength: { value: 10, message: 'Minimum 10 digits required' },
                            maxLength: { value: 15, message: 'Maximum 15 digits allowed' },
                        })}
                    />
                    {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                </div>

                {/* Message */}
                <div className='mb-2'>
                    <textarea
                        rows={4}
                        placeholder="Write your message"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.message ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('message', { required: 'Message is required' })}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-[#231d35] transition-colors"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}

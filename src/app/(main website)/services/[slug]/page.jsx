// app/services/[slug]/page.jsx
import WebsiteLayout from '@/components/website/WebsiteLayout';
import { getAllServicesSlugs, getServiceBySlug } from '@/lib/main/services';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const services = await getAllServicesSlugs();
    return services.data.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
    const service = await (params.slug);

    if (!service) return {
        title: "Service Not Found",
        description: "The requested service does not exist"
    };

    return {
        title: service.pageHeading,
        description: service.shortDescription,
        openGraph: {
            title: service.pageHeading,
            description: service.shortDescription,
            images: [service.imageURL],
            url: `/services/${service.slug}`,
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: service.pageHeading,
            description: service.shortDescription,
            images: [service.imageURL]
        }
    };
}

async function Page({ params }) {


    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }
    console.log(service)
    return (
        <WebsiteLayout>
            <main className="container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    {/* Structured Data for SEO */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Service",
                                "name": service.name,
                                "description": service.shortDescription,
                                "image": service.imageURL,
                                "serviceType": service.serviceTypeDetails.join(', '),
                                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/services/${service.slug}`
                            })
                        }}
                    />

                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {service.pageHeading}
                        </h1>
                        <img
                            src={service.imageURL}
                            alt={service.name}
                            className="w-full h-96 object-cover rounded-lg"
                            loading="eager"
                        />
                    </header>

                    <section className="prose lg:prose-xl">
                        {service.serviceBigDescription.map((section, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </section>
                </article>
            </main>
        </WebsiteLayout>
    );
}

export default Page;
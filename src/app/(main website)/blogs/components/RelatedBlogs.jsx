'use client'

import { useState, useEffect, useRef } from 'react'
import { getBlogsByCategory } from '@/lib/firebase/blogs/blogs'
import { Carousel, CarouselItem, CarouselControl } from '@/components/ui/carousel'
import { PostCard } from './PostCard'
import * as React from "react"
// import Autoplay from "embla-carousel-autoplay"
// import { Button } from '@/components/ui/button'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

export function RelatedBlogs({ category }) {
    const [blogs, setBlogs] = useState([])
    const carouselRef = useRef(null)
    const [activeIndex, setActiveIndex] = useState(0)

    // Fetch on category change
    useEffect(() => {
        if (!category) return
        getBlogsByCategory(category).then((res) => {
            if (res) setBlogs(res)
        })
    }, [category])

    // Autoplay every 3s
    useEffect(() => {
        if (blogs.length <= 1) return
        const timer = setInterval(() => {
            setActiveIndex((i) => (i + 1) % blogs.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [blogs])

    // Scroll to current slide
    useEffect(() => {
        if (!carouselRef.current) return
        const container = carouselRef.current
        const slideWidth = container.clientWidth
        container.scrollTo({
            left: slideWidth * activeIndex,
            behavior: 'smooth',
        })
    }, [activeIndex])

    if (blogs.length === 0) return null

    // const plugin = React.useRef(
    //     Autoplay({ delay: 2000, stopOnInteraction: true })
    // )

    return (
        <div className="py-4 space-y-4">
            <h3 className="text-3xl text-center font-bold text-primary p-4">
                Related Blogs
            </h3>

            <div className="relative">
                <div
                    ref={carouselRef}
                    className="flex overflow-hidden snap-x snap-mandatory gap-6"
                >
                    <Carousel
                        // plugins={[plugin.current]}
                        className="w-full max-w-xs"
                    // onMouseEnter={plugin.current.stop}
                    // onMouseLeave={plugin.current.reset}
                    >
                        {blogs.map((blog, idx) => (
                            <CarouselItem
                                key={blog.id}
                                className="w-full snap-start"
                            >
                                <PostCard blog={blog} />
                            </CarouselItem>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

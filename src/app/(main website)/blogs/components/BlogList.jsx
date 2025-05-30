'use client';

import { useState, useRef, useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';

const fetcher = url => fetch(url).then(res => res.json());

export default function BlogList({ initialBlogs, initialTotalCount }) {
    const PAGE_SIZE = 10;

    const getKey = (pageIndex, previousPage) => {
        // Stop if reached end
        if (previousPage && !previousPage.blogs.length) return null;

        const lastId = pageIndex === 0
            ? null
            : previousPage.lastId;

        // Build API URL
        const params = new URLSearchParams();
        params.set('limit', PAGE_SIZE);
        if (lastId) params.set('lastId', lastId);

        return `/api/blogs?${params.toString()}`;
    };

    const { data, size, setSize, isValidating } = useSWRInfinite(
        getKey,
        fetcher,
        {
            initialData: [{ blogs: initialBlogs, lastId: initialBlogs[initialBlogs.length - 1]?._id, totalCount: initialTotalCount }]
        }
    );

    const allBlogs = data.flatMap(page => page.blogs);
    const totalCount = data[0]?.totalCount;

    const observerRef = useRef();
    const loadMoreRef = useCallback(node => {
        if (isValidating) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && allBlogs.length < totalCount) {
                setSize(size + 1);
            }
        });

        if (node) observerRef.current.observe(node);
    }, [isValidating, size, allBlogs, totalCount]);

    return (
        <div className="space-y-6">
            {allBlogs.map(blog => (
                <article key={blog._id} className="prose">
                    <h2>{blog.title}</h2>
                    <p>{blog.excerpt}</p>
                </article>
            ))}

            {allBlogs.length < totalCount && (
                <div ref={loadMoreRef} className="py-10 text-center">
                    {isValidating ? 'Loading more…' : 'Scroll to load more'}
                </div>
            )}
        </div>
    );
}
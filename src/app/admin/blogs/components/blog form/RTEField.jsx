"use client"
import React, { useEffect, useRef } from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function RTEField({ content, setValue }) {
    const editorRef = useRef();

    useEffect(() => {
        if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            const newContent = editorInstance.getMarkdown();
            setValue('content', newContent)
        }
    }, [content])

    const handleChange = () => {
        if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            const newContent = editorInstance.getMarkdown();

            setValue('content', newContent)
        }
    }

    return (
        <div className="border-t-2 pt-6 mt-6 w-full mx-auto bg-whiteCard text-primary">
            <div className="flex w-full justify-between items-center mb-2">
                <h1 className="text-xl font-bold">Blog Content</h1>
            </div>
            <div className="bg-white">
                <Editor
                    ref={editorRef}
                    initialValue={content || ""}
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    autofocus={false}
                    height="600px"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default RTEField;


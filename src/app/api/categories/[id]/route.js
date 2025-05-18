// api/categories/[id]/route.js
import { db } from "@/lib/firebase/firebase-client";
import { Timestamp, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;
    try {
        const snap = await getDoc(doc(db, `categories/${id}`));
        const cat = snap.data();
        return NextResponse.json({ data: cat });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 404 });
    }
}

export async function PUT(request, { params }) {
    const { id } = params;
    try {
        const { data, imageUrl } = await request.json();

        const updatePayload = {
            ...data,
            timestamp: Timestamp.now(),
        };

        if (imageUrl) {
            updatePayload.imageURL = imageUrl;
        }

        const firestoreRef = doc(db, `categories/${id}`);
        await updateDoc(firestoreRef, updatePayload);

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        await deleteDoc(doc(db, `categories/${id}`));
        return NextResponse.json(null, { status: 204 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

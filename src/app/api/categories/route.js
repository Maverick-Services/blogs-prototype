// api/categories/route.js
import { db } from "@/lib/firebase/firebase-client";
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const q = query(collection(db, "categories"), orderBy("timestamp", "desc"));
        const snaps = await getDocs(q);
        const list = snaps.docs.map((doc) => doc.data());
        return NextResponse.json({ data: list });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { data, imageUrl } = await request.json();

        const firestoreRef = doc(db, `categories/${data.slug}`);
        const existingDoc = await getDoc(firestoreRef);
        if (existingDoc.exists()) {
            throw new Error("Slug already exists. Please choose a unique slug.");
        }

        await setDoc(firestoreRef, {
            ...data,
            imageURL: imageUrl,
            timestamp: Timestamp.now(),
        });

        await updateDoc(firestoreRef, { id: firestoreRef.id });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}

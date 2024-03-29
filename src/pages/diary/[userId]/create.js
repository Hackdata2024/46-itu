// pages/diary/[userId]/create.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';
import Head from "next/head";

const CreateDiaryPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useAuth();

    const handleCreateDiary = async (e) => {
        e.preventDefault();
        try {
            const db = getFirestore();
            const diariesRef = collection(db, 'users', userId, 'diaries');
            await addDoc(diariesRef, {
                title,
                content,
                createdAt: new Date(),
                createdBy: user.uid, // Assuming you have access to the current user
            });
            router.push(`/diary/${userId}`);
        } catch (error) {
            console.error('Error creating diary:', error);
        }
    };

    return (
        <>
        <Head>
          <title>Dear Diary</title>
          <meta name="description" content="A version of yourself" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/dearDiary.ico" />
        </Head>
        <Layout>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="container">
                    <h1>Create Diary Entry</h1>
                    <form onSubmit={handleCreateDiary}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Content:</label>
                            <textarea className="form-control" rows="15" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <p> </p>
                        <button className="btn btn-primary create-btn" type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</Layout>

        </>
    );
};

export default CreateDiaryPage;

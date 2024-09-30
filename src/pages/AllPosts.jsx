import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Postcard, Container } from '../components/index';

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await appwriteService.getPosts();
            if (response) {
                setPosts(response.documents);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>
                <div className="flex flex-wrap">
                    {posts.length === 0 ? (
                        <div className="w-full text-center text-gray-500">
                            <p>No posts available.</p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                <Postcard {...post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;

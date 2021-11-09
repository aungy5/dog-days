import React from 'react';
import { useQuery } from '@apollo/client';

import PostList from '../components/postList/postList'
import PostForm from '../components/postForm/postForm'

import { QUERY_POSTS } from '../utils/queries'

const Post = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    return (
        <div className="top-level">
            <div className="post-list">
                {loading ? (
                    <div>LOADING...</div>
                ) : (
                    <PostList 
                    posts={posts}
                    />
                )}
            </div>
            <div className="post-form">
                <PostForm />
            </div>
        </div>
    )
}

export default Post;
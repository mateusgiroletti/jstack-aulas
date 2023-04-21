import React from 'react';

import { Container } from './styles';
import PostItem from './PostItem';

import posts from './posts';

export default function Posts() {
    return (
        <Container>
            {posts.map((post) => (
                <PostItem
                    key={post.id}
                    title={post.title}
                    description={post.description}
                />
            ))}
        </Container>
    );
}
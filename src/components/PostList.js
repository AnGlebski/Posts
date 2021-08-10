import React from 'react';
import PostItem from './PostItem';

const PostList = ({posts, title, remove}) => {
  if (!posts.length) {
    return (
      <h2>Посты не найдены</h2>
    )
  }

  return (
    <div>
      <h1>{title}</h1>
      {posts.map((post, index) =>
        <PostItem remove={remove} post={post} key={post.id} number={index + 1} />
      )}
    </div>
  );
};

export default PostList;

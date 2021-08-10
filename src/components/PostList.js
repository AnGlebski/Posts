import React from 'react';
import PostItem from './PostItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const PostList = ({posts, title, remove}) => {
  if (!posts.length) {
    return (
      <h2>Посты не найдены</h2>
    )
  }

  return (
    <div>
      <h1>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem
              remove={remove}
              post={post}
              number={index + 1} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default PostList;

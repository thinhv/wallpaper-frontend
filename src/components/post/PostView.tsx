import React from 'react';
import styled from 'styled-components';

import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostCaption from './PostCaption';
import { Post } from './post.type';

interface Props {
  post: Post;
}

const PostView: React.FC<Props> = ({ post }) => {
  return (
    <Wrapper>
      <PostHeader user={post.postedByUser} />
      <PostImage imageUrl={post.imageUrl} caption={post.description} />
      <PostCaption post={post} />
    </Wrapper>
  );
};

const Wrapper = styled.article`
  flex-direction: column;
  padding-top: 0px;
  padding: 0;
  background: #fff;

  @media (min-width: 640px) {
    margin-bottom: 60px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    background-color: rgba(var(--d87, 255, 255, 255), 1);
    margin-left: -1px;
    margin-right: -1px;
  }
`;

export default React.memo(PostView);

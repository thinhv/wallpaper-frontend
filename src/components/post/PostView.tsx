import React from 'react';
import styled from 'styled-components';

import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostCaption from './PostCaption';
import { Post } from './post.type';

const Wrapper = styled.article`
  flex-direction: column;
  padding-top: 0px;
  padding: 0;
  background: #fff;

  @media (min-width: 640px) {
    margin-bottom: 60px;
    margin-left: -1px;
    margin-right: -1px;
  }
`;


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
export default React.memo(PostView);

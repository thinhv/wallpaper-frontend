import React from 'react';
import styled from 'styled-components';

import Photo from './Photo';
import { Post } from '../post/post.type';

interface Props {
  posts: Post[];
}

const GalleryView: React.FC<Props> = ({ posts }) => {
  return (
    <Wrapper>
      <div className="gallery">
        {posts.map(post => {
          return (
            <Photo
              key={post._id}
              imageUrl={post.imageUrl}
              likes={post.likedByUsers ? post.likedByUsers.length : 0}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -1rem -1rem;
  padding-bottom: 3rem;
`;

export default GalleryView;

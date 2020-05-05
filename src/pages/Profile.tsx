import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Header from '../components/profile/Header';
import Gallery from '../components/profile/GalleryView';
import Error from './Error';
import { UserProfilePost } from '../components/post/post.type';

interface Props {
  id: string;
}

const POSTS_BY_USER_ID = gql`
  query UserProfile($username: String!) {
    userProfile(username: $username) {
      user {
        id
        profileImageUrl
        firstName
        lastName
        bio
        username
      }
      posts {
        _id
        description
        imageUrl
        postedByUser {
          id
          username
          profileImageUrl
          firstName
          lastName
          bio
        }
        likedByMe
        likedByUsers
      }
    }
  }
`;

const Profile: React.FC<Props> = ({ id }: Props) => {
  const { loading, error, data } = useQuery<{ userProfile: UserProfilePost }>(
    POSTS_BY_USER_ID,
    {
      variables: { username: id },
    }
  );

  if (error) return <Error />;
  if (loading || !data) return <p>Loading...</p>;

  console.log('id', id);
  return (
    <Wrapper>
      <Header user={data.userProfile.user} />
      <GalleryWrapper>
        <Gallery posts={data.userProfile.posts} />
      </GalleryWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  position: relative;
  width: 100%;
  flex-direction: column;
`;

const GalleryWrapper = styled.div`
  max-width: 960px;
  align-self: center;
`;

export default React.memo(Profile);

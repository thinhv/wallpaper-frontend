import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// import { useTheme } from '../constants/theme';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Post } from '../components/post/post.type';
import Error from './Error';
import PostView from '../components/post/PostView';
import Profile from './Profile';


const PostWrapper = styled.div`
  flex-direction: column;
  padding-top: 0px;
  align-items: stretch;
  border: 0 solid #000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  order: 4;
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  width: 100%;
`;

const POSTS = gql`
  {
    posts(limit: 100) {
      _id
      imageUrl
      description
      createdAt
      postedByUser {
        id
        username
        profileImageUrl
      }
      likedByUsers
      likedByMe
    }
  }
`;

const Home = ({ match }: RouteComponentProps<{ profileId: string }>) => {
  const { profileId } = match.params;

  const { loading, error, data } = useQuery<{ posts: Post[] }>(POSTS);
  if (profileId) return <Profile id={profileId} />;

  if (loading) return <p>Loading...</p>;
  if (error) return <Error />;

  // const theme = useTheme();

  return (

  );
};

export default withRouter(Home);

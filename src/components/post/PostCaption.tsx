import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LikeButton } from '../common';
import { Post } from './post.type';

const LIKE_POST = gql`
  mutation($id: String) {
    likePost(id: $id) {
      _id
      likedByUsers
    }
  }
`;

interface LikePostType {
  id: string;
}

interface Props {
  post: Post;
}

const PostCaption: React.FC<Props> = ({ post }) => {
  const [isLiked, setIsLike] = React.useState(!!post.likedByMe);
  const [likeCount, setLikeCount] = React.useState(
    post.likedByUsers ? post.likedByUsers.length : 0
  );

  const [likePost] = useMutation(LIKE_POST);
  const sendLikePost = (variables: LikePostType) => {
    return likePost({
      variables,
    });
  };

  const handleLikePost = async (e: any) => {
    e.preventDefault();
    setLikeCount(likeCount + 1);
    setIsLike(!isLiked);
    try {
      const { data } = await sendLikePost({
        id: post._id,
      });
      console.log(data.likePost);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper className="section">
      <ButtonSection>
        <LikeButton isLiked={isLiked} onClick={handleLikePost} />
      </ButtonSection>
      <LikeCountSection>{likeCount} likes</LikeCountSection>
      <Caption>{post.description}</Caption>
      {post.createdAt && (
        <CaptionSection>
          <PostDate>{moment(parseInt(post.createdAt)).fromNow()}</PostDate>
        </CaptionSection>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 0;
`;

const CaptionSection = styled.section`
  padding-left: 16px;
  padding-right: 16px;
`;

const ButtonSection = styled(CaptionSection)`
  margin-top: 4px;
  flex-direction: row;
`;

const LikeCountSection = styled(CaptionSection)`
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const Caption = styled(CaptionSection)`
  margin-bottom: 8px;
  flex: 0 0 auto;
  justify-content: flex-start;
`;

const PostDate = styled.div`
  color: rgba(var(--f52, 142, 142, 142), 1);
  margin-bottom: 15px;
  text-transform: uppercase;
  font-size: 14px;
`;

export default PostCaption;

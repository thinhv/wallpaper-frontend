import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LikeButton } from '../common';
import { Post } from './post.type';

export default PostCaption;

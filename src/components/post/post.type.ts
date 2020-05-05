import { User } from '../../user/user.type';

export interface Post {
  _id: string;
  imageUrl: string;
  description: string;
  likedByUsers?: string[];
  postedByUser: User;
  likedByMe?: boolean;
  createdAt?: string;
}

export interface UserProfilePost {
  posts: Post[];
  user: User;
}

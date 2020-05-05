export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified?: boolean;
  bio?: string;
  userType?: string;
  profileImageUrl: string;
  token?: string;
}

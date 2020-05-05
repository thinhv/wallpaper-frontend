export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  profileImageUrl: string;
  bio?: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio?: String;
}

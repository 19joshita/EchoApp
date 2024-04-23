export type RegiterType = {
  name: string;
  email: string;
  password: string;
  phoneNo?: string;
  confirmpassword?: string;
};
export type LoginType = {
  email: string;
  password: string;
};
export type AuthData = {
  user: any | null;
  token: string |null;
};

export type AuthContextType = {
  authData: AuthData;
  setAuthData: any;
  // updateAuthData: (newAuthData: AuthData) => void;
  // logout: () => void;
};
export type ContextType = {
  children: React.ReactNode;
  // navigation:any
};
export type createPostType = {
  title: string,
  description: string
}
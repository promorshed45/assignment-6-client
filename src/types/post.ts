export interface IComment {
    authorId: string;
    content: string;
    _id: string;
  }

  
export interface IInput {
    required?: boolean;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    size?: "sm" | "md" | "lg";
    type?: string;
    label: string;
    name: string;
    disabled?: boolean;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
      accessToken: string;
      refreshToken: string;
    };
  }
  
  export interface IUser {
    _id: string;
    name: string;
    role: string;
    email: string;
    status: string;
    mobileNumber?: string;
    profilePhoto?: string;
    verified: string;
    // flower: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  // export interface IPost {
  //   _id?: string;
  //   user: string[];
  //   images?: string[];
  //   title: string;
  //   description: string;
  //   comments?: string[];
  //   status: string;
  //   report?: string[];
  //   reportCount: number;
  //   Upvotes: string;
  //   downvotes: string;
  // }
  
  export interface TPost {
    _id: string;
    user: IUser;
    images: string;
    category: string;
    postContent: string;
    type: string;
    like: [string];
    comment: [IComment] | [];
    share: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    __v: number;
  }

  export interface IParamsProps {
    params: {
      id: string;
    };
  }
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


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
  mobileNumber?: string;  // This can be optional
  profilePhoto?: string;
  verified: string;
  flower: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  _id?: string;
  user: string[]; 
  images?: string[];
  title: string;
  description: string;
  comments?: string[];
  status: string;
  report?: string[];
  reportCount: number;
  Upvotes: string;
  downvotes: string;
}
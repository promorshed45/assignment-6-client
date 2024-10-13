export type TError = {
  data: {
    success: boolean;
    message: string;
    status: number;
  };
};
export type TResponse<T> = {
  data?: T;
  error?: TError;
  message: string;
  statusCode: number;
  success: boolean;
};

export type TFollow = {
  followingId: string;
  followerId: string;
  status?: string;
};

export interface ISearchResult {
  title: string;
  description: string;
  thumbnail: string;
  id: string;
}

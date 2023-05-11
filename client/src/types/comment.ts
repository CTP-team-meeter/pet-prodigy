export type Comment = {
  _id: string;
  comment: string;
  replies: Array<string>;
  user: {
    username: string;
    _id: string;
  };
};
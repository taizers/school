export type UserType = {
  id: string;
  username: string;
  email: string;
  role: string;
  post: string;
  avatar: string | null;
  phone?: string;
  activationkey?: string;
  group: {
    id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type SignUpUserType = {
  username?: string;
  email: string;
  password: string;
  activationkey: string;
};

export type UpdateUserType = {
  id: string;
  username?: string;
  new_password?: string;
  old_password?: string;
};

export type AuthorType = {
  name: string;
  uri: string;
};

export type DownloadsType = {
  link: string;
  type: string;
};

export type BookType = {
  author: Array<AuthorType>;
  title: string;
  updated: string;
  cover?: string;
  categories: Array<string>;
  downloads: Array<DownloadsType>;
  description: string;
};

export type AuthorRType = {
  author: Array<AuthorType>;
  title: string;
  updated: string;
  cover?: string;
  categories: Array<string>;
  downloads: Array<DownloadsType>;
  description: string;
};

export type BookInfoType = {
  id: number;
  title: string;
  author: string;
};

export type BookFileType = {
  id: string;
  file: Buffer;
  fileName: string;
  filePath?: string;
};

export type UsersType = Array<UserType>;
export type BooksType = Array<BookType>;
export type BooksResponceType = {
  items: Array<BookType>;
  currentPage: number;
  totalCountItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

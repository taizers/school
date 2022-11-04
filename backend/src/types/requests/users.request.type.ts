import { Request } from 'express';

export interface SearchMembersRequest extends Request {
  query: {
    query: string;
  };
}

export interface createUserRequest extends Request {
  body: {
    username?: string;
    role: string;
    post?: string;
    group_id?: number;
  };
}

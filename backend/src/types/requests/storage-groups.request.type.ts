import { Request } from 'express';

export interface CreateStorageGroupRequest extends Request {
  body: {
    title: string;
  };
}

export interface UpdateStorageGroupRequest extends Request {
  body: {
    title: string;
  };
  params: {
    id: string;
  };
}


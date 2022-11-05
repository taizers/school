import dotenv from 'dotenv';
dotenv.config();

import { avatarsPath } from '../constants';
import { UserType } from '../types/entities/global.entities.type';

export default class UserDto {
  id;
  email;
  username;
  avatar;
  post;
  role;
  group_id;
  created_at;
  updated_at;

  constructor(model: UserType) {
    this.id = model.id;
    this.email = model.email;
    this.post = model.post;
    this.role = model.role;
    this.group_id = model.group_id;
    this.avatar = model.avatar;
    this.username = model.username;
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
  }
}

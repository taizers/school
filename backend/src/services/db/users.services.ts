// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Note, User, Group } = require('../../db/models/index');

import UserDto from '../../dtos/user.dto';
import Sequelize = require('sequelize');
import { UserType } from '../../types/entities/global.entities.type';
import {
  EntityNotFoundError,
  ResourceNotFoundError,
} from '../../helpers/error';

const Op = Sequelize.Op;

export const getUser = async (where: object) => {
  const user = await User.findOne({
    where,
    row: true,
  });

  if (!user) {
    throw new ResourceNotFoundError('User');
  }

  return user;
};

export const findUser = async (where: object) => {
  const user = await User.findOne({
    where,
    row: true,
    include: [
      {
        model: Group,
        as: 'users'
      },
    ],
    attributes: {
      exclude: ['password', 'activationkey'],
    },
  });

  let dtosUser;

  if (user) {
    dtosUser = new UserDto(user);
  }

  return dtosUser;
};

export const findPaginatedUsers = async (page: number, limit: number) => {
  const { count, rows } = await User.findAndCountAll({
    offset: page * limit,
    row: true,
    include: [
      {
        model: Group,
        as: 'users'
      },
    ],
    attributes: {
      exclude: ['password'],
    },
    order: [['created_at', 'DESC']],
  });


  const users = rows.map((item: any) => {
    const dtosUser = new UserDto(item);

    return { activationkey: item.activationkey, ...dtosUser };
  })

  return { totalPages: Math.ceil(count / limit), page: page + 1, users };
};

export const findUsers = async (where: object) => {
  const users = await User.findAll({
    where,
    attributes: {
      exclude: ['password', 'activationkey'],
    },
  });

  const dtosUsers = users?.map((user: UserType) => new UserDto(user));

  return dtosUsers;
};

export const updateUser = async (id: string, payload: object) => {
  let user;

  console.log(payload)

  try {
    user = await User.update(payload, {
      where: { id },
      returning: true,
      plain: true,
      include: [
        {
          model: Group,
          as: 'users'
        },
      ],
      attributes: {
        exclude: ['password', 'activationkey'],
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Could not update user');
  }

  return new UserDto(user[1]);
};

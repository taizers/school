// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Group, User } = require('../../db/models/index');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Op } = require("sequelize");
import {
  ResourceNotFoundError,
  EntityNotFoundError,
  DontHaveAccessError,
} from '../../helpers/error';

export const checkGroup = async (
  where: object,
) => {
  const group = await Group.findOne({where});

  // if (!group) {
  //   throw new ResourceNotFoundError('Group');
  // }
  return group;
};

export const findGroup = async (where: object) => {
  const group = await Group.findOne({
    where,
    include: [
      {
        model: User,
        as: 'users',
      },
    ],
    row: true,
  });

  if (!group) {
    throw new ResourceNotFoundError('Группа');
  }

  return group;
};

export const findGroups = async () => {
  const groups = await Group.findAll({
    where: { title: {[Op.not]: 'Администрация',} },
    include: [
      {
        model: User,
        as: 'users',
      },
    ],
    row: true,
  });

  if (!groups.length) {
    throw new ResourceNotFoundError('Группы');
  }

  return groups;
};

export const findGroupsList = async () => {
  const groups = await Group.findAll({
    row: true,
  });

  if (!groups.length) {
    throw new ResourceNotFoundError('Группы');
  }

  return groups;
};

export const createGroup = async (payload: object) => {
  let group;

  try {
    group = await Group.create(payload);
  } catch (error) {
    throw new Error('Группа не создана');
  }

  return group;
};

export const deleteGroup = async (id: string) => {
  const result = await Group.destroy({ where: { id } });

  if (result === 0) {
    throw new EntityNotFoundError(id, 'Группа');
  }
};

// export const findUserGroups = async (userId: string) => {
//   const checklists = await Group.findAll({
//     where: { owner_id: userId },
//     include: [
//       {
//         model: Groupitem,
//         as: 'items',
//       },
//     ],
//   });

//   return checklists;
// };

export const updateGroup = async (
  id: string,
  payload: object,
) => {
  const group = await Group.update(payload, {
    where: { id },
  });

  return group[1];
};

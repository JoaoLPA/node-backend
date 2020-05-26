import path from 'path';
import fs from 'fs';

import { getRepository } from 'typeorm';
import { directory } from '../config/upload';

import User from '../models/Users';

interface Request {
  userId: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('Need to authenticate');
    }

    if (user.avatar) {
      const userAvatarPath = path.join(directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarPath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);
    delete user.password;

    return user;
  }
}

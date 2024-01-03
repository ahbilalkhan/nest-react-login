import {HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import {getPassword} from "../../utils/auth";
import {logger} from "../../utils/logger";
 import { errorModel } from '../../utils/errorModel'
import {createUserSchema} from "../validations/schemas/user";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    logger.info(
      `userService: [createUser] started executing ${Date()}`
    );
    try {
      const { error, value } = createUserSchema.validate(user);
      if (error) {
        logger.error(`userService: [createUser] Joi Validation Failed ${Date()}`);
        return Promise.reject(errorModel(error.message, HttpStatus.BAD_REQUEST, true));
      }
      const hashedPassword = await getPassword(value.password);
      const createUserPayload = {
        name: value.name,
        email: value.email,
        password: hashedPassword
      };

      const createdUser = new this.userModel(createUserPayload);
      return await createdUser.save();
    } catch (error: any) {
      logger.error(`userService: [createUser] error: ${error} ${Date()}`);
      return Promise.reject(errorModel(error.message, HttpStatus.INTERNAL_SERVER_ERROR, true));
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}

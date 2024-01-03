import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from "./dto/signin.dto";
import { logger } from '../../utils/logger'
import { responseModel } from '../../utils/responseModel'
import {checkPassword, getToken} from '../../utils/auth'
import {loginSchema} from "../validations/schemas/user";
import {errorModel} from "../../utils/errorModel";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    logger.info(
      `userController: [signup] started executing signup ${Date()}`
    );
    try {
      // Validate password requirements here

      // Check if user with the same email already exists
      const existingUser = await this.userService.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
      }

      // Create the user
      const createdUser = await this.userService.create(createUserDto);

      return responseModel('User created successfully');
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    try {
      logger.info(
        `userController: [sign] started executing signin ${Date()}`
      );
      logger.info(`authService: [verifyAuthPayload] performing Joi validation ${Date()}`);
      const { error, value } = loginSchema.validate(signInDto);
      if (error) {
        logger.error(`authService: [login] Joi Validation Failed ${Date()}`);
        return Promise.reject(errorModel(error.message, HttpStatus.BAD_REQUEST, true));
      }

      logger.info(`authService: [login] performing login operation ${Date()}`);
      // Find the user by email
      const user = await this.userService.findByEmail(value.email);
      console.log(user)
      // Check if the user exists
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      // Check if the password is correct
      const isPasswordValid = await checkPassword(value.password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const token = getToken(user);
      const userDTO = { name: user.name, email: user.email };
      const response = { user: userDTO, token };
      return responseModel(response);
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

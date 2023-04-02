import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IUser } from 'src/user/user.interface';
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private userModel: Model<IUser>) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const hashSalt = process.env.HASH_SALT;
    const hashedPassowrd = await bcrypt.hash(createUserDto.password, hashSalt);

    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassowrd,
    };
    const newUser = await new this.userModel(userWithHashedPassword);
    return newUser.save();
  }
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true }
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }
  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException("Users data not found!");
    }
    return userData;
}
async getUser(userId: string): Promise<IUser> {
   const existingUser = await     this.userModel.findById(userId).exec();
   if (!existingUser) {
    throw new NotFoundException(`User #${userId} not found`);
   }
   return existingUser;
}

async getUserByUsername(username: string) {
  const existingUser = await this.userModel.findOne({username});
  if (!existingUser) {
    throw new NotFoundException(`User #${username} not found`);
   }
   return existingUser;
}

async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deletedUser;
  }
}

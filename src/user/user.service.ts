import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

// @Injectable({ scope: Scope.REQUEST }) // 请求级别，每个请求创建一个实例
// @Injectable({ scope: Scope.TRANSIENT }) // 瞬态级别，每次注入都创建新实例
// @Injectable({ scope: Scope.DEFAULT }) // 标记为可注入的服务，默认作用域为请求作用域
@Injectable() // 标记为可注入的服务
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // 查询所有文档
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // 根据ID查询单个文档
  findOne(id: number): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // 创建单个文档
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  // 根据邮箱查询单个文档
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // 根据ID查询单个文档
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // 更新单个文档
  async update(id: string, updateUserDto: CreateUserDto): Promise<User | null> {
    // { new: true } 选项返回更新后的文档
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  // 删除单个文档
  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}

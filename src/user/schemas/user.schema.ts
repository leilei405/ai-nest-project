import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
})
export class User extends Document {
  @Prop({
    type: String, // 用户名
    required: true, // 用户名必填
    unique: true, // 用户名唯一
    lowercase: true, // 转换为小写
    trim: true, // 去除首尾空格
    minlength: 3, // 最小长度为3
    maxlength: 50, // 最大长度为50
  })
  username: string;

  @Prop({
    required: true, // 邮箱必填
    unique: true, // 邮箱唯一
    lowercase: true, // 转换为小写
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email is invalid',
    ], // 匹配邮箱正则表达式
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6, // 最小长度为6
    maxlength: 20, // 最大长度为20
  })
  password: string;

  @Prop({ type: Number, min: 0, max: 150 })
  age: number;

  @Prop({ type: String, default: 'active', enum: ['active', 'inactive'] })
  status: string;

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

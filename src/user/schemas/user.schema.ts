import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 地址的子schema
export class Address {
  @Prop()
  street: string; // 街道

  @Prop()
  city: string; // 城市

  @Prop()
  country: string; // 国家

  @Prop()
  zipcode: string; // 邮政编码
}

const AddressSchema = SchemaFactory.createForClass(Address);

// 个人信息
Schema({
  _id: false, // 阻止嵌套文档创建默认的 _id 字段
});
export class Profile {
  @Prop()
  bio: string; // 个人简介

  @Prop()
  phone: string; // 手机号

  @Prop()
  avatar: string; // 头像
}

@Schema({
  timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
  toJSON: { virtuals: true },
})
export class User extends Document {
  // 用户名
  @Prop({
    type: String, // 用户名
    required: true, // 用户名必填
    unique: true, // 用户名唯一
    lowercase: true, // 转换为小写
    trim: true, // 去除首尾空格
    minlength: 3, // 最小长度为3
    maxlength: 50, // 最大长度为50
    validate: {
      validator: (val: string) => /^[a-zA-Z0-9_]+$/.test(val),
      message: 'Username is invalid',
    }, // 用户名只能包含字母、数字和下划线 @.
  })
  username: string;

  // 邮箱
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

  // 密码
  @Prop({
    required: true,
    minlength: 6, // 最小长度为6
    maxlength: 20, // 最大长度为20
  })
  password: string;

  // 年龄
  @Prop({ type: Number, min: 0, max: 150 })
  age: number;

  // 地址
  @Prop({ type: AddressSchema })
  address: Address;

  // 名
  @Prop()
  firstName: string;

  // 最后名
  @Prop()
  lastName: string;

  // 登录次数
  @Prop({ type: Number, default: 0 })
  loginCount: number;

  // 最后登录时间
  @Prop()
  lastLoginAt: Date;

  // 个人信息
  @Prop({ type: Profile })
  profile: Profile;

  // 状态
  @Prop({ type: String, default: 'active', enum: ['active', 'inactive'] })
  status: string;

  // 是否是管理员
  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  // 虚拟字段：账号是否为活跃用户
  readonly isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('isActive').get(function () {
  return this.status === 'active';
});

// 创建索引
UserSchema.index({ username: 1, email: 1 });
UserSchema.index({ status: 1 });

// 创建虚拟字段 fullName，将 firstName 和 lastName 拼接起来
// UserSchema.virtual('fullName').get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

// UserSchema.virtual('fullName').set(function (name: string) {
//   const [firstName, lastName] = name.split(' ');
//   this.firstName = firstName;
//   this.lastName = lastName;
// });

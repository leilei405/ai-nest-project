import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  // 导入其他模块
  imports: [
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
  ],
  // 控制器只处理HTTP请求，不处理业务逻辑  业务逻辑在Service层进行处理
  controllers: [UserController],
  // 提供UserService，使其他模块可以注入使用
  providers: [UserService],
  // 导出UserService，使其他模块可以注入使用
  exports: [UserService],
})
export class UserModule {}

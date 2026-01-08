import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [], // 导入其他模块
  controllers: [UserController], // 控制器只处理HTTP请求，不处理业务逻辑  业务逻辑在Service层进行处理
  providers: [UserService], // 提供UserService，使其他模块可以注入使用
  exports: [UserService], // 导出UserService，使其他模块可以注入使用
})
export class UserModule {}

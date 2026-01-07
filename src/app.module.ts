import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块，其他模块可以直接使用 ConfigService
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // 引入 ConfigModule，确保环境变量可用
      // useFactory 异步工厂函数，用于创建 Mongoose 连接选项
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get('MONGODB_URI') ||
          'mongodb://localhost:27017/ai-project',
      }),
      inject: [ConfigService], // 注入 ConfigService
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

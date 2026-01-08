import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { InterviewController } from './interview/interview.controller';
import { PaymentController } from './payment/payment.controller';
import { InterviewModule } from './interview/interview.module';
import { PaymentModule } from './payment/payment.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    // 全局配置模块
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块，其他模块可以直接使用 ConfigService
    }),
    // 数据库模块
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
    // 用户模块
    UserModule,
    // 面试模块
    InterviewModule,
    // 支付模块
    PaymentModule,
    // 共享模块
    SharedModule,
  ],
  controllers: [AppController, InterviewController, PaymentController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule], // 导入 UserModule 以使用 UserService
  providers: [InterviewService], // 提供InterviewService，使其他模块可以注入使用
  exports: [InterviewService], // 导出InterviewService，使其他模块可以注入使用
})
export class InterviewModule {}

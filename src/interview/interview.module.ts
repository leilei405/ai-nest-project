import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';

@Module({
  imports: [], // 导入其他模块
  providers: [InterviewService], // 提供InterviewService，使其他模块可以注入使用
  exports: [InterviewService], // 导出InterviewService，使其他模块可以注入使用
})
export class InterviewModule {}

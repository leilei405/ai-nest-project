import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Module({
  imports: [], // 导入其他模块
  providers: [PaymentService], // 提供PaymentService，使其他模块可以注入使用
  exports: [PaymentService], // 导出PaymentService，使其他模块可以注入使用
})
export class PaymentModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InterviewService {
  constructor(private readonly userService: UserService) {} // 注入UserService

  async createInterview(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`用户不存在 ${userId}`);
    }
    return {
      userId,
      status: 'pending',
      createdAt: new Date(),
    };
  }
}

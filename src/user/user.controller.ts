import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { User } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK) // 设置 HTTP 状态码为 200
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK) // 设置 HTTP 状态码为 200
  findOne(@Param('id', ParseIntPipe) id: number): User | undefined {
    console.log(id, typeof id);
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // 设置 HTTP 状态码为 201
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: CreateUserDto,
  ): User {
    const user = this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 设置 HTTP 状态码为 204 无内容
  remove(@Param('id', ParseIntPipe) id: number): void {
    const isRemoved = this.userService.remove(id);
    if (!isRemoved) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}

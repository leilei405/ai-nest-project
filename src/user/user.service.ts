import { Injectable, Scope } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

// @Injectable({ scope: Scope.REQUEST }) // 请求级别，每个请求创建一个实例
// @Injectable({ scope: Scope.TRANSIENT }) // 瞬态级别，每次注入都创建新实例
// @Injectable({ scope: Scope.DEFAULT }) // 标记为可注入的服务，默认作用域为请求作用域
@Injectable() // 标记为可注入的服务
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    };
    console.log(newUser);
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: Omit<User, 'id'>): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    const updatedUser: User = {
      id,
      ...user,
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  remove(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }
}

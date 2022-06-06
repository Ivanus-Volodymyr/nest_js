import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  private users = [];

  getAll(): CreateUserDto[] {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((value) => value.id === +id);
  }

  createUser(user: CreateUserDto): CreateUserDto {
    const createdUser = { ...user, id: new Date().valueOf() };
    this.users.push(createdUser);
    return createdUser;
  }

  deleteUserByID(id: string): void {
    const index = this.users.findIndex((value) => value.id === id);
    this.users.splice(index, 1);
  }

  updateUser(user: Partial<CreateUserDto>, id: string): CreateUserDto {
    const find = this.users.find((value) => value.id == id);
    return Object.assign(find, user);
  }
}

import { RolDTO } from "./rol.model";

export interface User{
  userId: string;
  entityId: string;
  rolId: string;
  userName: string;
  email: string;
  password: string;
}

export interface CreateUserDTO extends Omit<User, 'userId'>{}

export interface UserDTO extends Omit<User, 'rolId'>{
  rol: RolDTO
}



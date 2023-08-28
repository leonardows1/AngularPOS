import { User } from "./user.model";

export interface Rol{
  rolId: string,
  name: string,
  users?: User[],
}

export interface RolDTO extends Rol{};

export interface CreateRolDTO extends Omit<RolDTO, 'rolId'>{};



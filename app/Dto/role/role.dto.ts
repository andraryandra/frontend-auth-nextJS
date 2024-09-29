// role.dto.ts
export interface RoleDto {
  id: string;
  name: string;
  description: string;
}

export interface CreateRoleDto {
  name: string;
  description: string;
}

export type UpdateRoleDto = CreateRoleDto

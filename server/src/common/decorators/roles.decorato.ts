import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../api/user/enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[] | string[]) =>
  SetMetadata(ROLES_KEY, roles);

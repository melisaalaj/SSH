import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRoles } from "src/api/user/enums/roles.enum";
import { UserService } from "src/api/user/user.service";
import { ROLES_KEY } from "../decorators/roles.decorato";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly userService: UserService,) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    
      if (!requiredRoles) {
        return true;
      }
    
      const request = context.switchToHttp().getRequest();
      const email = request.user.email;
      const user = await this.userService.findByEmail(email);
    
      // Check if the user's role is included in the requiredRoles array
      return requiredRoles.includes(user.role);
    }
    
}
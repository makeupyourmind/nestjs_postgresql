import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
  
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;
    
    const hasRole = () => roles.includes(user.role); 
 
    if(user && user.role && hasRole()){
        return true
    }

    throw new HttpException('You do not have permission (Roles)', HttpStatus.FORBIDDEN);
  }

}
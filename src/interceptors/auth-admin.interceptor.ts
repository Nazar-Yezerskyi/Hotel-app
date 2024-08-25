import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/user/user.service'; 

@Injectable()
export class AuthAdminInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session || !session.idusers) {
      throw new UnauthorizedException('User is not logged in');
    }
    console.log(session.roleId)
    if (session.roleId  !== 2){
        throw new ForbiddenException('User is not staff');
    }

    const user = await this.userService.getUserWithPosition(session.idusers);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log(user.position.positionName)
    if (!user.position || user.position.positionName !== 'менеджер') {
      throw new ForbiddenException('User does not have the required position');
    }

    return next.handle();
  }
}

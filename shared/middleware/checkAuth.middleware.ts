import { Injectable, NestMiddleware, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../src/user/user.service';
import * as jwt from 'jsonwebtoken';
import config from '../../config/keys'

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(@Req() req: Request, res: Response, next: Function) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, config.secretKey);
      console.log("DECODED : ", decoded);
      const user = await this.userService.findById(decoded.id);
      console.log("user : ", user)
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
      next();
    } else {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
import { Injectable, NestMiddleware, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../src/user/user.service';
import * as jwt from 'jsonwebtoken';
import config from '../../config/keys'
import { TicketService } from 'src/ticket/ticket.service';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService
  ) {}

  async use(@Req() req: Request, res: Response, next: Function) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, config.secretKey);
      const user = await this.userService.findById(decoded.id);
      const ticket: any = await this.ticketService.findById(req.params.id);
      //console.log("ticket.user.id != user.id : ", ticket.user.id != user.id)
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      if(ticket.user.id != user.id){
        throw new HttpException('You are not owner',HttpStatus.FORBIDDEN);
      }

      next();
    } else {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
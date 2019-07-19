import { Injectable, NestMiddleware, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {

  async use(@Req() req: Request, res: Response, next: Function) {
    console.log("REQ : ", req);
  }
}
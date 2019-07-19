import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Ticket } from './entity/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { CheckAuthMiddleware } from '../../shared/middleware/checkAuth.middleware';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket])
      ],
      controllers: [TicketController],
      providers: [TicketService],
      exports: [TicketService]
})
export class TicketModule {}
// export class TicketModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(CheckAuthMiddleware)
//       .forRoutes({ path: 'ticket/:id', method: RequestMethod.DELETE });
//   }
// }
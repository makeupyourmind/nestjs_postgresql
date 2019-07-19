import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { HallModule } from './hall/hall.module';
import { CheckAuthMiddleware } from '../shared/middleware/checkAuth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { TestMiddleware } from '../shared/middleware/test.middleware';
import { TicketController } from './ticket/ticket.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    HallModule,
    TicketModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      // .exclude(//исключить
      //   {path: 'tickets/:id', method: RequestMethod.DELETE}
      // )
      // .forRoutes(TicketController);
      .forRoutes(
        { path: 'tickets/:id', method: RequestMethod.DELETE }
      );
    // consumer
    //   .apply(TestMiddleware)
    //   .forRoutes({ path: 'halls', method: RequestMethod.GET })
  }
}

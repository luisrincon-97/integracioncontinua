import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppController from '../controllers/app.controller';
import GamesModule from './games.module';
import Game from '../entities/game.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE'),
        url: configService.get('DATABASE_URL'),
        entities: [ Game ],
        synchronize: true
      }),
      inject: [ ConfigService ]
    }),

    GamesModule
  ],
  controllers: [ AppController ],
})
export class AppModule {
}

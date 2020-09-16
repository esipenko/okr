import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Entities } from 'entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [TypeOrmModule.forFeature(Entities), PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

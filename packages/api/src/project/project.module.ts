import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from 'entities';
import { UserService } from 'src/user/user.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    imports: [TypeOrmModule.forFeature(Entities), PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [ProjectController],
    providers: [ProjectService, UserService],
})
export class ProjectModule {}

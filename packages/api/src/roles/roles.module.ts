import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from 'entities';
import { RoleGuard } from './guard/role.guard';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
    imports: [TypeOrmModule.forFeature(Entities), PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [RolesController],
    providers: [RolesService, RoleGuard],
    exports: [RolesService, RoleGuard],
})
export class RolesModule {}

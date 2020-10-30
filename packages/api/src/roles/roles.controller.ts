import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'entities';
import { CreateRoleDto, RoleDto } from './dto/role.dto';
import { RoleGuard } from './guard/role.guard';
import { RolesService } from './roles.service';
import { Request } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { ACLRule } from './acl.rules';
import { RoleControl } from './decorator/role.decorator';

@Controller('role')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @UseGuards(AuthGuard(), RoleGuard)
    @Post()
    @RoleControl(ACLRule.ROLES_CREATE)
    async createRole(@Body() createRoleDto: CreateRoleDto, @Req() req: Request): Promise<RoleDto> {
        const user = <UserEntity>req.user;
        const roleEntity = await this.roleService.createRole(createRoleDto, user.company.companyId);
        return new RoleDto(roleEntity);
    }

    @UseGuards(AuthGuard(), RoleGuard)
    @Post('/:role_id/assign/:user_id')
    @RoleControl(ACLRule.ROLES_ASSIGN)
    async assignRole(@Param('role_id') roleId: number, @Param('user_id') userId: number): Promise<UserDto> {
        const userEntity = await this.roleService.assignRole(userId, roleId);
        return new UserDto(userEntity);
    }
}

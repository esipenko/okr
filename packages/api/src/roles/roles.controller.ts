import { Body, Controller, Get, Param, Post, Req, UseGuards, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'entities';
import { CreateRoleDto, RoleDto } from './dto/role.dto';
import { RoleGuard } from './guard/role.guard';
import { RolesService } from './roles.service';
import { Request } from 'express';
import { RoleControl } from './decorator/role.decorator';
import { UserDto } from 'src/user/dto/user.dto';
import { ACLRule } from 'shared';

@Controller('role')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @UseGuards(AuthGuard(), RoleGuard)
    @Get()
    @RoleControl(ACLRule.ROLES_LIST)
    async getAvailableRoles(@Req() req: Request): Promise<RoleDto[]> {
        const user = <UserEntity>req.user;
        const roleEntities = await this.roleService.getAvailableRoles(user.company.companyId);
        return roleEntities.map((e) => new RoleDto(e));
    }

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

    @UseGuards(AuthGuard(), RoleGuard)
    @Delete('/:role_id')
    @RoleControl(ACLRule.ROLES_DELETE)
    async deleteRole(@Param('role_id') roleId: number, @Req() req: Request): Promise<RoleDto> {
        const user = <UserEntity>req.user;
        const roleEntity = await this.roleService.deleteRole(roleId, user.company.companyId);
        return new RoleDto(roleEntity);
    }

    @UseGuards(AuthGuard(), RoleGuard)
    @Put()
    @RoleControl(ACLRule.ROLES_UPDATE)
    async editRole(@Body() role: RoleDto): Promise<RoleDto> {
        const roleEntity = await this.roleService.editRole(role);
        return new RoleDto(roleEntity);
    }
}

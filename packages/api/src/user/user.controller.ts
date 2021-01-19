import { Controller, Post, Body, Get, Param, UseGuards, Req, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './dto/user-registatrion.dto';
import { Request } from 'express';
import { UserEntity } from 'entities';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { RoleControl } from 'src/roles/decorator/role.decorator';
import { RoleGuard } from 'src/roles/guard/role.guard';
import { ACLRule } from 'shared';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('registration')
    async registration(@Body() userRegistrationDto: UserRegistrationDto): Promise<UserDto> {
        const userEntity = await this.userService.createUser(userRegistrationDto);
        return new UserDto(userEntity);
    }

    @UseGuards(AuthGuard())
    @Get()
    async getCurrentUser(@Req() req: Request): Promise<UserDto> {
        const { user } = req;
        return new UserDto(user as UserEntity);
    }

    @UseGuards(AuthGuard(), RoleGuard)
    @RoleControl(ACLRule.USERS_LIST)
    @Get('/all')
    async getUsersByCompanyId(@Req() req: Request): Promise<UserDto[]> {
        const { user } = req;
        const userEntities = await this.userService.getUsersByCompanyId((user as UserEntity).company.companyId);
        return userEntities.map((userEntity) => new UserDto(userEntity));
    }

    @UseGuards(AuthGuard(), RoleGuard)
    @RoleControl(ACLRule.USERS_LIST)
    @Get('/:user_id')
    async getUserById(@Param('user_id') userId: number): Promise<UserDto> {
        const userEntity = await this.userService.getUserByUserId(userId);
        return new UserDto(userEntity);
    }

    @UseGuards(AuthGuard(), RoleGuard)
    @RoleControl(ACLRule.USERS_DELETE)
    @Delete('/:user_id')
    async deleteUserById(@Param('user_id') userId: number): Promise<UserDto> {
        const userEntity = await this.userService.deleteUserByUserId(userId);
        return new UserDto(userEntity);
    }

    @UseGuards(AuthGuard(), RoleGuard)
    @RoleControl(ACLRule.USERS_EDIT)
    @Put()
    async editUser(@Body() userDto: UserDto): Promise<UserDto> {
        const userEntity = await this.userService.updateUser(userDto);
        return new UserDto(userEntity);
    }
}

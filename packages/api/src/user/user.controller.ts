import { Controller, Post, Body, Res, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './dto/user-registatrion.dto';
import { Response } from 'express';
import { UserEntity } from 'entities';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('registration')
    registration(@Body() userRegistrationDto: UserRegistrationDto, @Res() res: Response): void {
        this.userService
            .createUser(userRegistrationDto)
            .then((userEntity: UserEntity) => {
                res.send(new UserDto(userEntity));
            })
            .catch((err) => {
                res.send(err.message);
            });
    }

    @UseGuards(AuthGuard())
    @Get('/:user_id')
    getUserById(@Param('user_id') userId: number, @Res() res: Response): void {
        this.userService
            .getUserByUserId(userId)
            .then((userEntity: UserEntity) => {
                res.send(new UserDto(userEntity));
            })
            .catch(() => {
                res.send('User does not exist');
            });
    }
}

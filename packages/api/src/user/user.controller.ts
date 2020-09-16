import { Controller, Post, Body, Res, Get, Param, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './dto/user-registatrion.dto';
import { Response, Request } from 'express';
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
                res.status(HttpStatus.OK).send(new UserDto(userEntity));
            })
            .catch(() => {
                res.status(HttpStatus.BAD_REQUEST).send('This email already taken');
            });
    }

    @UseGuards(AuthGuard())
    @Get()
    getCurrentUser(@Req() req: Request, @Res() res: Response): void {
        const { user } = req;
        if (user) {
            res.send(new UserDto(user as UserEntity));
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
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

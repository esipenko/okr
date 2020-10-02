import { Controller, Post, Body, Res, Get, Param, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './dto/user-registatrion.dto';
import { Response, Request } from 'express';
import { UserEntity } from 'entities';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { CompanyService } from 'src/company/company.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly companyService: CompanyService) {}

    @Post('registration')
    registration(@Body() userRegistrationDto: UserRegistrationDto, @Res() res: Response): void {
        this.userService
            .createUser(userRegistrationDto)
            .then(async (userEntity: UserEntity) => {
                const companyEntity = await this.companyService.getCompany(userEntity.company_id);
                res.status(HttpStatus.OK).send(new UserDto(userEntity, companyEntity));
            })
            .catch(() => {
                res.status(HttpStatus.BAD_REQUEST).send('This email already taken');
            });
    }

    @UseGuards(AuthGuard())
    @Get()
    async getCurrentUser(@Req() req: Request, @Res() res: Response): Promise<void> {
        const { user } = req;
        if (user) {
            const companyEntity = await this.companyService.getCompany((user as UserEntity).company_id);
            res.send(new UserDto(user as UserEntity, companyEntity));
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    }

    @UseGuards(AuthGuard())
    @Get('/:user_id')
    getUserById(@Param('user_id') userId: number, @Res() res: Response): void {
        this.userService
            .getUserByUserId(userId)
            .then(async (userEntity: UserEntity) => {
                const companyEntity = await this.companyService.getCompany(userEntity.company_id);
                res.send(new UserDto(userEntity, companyEntity));
            })
            .catch(() => {
                res.send('User does not exist');
            });
    }
}

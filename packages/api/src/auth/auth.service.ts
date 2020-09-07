import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as crypto from 'crypto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
    private userService: UserService,
    private jwtService: JwtService,
    ) {}

    async createToken(user: JwtPayload) {
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            accessToken,
        };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);

        if (user && user.is_enabled) {
            const shasum = crypto.createHash('sha1');
            shasum.update(user.salt + password);

            if (user.password === shasum.digest('hex')) {
                const token = await this.createToken({ userId: user.user_id });

                const authUser = new LoginUserDto(user);

                return {
                    token: token,
                    user: authUser,
                };
            } else throw new UnauthorizedException('Wrong email end(or) password');
        } else throw new UnauthorizedException('Wrong email end(or) password');
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

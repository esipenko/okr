import { UserEntity } from 'entities';
import { UserDto } from 'src/user/dto/user.dto';
import { Token } from '../interfaces/token.interface';

export class LoginDto {
    user: UserDto;
    token: Token;

    constructor(userEntity: UserEntity, token: Token) {
        this.token = token;
        this.user = new UserDto(userEntity);
    }
}

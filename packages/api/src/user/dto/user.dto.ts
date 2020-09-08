import { UserEntity } from '../../../entities';

export class UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    email?: string;
    isEnabled: boolean;

    constructor(user: UserEntity) {
        this.userId = user.user_id;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;
    }
}

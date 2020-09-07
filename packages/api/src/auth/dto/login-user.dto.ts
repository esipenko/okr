import { UserEntity } from 'entities';

export class LoginUserDto {
  userId: number;

  constructor(userEntity: UserEntity) {
      this.userId = userEntity.user_id;
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegistrationDto } from './dto/user-registatrion.dto';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async createUser(userRegistrationDto: UserRegistrationDto): Promise<UserEntity> {
        const salt = crypto.randomBytes(16).toString('hex');
        const algorithm = 'sha1';
        const shasum = crypto.createHash(algorithm);
        shasum.update(salt + userRegistrationDto.password);
        const userEntity = new UserEntity();

        userEntity.email = userRegistrationDto.email;
        userEntity.last_name = userRegistrationDto.lastName;
        userEntity.first_name = userRegistrationDto.firstName;
        userEntity.password = shasum.digest('hex');
        userEntity.salt = salt;

        return this.userRepository.save(userEntity);
    }

    async getUserByUserId(userId: number): Promise<UserEntity> {
        return this.userRepository.findOne(userId);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({ email });
    }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompanyEntity, ProjectEntity, RoleEntity, UserEntity } from 'entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegistrationDto } from './dto/user-registatrion.dto';
import * as crypto from 'crypto';
import { EmailAlreadyExistsError } from './errors';
import { DefaultRoles } from 'src/roles/acl.rules';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(CompanyEntity)
        private companyRepository: Repository<CompanyEntity>,
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {}

    async createUser(userRegistrationDto: UserRegistrationDto): Promise<UserEntity> {
        await this.userRepository.findOne({ email: userRegistrationDto.email }).then((v) => {
            if (v !== undefined) {
                throw new EmailAlreadyExistsError();
            }
        });

        const salt = crypto.randomBytes(16).toString('hex');
        const algorithm = 'sha1';
        const shasum = crypto.createHash(algorithm);
        shasum.update(salt + userRegistrationDto.password);

        let companyEntity = await this.companyRepository.findOne({ name: userRegistrationDto.company });
        let role = new RoleEntity();

        if (companyEntity === undefined) {
            companyEntity = await this.companyRepository.save({ name: userRegistrationDto.company });
            role = await this.roleRepository.findOne({ companyId: null, name: DefaultRoles.Administrator });
        } else {
            role = await this.roleRepository.findOne({ companyId: null, name: DefaultRoles.User });
        }

        const userEntity = new UserEntity();
        userEntity.email = userRegistrationDto.email;
        userEntity.lastName = userRegistrationDto.lastName;
        userEntity.firstName = userRegistrationDto.firstName;
        userEntity.password = shasum.digest('hex');
        userEntity.salt = salt;
        userEntity.company = companyEntity;
        userEntity.role = role;

        return await this.userRepository.save(userEntity);
    }

    async getUserByUserId(userId: number): Promise<UserEntity> {
        return this.userRepository.findOneOrFail(userId);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOneOrFail({ email });
    }

    async getUsersByProjectId(projectId: number): Promise<UserEntity[]> {
        const porject = await this.projectRepository.findOneOrFail({ projectId });
        return porject.users;
    }

    async getUsersByCompanyId(companyId: number): Promise<UserEntity[]> {
        const companyEntity = await this.companyRepository.findOneOrFail({
            relations: ['users'],
            where: { companyId },
        });
        return companyEntity.users.filter((u) => u.isEnabled === true);
    }

    async deleteUserByUserId(userId: number): Promise<UserEntity> {
        const userEntity = await this.userRepository.findOneOrFail({ userId });
        userEntity.isEnabled = false;
        return await this.userRepository.save(userEntity);
    }

    async updateUser(user: UserDto): Promise<UserEntity> {
        const { userId } = user;
        const userEntity = await this.userRepository.findOneOrFail({ userId });
        return await this.userRepository.save({ userEntity, ...user });
    }
}

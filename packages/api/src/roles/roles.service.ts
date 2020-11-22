import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity, UserEntity } from 'entities';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    createRole(createRoleDto: CreateRoleDto, companyId: number): Promise<RoleEntity> {
        const roleEntity = this.roleRepository.create({ ...createRoleDto, companyId });
        return this.roleRepository.save(roleEntity);
    }

    async assignRole(userId: number, roleId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOneOrFail(userId);
        const role = await this.roleRepository.findOneOrFail(roleId);
        user.role = role;
        return this.userRepository.save(user);
    }

    async getAvailableRoles(companyId: number): Promise<RoleEntity[]> {
        return await this.roleRepository.find({
            where: [{ companyId }, { companyId: null }],
        });

    }
}

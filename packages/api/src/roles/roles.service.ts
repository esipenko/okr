import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity, UserEntity } from 'entities';
import { Repository } from 'typeorm';
import { CreateRoleDto, RoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createRole(createRoleDto: CreateRoleDto, companyId: number): Promise<RoleEntity> {
        const roleEntity = this.roleRepository.create({ ...createRoleDto, companyId });
        return await this.roleRepository.save(roleEntity);
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

    async deleteRole(roleId: number, companyId: number): Promise<RoleEntity> {
        const roleEntity = await this.roleRepository.findOneOrFail({
            where: { roleId, companyId },
        });

        await this.roleRepository.remove({ ...roleEntity });
        return roleEntity;
    }

    async editRole(role: RoleDto): Promise<RoleEntity> {
        const roleEntity = await this.roleRepository.findOneOrFail(role.roleId);
        return await this.roleRepository.save({ ...roleEntity, ...role });
    }
}

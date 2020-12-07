import { RoleEntity } from 'entities';
import { ACLRule } from 'shared';

export class CreateRoleDto {
    name: string;
    rules: ACLRule[];
}

export class RoleDto {
    roleId: number;
    companyId: number;
    name: string;
    rules: ACLRule[];

    constructor(roleEntity: RoleEntity) {
        this.roleId = roleEntity.roleId;
        this.name = roleEntity.name;
        this.rules = roleEntity.rules;
        this.companyId = roleEntity.companyId;
    }
}

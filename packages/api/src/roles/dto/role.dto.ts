import { RoleEntity } from 'entities';
import { ACLRule } from '../acl.rules';

export class CreateRoleDto {
    name: string;
    rules: ACLRule[];
}

export class RoleDto {
    roleId: number;
    name: string;
    rules: ACLRule[];

    constructor(roleEntity: RoleEntity) {
        this.roleId = roleEntity.roleId;
        this.name = roleEntity.name;
        this.rules = roleEntity.rules;
    }
}

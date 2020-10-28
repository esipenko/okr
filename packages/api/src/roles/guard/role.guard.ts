import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'entities';
import { ACLRule } from '../acl.rules';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const user = <UserEntity>context.switchToHttp().getRequest().user;
        console.log('RoleGuard -> constructor -> user', user);

        if (!user) {
            throw new UnauthorizedException();
        }

        let rules = this.reflector.get<ACLRule[]>('acl_rules', context.getHandler());

        if (!rules || !rules.length) {
            rules = this.reflector.get<ACLRule[]>('acl_rules', context.getClass());

            if (!rules || !rules.length) {
                return true;
            }
        }

        const userRules = user?.role?.rules || [];

        return rules.every((rule) => userRules.includes(rule));
    }
}

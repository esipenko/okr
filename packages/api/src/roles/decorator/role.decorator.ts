import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ACLRule } from 'shared';

export const RoleControl = (...rules: ACLRule[]): CustomDecorator<string> => SetMetadata('acl_rules', rules);

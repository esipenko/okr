import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ACLRule } from '../acl.rules';

export const RoleControl = (...rules: ACLRule[]): CustomDecorator<string> => SetMetadata('acl_rules', rules);

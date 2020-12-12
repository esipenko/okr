import { ACLRule } from 'shared';

export const defaultRules: ACLRule[] = [ACLRule.PROJECTS_LIST, ACLRule.USERS_LIST, ACLRule.COMPANY_READ];

export enum DefaultRoles {
    Administrator = 'Administrator',
    User = 'User',
}

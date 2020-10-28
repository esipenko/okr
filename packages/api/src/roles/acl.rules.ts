export enum ACLRule {
    // roles
    ROLES_LIST = 'ROLES_LIST',
    ROLES_CREATE = 'ROLES_CREATE',
    ROLES_UPDATE = 'ROLES_UPDATE',
    ROLES_DELETE = 'ROLES_DELETE',
    ROLES_ASSIGN = 'ROLES_ASSIGN',

    // projects
    PROJECTS_LIST = 'PROJECTS_LIST',
    PROJECTS_CREATE = 'PROJECTS_CREATE',
    PROJECTS_UPDATE = 'PROJECTS_UPDATE',
    PROJECTS_DELETE = 'PROJECTS_DELETE',
    PROJECTS_USERS_LIST = 'PROJECTS_USERS_LIST',

    // users
    USERS_LIST = 'USERS_LIST',

    // company
    COMPANY_READ = 'COMPANY_READ',
    COMPANY_UPDATE = 'COMPANY_UPDATE',
    COMPANY_DELETE = 'COMPANY_DELETE',
}

export const defaultRules: ACLRule[] = [
    ACLRule.ROLES_LIST,
    ACLRule.PROJECTS_LIST,
    ACLRule.USERS_LIST,
    ACLRule.COMPANY_READ,
];

export enum DefaultRoles {
    Administrator = 'Administrator',
    User = 'User',
}

import { ACLRule } from "shared";

export interface Role {
    roleId: number;
    name: string;
    rules: ACLRule[];
}

export enum LoadStatus {
    Success = "Success",
    Loading = "Loading",
    Failed = "Failed",
}

export interface RolesState {
    roles: Role[] | undefined;
    status: LoadStatus;
}

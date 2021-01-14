import { User } from "../auth/auth.types";

export interface ProjectDto {
    projectId?: number;
    companyId: number;
    name: string;
    users: User[];
}

export interface ProjectState {
    projects: ProjectDto[];
}

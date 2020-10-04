import { User } from "@/store/auth/auth.types";
import { uuid } from "../ranomize";
import createUser from "./users";

export interface Project {
    projectId?: number;
    name: string;
    users: User[];
}

let projectId = 0;

export const createProject = (): Project => {
    const numOfUser = Math.ceil(Math.random() * 10);

    const newProject: Project = {
        projectId,
        name: uuid(),
        users: [],
    };

    for (let i = 0; i < numOfUser; i++) {
        newProject.users.push(createUser());
    }

    projectId++;

    return newProject;
};

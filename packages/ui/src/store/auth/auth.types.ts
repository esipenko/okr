import { ACLRule } from "shared";

export interface Company {
    companyId: number;
    name: string;
}
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    userId: number;
    company: Company;
    role: {
        roleId: number;
        name: string;
        rules: ACLRule[];
    };
}

interface Token {
    expiresIn: number;
    accessToken: string;
}

export interface LoginDto {
    user: User;
    token: Token;
}

export type AuthStatus = "Loading" | "Error" | "Success" | "Logout";

export interface AuthState {
    token: string;
    user: User | undefined;
    status: AuthStatus;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
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

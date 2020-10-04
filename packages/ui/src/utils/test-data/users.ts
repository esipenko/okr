import { User } from "@/store/auth/auth.types";
import { uuid } from "../ranomize";

let userId = 0;

const createUser = (): User => {
    const newUser: User = {
        userId,
        company: {
            companyId: 0,
            name: "aaaaaaaa",
        },
        email: uuid(),
        firstName: uuid(),
        lastName: uuid(),
    };

    userId++;
    return newUser;
};

export default createUser;

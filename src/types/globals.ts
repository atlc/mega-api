import { User as IUser, UserRoles } from "./models";

export {};

declare global {
    namespace Express {
        interface User extends IUser {}
    }
}

export interface Payload {
    id: string;
    email: string;
    name: string;
    roles: UserRoles[];
}

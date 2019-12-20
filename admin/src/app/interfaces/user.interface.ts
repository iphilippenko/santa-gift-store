import {Role} from '@interfaces/role.interface';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
    _id: string;
}

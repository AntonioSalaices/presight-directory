import { ESortDir, EUserFields } from "../enums/filters.enum";
import { IFilterOption } from "./filters.interface";

interface IUserBase {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
}
export interface IUser extends IUserBase {
  hobbies: string[];
}

export interface IUserRow {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string;
}

export interface IUsersResponse {
  data: IUser[];
  total: number;
  hasMore: boolean;
  hobbies: IFilterOption[];
  nationalities: IFilterOption[];
}

export interface IUsersQueryBase {
  search?: string;
  sortBy?: EUserFields;
  sortDir?: ESortDir;
  page?: number;
  limit?: number;
}

export interface IUsersQueryParsed extends IUsersQueryBase {
  nationalities?: string[];
  hobbies?: string[];
}

export interface IUsersQuery extends IUsersQueryBase {
  nationality?: string;
  hobby?: string;
}

export interface ITotal {
  total: number;
}

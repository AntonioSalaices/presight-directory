import { ESortDir, EUserFields } from "../enums/filters.enum";
import { IFilterOption } from "./filters.interface";

export interface IUser {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string[];
}

export interface IUsersResponse {
  data: IUser[];
  total: number;
  hasMore: boolean;
  hobbies: IFilterOption[];
  nationalities: IFilterOption[];
}

export interface IUsersQuery {
  search?: string;
  nationalities?: string[];
  hobbies?: string[];
  sortBy?: EUserFields;
  sortDir?: ESortDir;
  page?: number;
  limit?: number;
}

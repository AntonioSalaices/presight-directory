interface ICommonParams {
  search?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
  limit?: number;
}

export interface IFilterOption {
  value: string;
  count: number;
}

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

export interface IUsersParams extends ICommonParams {
  nationality?: string[];
  hobby?: string[];
}

export interface IFilters extends ICommonParams {
  nationalities: string[];
  hobbies: string[];
}

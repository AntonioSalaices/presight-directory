import { environment } from "../config/env.config";
import { ESearchParam } from "../enums/filters.enum";
import { IUsersParams, IUsersResponse } from "../interfaces/users.interface";

export async function fetchUsers(
  params: IUsersParams,
): Promise<IUsersResponse> {
  const query = new URLSearchParams();

  if (params.search) query.set(ESearchParam.SEARCH, params.search);
  if (params.sortBy) query.set(ESearchParam.SORT_BY, params.sortBy);
  if (params.sortDir) query.set(ESearchParam.SORT_DIR, params.sortDir);
  if (params.page) query.set(ESearchParam.PAGE, String(params.page));
  if (params.limit) query.set(ESearchParam.LIMIT, String(params.limit));

  params.nationality?.forEach((nationality) =>
    query.append(ESearchParam.NATIONALITY, nationality),
  );
  params.hobby?.forEach((hobby) => query.append(ESearchParam.HOBBY, hobby));

  const response = await fetch(
    `${environment.baseUrl}/users?${query.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

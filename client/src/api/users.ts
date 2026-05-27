import { environment } from "../config/env.config";
import { IUsersParams, IUsersResponse } from "../interfaces/users.interface";

export async function fetchUsers(
  params: IUsersParams,
): Promise<IUsersResponse> {
  const query = new URLSearchParams();

  if (params.search) query.set("search", params.search);
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.sortDir) query.set("sortDir", params.sortDir);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  params.nationality?.forEach((nationality) =>
    query.append("nationality", nationality),
  );
  params.hobby?.forEach((hobby) => query.append("hobby", hobby));

  const response = await fetch(
    `${environment.baseUrl}/users?${query.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

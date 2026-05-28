import React from "react";
import { IUser } from "../interfaces/users.interface";

interface IUserCardProps {
  user: IUser;
}

export default function UserCard({ user }: IUserCardProps) {
  console.log("user", user);
  const visibleHobbies = user.hobbies.slice(0, 2);
  const remainingHobbies = user.hobbies.length - visibleHobbies.length;

  return (
    <div className="flex items-start gap-3 p-4 border-b">
      <img
        src={user.avatar}
        alt={`{user.first_name}{user.last_name}`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium truncate">
            {user.first_name} {user.last_name}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>{user.nationality}</span>
          <span>{user.age}</span>
        </div>
        {user.hobbies.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {visibleHobbies.map((hobby) => (
              <span
                key={hobby}
                className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
              >
                {hobby}
              </span>
            ))}
            {remainingHobbies > 0 && (
              <span className="text-xs">+{remainingHobbies}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

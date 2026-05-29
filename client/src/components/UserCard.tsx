import { IUser } from "../interfaces/users.interface";
interface IUserCardProps {
  user: IUser;
}
const UserCard = ({ user }: IUserCardProps) => {
  const visibleHobbies = user.hobbies.slice(0, 2);
  const remainingHobbies = user.hobbies.length - visibleHobbies.length;

  return (
    <div className="flex items-start gap-3 p-4 border-b border-line hover:bg-surface-muted transition-colors">
      <img
        src={user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-line"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground truncate">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <span>{user.nationality}</span>
          <span>·</span>
          <span>{user.age}</span>
        </div>
        {user.hobbies.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {visibleHobbies.map((hobby) => (
              <span
                key={hobby}
                className="text-xs bg-surface px-2 py-0.5 rounded-full text-muted border border-line"
              >
                {hobby}
              </span>
            ))}
            {remainingHobbies > 0 && (
              <div className="relative group">
                <span className="text-xs text-primary cursor-default">
                  +{remainingHobbies}
                </span>
                <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block z-10">
                  <div className="bg-surface-card border border-line rounded px-2 py-1 text-xs text-muted whitespace-nowrap shadow-lg">
                    {user.hobbies.slice(2).join(", ")}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;

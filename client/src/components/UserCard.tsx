import { useEffect, useRef, useState } from "react";

import { IUser } from "../interfaces/users.interface";
interface IUserCardProps {
  user: IUser;
  onHobbiesToggle?: () => void;
}

const UserCard = ({ user, onHobbiesToggle }: IUserCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [showRemainingHobbies, setShowRemainingHobbies] = useState(false);

  const visibleHobbies = user.hobbies.slice(0, 2);
  const extraHobbies = user.hobbies.slice(2);
  const remainingHobbies = extraHobbies.length;

  const onHobbiesToggleRef = useRef(onHobbiesToggle);
  onHobbiesToggleRef.current = onHobbiesToggle;

  useEffect(() => {
    onHobbiesToggleRef.current?.();
  }, [showRemainingHobbies]);

  return (
    <div className="flex items-start gap-3 p-4 border-b border-line hover:bg-surface-muted transition-colors">
      {imgError || !user.avatar ? (
        <div className="w-12 h-12 rounded-full ring-2 ring-border bg-surface-muted flex items-center justify-center text-text-muted font-medium text-sm">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
      ) : (
        <img
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-line"
          onError={() => setImgError(true)}
        />
      )}
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
          <div className="mt-1">
            <div className="flex flex-wrap gap-1">
              {visibleHobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="text-xs capitalize bg-surface px-2 py-0.5 rounded-full text-muted border border-line"
                >
                  {hobby}
                </span>
              ))}
              {remainingHobbies > 0 && (
                <button
                  type="button"
                  onClick={() => setShowRemainingHobbies((open) => !open)}
                  aria-expanded={showRemainingHobbies}
                  aria-label={
                    showRemainingHobbies
                      ? "Hide additional hobbies"
                      : `Show ${remainingHobbies} more hobbies`
                  }
                  className={`text-xs cursor-pointer text-primary rounded px-1 -mx-1 hover:bg-surface-muted transition-colors ${
                    showRemainingHobbies ? "font-medium underline" : ""
                  }`}
                >
                  +{remainingHobbies}
                </button>
              )}
            </div>
            {showRemainingHobbies && remainingHobbies > 0 && (
              <div className="mt-1 flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                {extraHobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="text-xs capitalize bg-surface px-2 py-0.5 rounded-full text-muted border border-line"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;

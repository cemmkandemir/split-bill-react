import { Friend } from "./Friend";

export function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul className="friendlist">
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

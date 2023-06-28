import { useState } from "react";
import { FriendsList } from "./Components/FriendsList";
import { FormAddFriend } from "./Components/FormAddFriend";
import { FormSplitBill } from "./Components/FormSplitBill";
import { Button } from "./Components/Button";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend(
      (selected) => (selected && selected?.id === friend.id ? null : friend)
      //selected.id eğer null gelirse undefined olarak atamamızı sağlar.(Optional changing ?.)
    );

    setShowAddFriend(false);
    //select butonuna basıldğında add formu açıksa kapanması için.
  }

  function handleSplitBill(val) {
    console.log(val);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + val }
          : friend
      )
    );
    //friends'i güncelle. Her bir friend'i seçili mi diye kontrol et. Eğer seçili ise balance'ını val kadar(val -> FormSplitBill componentinden geliyor) artırıp döndür. seçili olmayanları ise eski halinde döndür.

    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

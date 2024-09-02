import React from "react";
import Modal from "react-modal";

interface LikeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  likedUsers: { username: string; email: string; userImg: string }[];
}

const modalStyles = {
  content: {
    width: "80%", // মোবাইল ডিভাইসের জন্য প্রস্থ সামঞ্জস্য
    maxWidth: "600px", // পড়ার সুবিধার্থে সর্বাধিক প্রস্থ
    height: "60%", // মোবাইল ডিভাইসের জন্য উচ্চতা সামঞ্জস্য
    margin: "auto", // মডালটিকে অনুভূমিকভাবে কেন্দ্রীভূত করা
  },
};

const LikeModal: React.FC<LikeModalProps> = ({
  isOpen,
  onRequestClose,
  likedUsers,
}) => {
  const uniqueEmails = new Set<string>();
  const userOccurrences: { [email: string]: number } = {};

  if (likedUsers) {
    likedUsers.forEach((user) => {
      if (uniqueEmails.has(user.email)) {
        userOccurrences[user.email]++;
      } else {
        uniqueEmails.add(user.email);
        userOccurrences[user.email] = 1;
      }
    });
  }

  return (
<Modal  isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Liked Users"
      style={modalStyles} >

<h2 className="text-xl font-bold">Liked by</h2>
      <ul>
        {Array.from(uniqueEmails).map((email, index) => {
          const user = likedUsers.find((user) => user.email === email);
          return (
            <>
            <li key={index} className="sm:flex gap-2 items-center mt-4">
              <img
                className="w-14 h-14 object-cover rounded-full"
                src={user?.userImg}
                alt=""
              />
              <strong>Username:</strong>{user?.username}
              {userOccurrences[email] > 1 && (<span>({userOccurrences[email]})</span>
              )}
              <br />
            </li>
            </>
          );
        })}
      </ul>
        
</Modal>
  );
};

export default LikeModal;

import React, { useState } from "react";
import "../Messages/WriteMessage.css";
import { sendToBackend } from "../../Utils/helper.js";
import { useApolloClient } from "@apollo/client";

function WriteMessage({ text, postUuid, userUuid, reload, newComment }) {
  const [comment, setComment] = useState("");
  const client = useApolloClient(); // Uzyskujemy dostęp do klienta Apollo

  const sendComment = async () => {
    console.log("klikam");
    if (!comment.trim()) {
      alert("Komentarz nie może być pusty!");
      return;
    }
    const userComment = comment;
    setComment("");

    try {
      const commentDTO = {
        content: userComment,
      };
      const endpoint = `posts/${postUuid}/users/${userUuid}/comment`;
      const response = await sendToBackend(
        endpoint,
        "POST",
        JSON.stringify(commentDTO)
      );
      console.log(response);

      if (response) {
        // Po dodaniu komentarza zaktualizuj cache
        client.cache.modify({
          id: client.cache.identify({ __typename: "Post", uuid: postUuid }), // Znajdź post na podstawie UUID
          fields: {
            commentsNumber(existingComments = 0) {
              return existingComments + 1; // Dodaj 1 do liczby komentarzy
            },
          },
        });

        setComment("");
        if (reload) {
          reload();
        }
        if (newComment) {
          newComment();
        }
      } else {
        alert("Nie udało się wysłać komentarza.");
      }
    } catch (error) {
      console.error("Error while sending comment:", error);
      alert("Wystąpił błąd podczas wysyłania komentarza.");
    }
  };

  return (
    <div className="message-input-wrapper">
      <input
        type="text"
        className="message-input ssp"
        placeholder={text}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <img
        src={`${process.env.PUBLIC_URL}/send.png`}
        alt="Wyślij komentarz"
        className="send-icon"
        onClick={sendComment}
      />
    </div>
  );
}

export default WriteMessage;

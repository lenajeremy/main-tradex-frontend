import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useTimeDifference from "../hooks/useTimeDifference";
import { backendAPI } from "../fetch";
import SearchBar from './Searchbar';

function Messages(props) {
  const { latestMessages } = useSelector((store) => store.userDetails);

  return (
    <div className="messages">
      <SearchBar/>
      {latestMessages.map((message, index) => (
        <MessageLink details={message} key={index} />
      ))}
    </div>
  );
}

const MessageLink = ({ details }) => {
  
  return (
    <div className="message_link">
      <img
        className="profile_image"
        src={details.recipient_picture}
        alt={details.content}
      />
      <div className="message_text d-flex">
        <strong>
          <Link to = {`/message/${details.conversation_id}`}>{details.recipient.first_name} {details.recipient.last_name}</Link>
        </strong>
        <p>{details.content.length <= 30 ? details.content : details.content.split('').slice(0, 30).join('') + "..."}</p>
      </div>
    </div>
  );
};

export default Messages;

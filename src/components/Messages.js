import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useTimeDifference from "../hooks/useTimeDifference";
import { backendAPI } from "../fetch";
import SearchBar from "./Searchbar";
import Fab from '@material-ui/core/Fab';
import {Add} from '@material-ui/icons';

function Messages(props) {
  const user = useSelector((store) => store.userDetails);

  return (
    <div className="messages">
      <SearchBar />
      {user.latestMessages.map((message, index) => (
        <MessageLink details={message} userId={user.id} key={index} />
      ))}
      <Fab variant= 'extended' color = 'primary'><Add/></Fab>
    </div>
  );
}

const MessageLink = ({ details, userId }) => {
  const timeDifference = useTimeDifference();

  return (
    <div className="message_link">
      <img
        className="profile_image"
        src={details.recipient.id === userId ? details.sender.picture : details.recipient.picture}
        alt={details.content}
      />
      <div className="message_text d-flex">
        <strong>
          <Link to={`/chat/${details.conversation_id}`}>
            {details.recipient.id === userId
              ? `${details.sender.first_name} ${details.sender.last_name}`
              : `${details.recipient.first_name} ${details.recipient.last_name}`}
          </Link>
        </strong>
        <p>
          {details.content.length <= 30
            ? details.content
            : details.content.split("").slice(0, 30).join("") + "..."}
        </p>
      </div>
      <div>{timeDifference(details.date_sent)}</div>
    </div>
  );
};

export default Messages;

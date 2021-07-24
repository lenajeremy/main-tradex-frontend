import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useUrl from '../hooks/useProfileUrl';
import SearchBar from "./Searchbar";
import Fab from '@material-ui/core/Fab';
import {Add} from '@material-ui/icons';


function Messages(props) {
  const messages = useSelector((store) => store.messages);
  const user = useSelector(store => store.userDetails);

  return (
  <div className="messages container">
      <SearchBar />
      {messages.map((message, index) => (
        <MessageLink details={message} userId={user.id} key={index} />
      ))}
      <Fab variant= 'round' color = 'primary'><Add/></Fab>
    </div>
  );
}

const MessageLink = ({ details, userId }) => {
  const url = useUrl();

  return (
    <div className="message_link my-2">
      <div className = 'profile_image' style = {{backgroundImage: `url(${url(details.recipient.id === userId ? details.sender.picture : details.recipient.picture)})`}}>
      <img
        className="profile_image"
        src={url(details.recipient.id === userId ? details.sender.picture : details.recipient.picture)}
        alt={details.content}
      />
      </div>
      <div className="message_text d-flex">
        <strong>
          <Link to={`/chat/${details.conversation_id}`}>
            {details.recipient.id === userId
              ? `${details.sender.first_name} ${details.sender.last_name}`
              : `${details.recipient.first_name} ${details.recipient.last_name}`}
          </Link>
        </strong>
        <p>
          {details.content.length <= 35
            ? details.content
            : details.content.split("").slice(0, 35).join("") + "..."}
        </p>
      </div>
      {/* <div>{timeDifference(details.date_sent)}</div> */}
    </div>
  );
};

export default Messages;

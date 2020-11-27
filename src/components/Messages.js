import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useTimeDifference from "../hooks/useTimeDifference";
import useUrl from '../hooks/useProfileUrl';
import SearchBar from "./Searchbar";
import Fab from '@material-ui/core/Fab';
import {Add} from '@material-ui/icons';
import {motion} from 'framer-motion';

function Messages(props) {
  const user = useSelector((store) => store.userDetails);

  return (
  <motion.div className="messages" initial = {{x: -50, opacity: 0}} animate = {{x: 0, opacity: 1}}>
      <SearchBar />
      {user.latestMessages.map((message, index) => (
        <MessageLink details={message} userId={user.id} key={index} />
      ))}
      <Fab variant= 'extended' color = 'primary'><Add/></Fab>
    </motion.div>
  );
}

const MessageLink = ({ details, userId }) => {
  const url = useUrl();

  return (
    <div className="message_link my-2">
      <img
        className="profile_image"
        src={url(details.recipient.id === userId ? details.sender.picture : details.recipient.picture)}
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
      {/* <div>{timeDifference(details.date_sent)}</div> */}
    </div>
  );
};

export default Messages;

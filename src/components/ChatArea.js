import React from "react";
import { getChatMessages, backendAPI, sendMessage as messageSend } from "../fetch";
import {motion} from 'framer-motion';
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import "./styles/ChatArea.css";
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux';
import useUrl from '../hooks/useProfileUrl';

const ChatArea = ({ routeProps, user_id }) => {
  const user = useSelector(store => store.userDetails);
  const [messages, setMessages] = React.useState([]);
  const [step, setStep] = React.useState(Math.floor(messages.length / 10));
  const [userDetails, setDetails] = React.useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
  });
  const history = useHistory();

  React.useEffect(() => {
    document.querySelector(".sideBar").style.display =
      window.innerWidth < 600 ? "none" : "block";
    window.addEventListener("scroll", scrollEvent);
    getChatMessages(user_id, routeProps.match.params.chatId, step, (data) => {
      console.log(data);
      setMessages(data.messages.reverse());
      document.querySelector('.scrollIntoView').scrollIntoView();
      setDetails(data.users[0]);
    });
    return () => {
      document.querySelector(".sideBar").style.display = "block";
      window.removeEventListener("scroll", scrollEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const url = useUrl();

  const scrollEvent = (e) => {

  };
  const sendMessage = (event, message) => {
    event.preventDefault();
    messageSend(user_id, routeProps.match.params.chatId, message, data => {
      setMessages(messages => [...messages, data.message]);
      document.querySelector('.scrollIntoView').scrollIntoView();
    })
  }
  return (
    <div className="chat_area">
      <div className="top">
        <div className="content">
          <div className="chevron" onClick={() => history.goBack()}>
            <ArrowBackIos />
          </div>
          <img
            className="avatar"
            src={url(userDetails.picture)}
            alt="avatar"
          />
          <div className="userDetails">
            <div className="user_name">{`${userDetails.firstName} ${userDetails.lastName}`}</div>
            <small>Online</small>
          </div>
        </div>
      </div>
      <div className="main">
        {messages.map((message, index) => (
          <MessageLittle details={message} key={index} user = {user.id}/>
        ))}
        <div className = 'scrollIntoView'></div>
      <ChatForm send = {(event, message) => sendMessage(event, message)}/>
      </div>
    </div>
  );
};

const MessageLittle = (props) => {
  return <div className={`message__little ${props.details.sender.id === props.user ? 'self' : 'not_self'}`}>{props.details.content}</div>;
};

function ChatForm(props) {
  const [message, setMessage] = React.useState('')
  return (
    <motion.form id="messageForm" onSubmit = {event => {props.send(event, message); setMessage('')}} initial = {{y : 50, opacity : 0}} animate ={{y: 0, opacity: 1}}>
      <div>
      <textarea
        type="text"
        autoFocus = {true}
        onChange={event => setMessage(event.target.value)}
        value = {message}
        name="message"
        id="message"
        placeholder="Type a message…"
      />
      <button type="submit">
        <ArrowForwardIos/>
      </button>
      </div>
    </motion.form>
  );
}
export default ChatArea;

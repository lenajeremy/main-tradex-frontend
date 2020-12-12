import React from "react";
import { getChatMessages, sendMessage as messageSend } from "../fetch";
import { motion } from 'framer-motion';
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import "./styles/ChatArea.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import useUrl from '../hooks/useProfileUrl';
import { newMessage } from '../actions';

const ChatArea = ({ routeProps, user_id }) => {
  const dispatch = useDispatch();
  const messsages = useSelector(state => state.messsages);
  const user = useSelector(store => store.userDetails);
  const [messages, setMessages] = React.useState([]);
  const [step, setStep] = React.useState(0);
  const [userDetails, setDetails] = React.useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
  });
  const history = useHistory();

  React.useEffect(() => {
    document.querySelector(".sideBar").style.display =
      window.innerWidth < 700 ? "none" : "block";
    window.addEventListener("scroll", scrollEvent);
    getChatMessages(user_id, routeProps.match.params.chatId, step, (data) => {
      console.log(data);
      setMessages(data.messages);
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
    console.log(e);
  };
  const sendMessage = (event, message) => {
    event.preventDefault();
    messageSend(user_id, routeProps.match.params.chatId, message, false, data => {
      setMessages(messages => [...messages, data.message]);
      document.querySelector('.scrollIntoView').scrollIntoView();
      document.getElementById('message').focus();
      dispatch(newMessage(data.message));
    });
  }
  React.useEffect(() => {
    console.log(step);
    if (step > 0) {
      getChatMessages(user_id, routeProps.match.params.chatId, step, data => {
        console.log(data);
        setMessages(messages => [...data.messages, ...messages])
        console.log(messages)
      })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return (
    <div className="chat_area">
      <div className="top">
        <div className="content">
          <div className="chevron" onClick={() => history.goBack()}>
            <ArrowBackIos />
          </div>
          <div className='avatar' style={{ backgroundImage: `url(${url(userDetails.picture)})` }}>
            <img
              className="avatar"
              src={url(userDetails.picture)}
              alt="avatar"
            />
          </div>
          <div className="userDetails">
            <div className="user_name">{`${userDetails.firstName} ${userDetails.lastName}`}</div>
            <small>Online</small>
          </div>
        </div>
      </div>
      <div className="main">
        <div className='prev' onClick={() => setStep(step + 1)}>Prev&lt;&lt;</div>
        {messages.map((message, index) => (
          <MessageLittle details={message} key={index} user={user.id} />
        ))}
        <div className='scrollIntoView'></div>
        <ChatForm send={(event, message) => sendMessage(event, message)} />
      </div>
    </div>
  );
};

const MessageLittle = (props) => {
  return <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`message__little ${props.details.sender.id === props.user ? 'self' : 'not_self'}`}>{props.details.content}</motion.div>;
};

function ChatForm(props) {
  const [message, setMessage] = React.useState('');
  return (
    <form id="messageForm" onSubmit={event => { props.send(event, message); setMessage('') }}>
      <div>
        <textarea
          type="text"
          autoFocus={true}
          onChange={event => setMessage(event.target.value)}
          value={message}
          name="message"
          id="message"
          placeholder="Type a message…"
        />
        <button type="submit">
          <ArrowForwardIos />
        </button>
      </div>
    </form>
  );
}
export default ChatArea;

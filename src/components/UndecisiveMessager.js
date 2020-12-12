import React from 'react';
import './styles/Undecided.css';
import { useHistory } from 'react-router-dom';
import { Send } from '@material-ui/icons';
import { sendMessage } from '../fetch';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';


function UndecisiveMessager(props) {
  const history = useHistory();
  const [content, setContent] = React.useState('');
  const { id } = useSelector(store => store.userDetails)

  const sendMessageFunction = () => {
    sendMessage(id, props.chat_id, content, true, data => {
      console.log(data)
    })
  }
  React.useEffect(() => {
    let formOverlay = document.createElement('div')
    formOverlay.className = 'formOverlay';
    document.querySelector('#root').appendChild(formOverlay);
    return document.querySelector('.formOverlay').remove();
  }, [])
  return (
    <div className='undecidedMessages'>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <TextField
        name='username'
        variant='outlined'
        required
        value={content}
        fullWidth
        id='username'
        label='Username'
        autoFocus
        onChange={event => setContent(event.currentTarget.value)}
      />
      <button onClick={sendMessageFunction}><Send /></button>
    </div>
  )
}

export default UndecisiveMessager

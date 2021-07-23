import React from 'react';
import './styles/Undecided.css';
import { useHistory } from 'react-router-dom';
import { Send } from '@material-ui/icons';
import { sendMessage } from '../fetch';
import { useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';


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
      <TextField
        name='username'
        variant='filled'
        required
        value={content}
        fullWidth
        id='Message'
        label='Type a new message'
        autoFocus
        onChange={event => setContent(event.currentTarget.value)}
      />
      <Button variant="contained" color="primary" size="small" onClick={sendMessageFunction}><Send /></Button>
    </div>
  )
}

export default UndecisiveMessager

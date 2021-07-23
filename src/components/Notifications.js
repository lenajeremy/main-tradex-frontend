import React from 'react';
import useUrl from '../hooks/useProfileUrl';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import useTimeDifference from '../hooks/useTimeDifference';
import { ArrowBackIos } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import './styles/Notification.css';

function Notifications(props) {
  const store_notifications = useSelector(store => store.userDetails);
  const [notifications, setNotifications] = React.useState([{ dateCreated: 100000, related_user: 1, related_picture: 'null', notification_type: 'undefined', text: 'Loading' }])
  const history = useHistory();

  React.useEffect(() =>  {setNotifications(store_notifications.notifications); console.log(notifications)}, [store_notifications])


  return (
    <div className='cart container'>
      <div className="top d-flex align-items-center" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <div className='d-flex align-items-center' onClick={() => history.goBack()}>
          <ArrowBackIos />
          <p>Notifications</p>
        </div>
      </div>
      <div className='notifications'>
        {notifications.map((notification, index) => <Notification key={index} history={history} notification={notification} />)}
      </div>
    </div>
  )
}


function Notification({ notification, history }) {
  const timeDifference = useTimeDifference();
  const url = useUrl()
  const getUrl = notification => {
    if (['from_store_to_cart', 'to_store_from_cart', 'like_post', 'followed', 'update_profile', 'view_store'].indexOf(notification.notification_type) !== -1) {
      return '/view/user-profile/' + notification.related_user;
    } else if (notification === 'admin') return '/user/profile/';
    else return '/';
  }
  return (
    <Link to={getUrl(notification)} className='notification my-3'>
      <img src={url(notification.related_picture)} alt={notification.related_user} />
      <div className='noti_text'>
        <Typography variant='inherit' component='p'>{notification.text}</Typography>
        <small>{timeDifference(notification.dateCreated)}</small>
      </div>
    </Link>
  )
}
export default Notifications;
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationsCard from './NotificationCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  text: {
    top: "50px",
    position: "relative",
    left: "-50px"
  },
  cover:{
    width: 73,
    height: 73,
    borderRadius: '50%'
  }
}));

export default function Notifications() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const [nList, setNList] = useState([])

  useEffect(() => {
    const markNotificationsSeen = ()=>{
      axios({
        method: 'get',
        url: '/notifications/seen',
      }).then(() => {
        console.log("seen");
      })
    }
    markNotificationsSeen()
  }, [])

  useEffect(()=>{
    const getNotifications = ()=>{
      axios({
        method: 'get',
        url: '/notifications/list'
      }).then((resp)=>{
        setLoading(false)
        setNList(resp.data.notifications)
      }).catch(()=>{
        setLoading(false)
      })
    }
    getNotifications()
  },[])
  return (
    <div className="inner_content forums_inner_page">
    <Backdrop className={classes.backdrop} open={loading} >
      <CircularProgress color="inherit" />
      <div className={classes.text}>Loading</div>
    </Backdrop>
    <section className="innder_page people">
      <div className="container">
        <div className="inner_title">
          <h2>Notifications</h2>
          <img src="/assets/img/title-divaider.png" alt="" />
        </div>
      </div>
    </section>
      {nList.map((not, i)=><NotificationsCard key={i} notification={not} />)}
    </div>
  );
}

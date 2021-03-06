import React, { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import UpdatePassword from './UpdatePassword'
import EmailNotification from './EmailNotifications'
import SocialAccounts from './SocialAccounts'
import DeleteAccount from './DeleteAccount'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Settings = () => {
  const classes = useStyles();
  const [view, setView] = useState('password')
  const [loading, setLoading] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)
  const profil = useSelector(({profil}) => profil)

  useEffect(() => {
    setLoading(profil.loading)
  }, [profil.loading])

  useEffect(()=>{
    setOpenNotification(profil.openNotification)
  },[])

  return (
    <div className="profile-forum-details">
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotification}
        onClose={()=>setOpenNotification(false)}
        autoHideDuration={5000}
      >
        <Alert severity="success">
          Profil updated successfully
        </Alert>
      </Snackbar>
      <section className="tabbed-content2">
        <div className="tabs2">
          <ul>
            <li onClick={()=>setView('password')}><p className={view === 'password' ?'active':''}>General</p></li>
            <li onClick={()=>setView('email')}><p className={view === 'email' ?'active':''}>Email</p></li>
            <li onClick={()=>setView('social')}><p className={view === 'email' ?'active':''}>Social Accounts </p></li>
            <li onClick={()=>setView('delete')}><p className={view === 'delete' ?'active':''}>Delete Accounts </p></li>
            {/*<li><p>Email </p></li>
              <li><a href="#Social">Social Accounts </a></li>
              <li><a href="#Profile">Profile Visibility</a></li>
              <li><a href="#Export">Export Data </a></li>
              <li><a href="#Delete">Delete Account</a></li>
              */}
          </ul>
        </div>
        {view === 'password' && <UpdatePassword />}
        {view === 'email' && <EmailNotification setLoading={setLoading}/>}
        {view === 'social' && <SocialAccounts setLoading={setLoading}/>}
        {view === 'delete' && <DeleteAccount setLoading={setLoading} />}
      </section>
    </div>
  )
}

export default Settings;

import React, { useState } from 'react';
import FriendsList from './FriendsList'
import RequestList from './RequestsList'
const FriendsComponent = () => {
  const [view, setView] = useState('friends');
  return (
    <div className="profile-forum-details friend_inner">
      <section className="tabbed-content2">
        <div className="tabs2">
          <ul>
            <li>
              <p onClick={()=>setView('friends')} className={view === 'friends'?'active':''}>
                Friendships
              </p>
            </li>
            <li>
              <p onClick={()=>setView('requests')} className={view === 'requests'?'active':''}>Requests</p>
            </li>
          </ul>
        </div>
        {view === 'friends' && <FriendsList />}
        {view === 'requests' && <RequestList />}
        </section>
      </div>
  )
}

export default FriendsComponent;

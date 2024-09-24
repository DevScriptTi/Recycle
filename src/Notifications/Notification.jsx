import React, { useEffect, useState } from 'react';
// import echo from '../Sockets/Echo';

const Notification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(()=>{
    // echo.channel('chat')
    // .listen('FirstEvent',(data => {
    //     console.log(data)
    //     setNotification(data.msg)
    // }))
  },[]);

  return (
    <div className='grid place-items-center h-svh w-svw'>
      <h2 className='text-headline-large text-light-primary dark:text-dark-on-primary'>Notifications</h2>
      <p className='text-title-large text-light-on-surface dark:text-dark-on-surface'>{notification ?? 'There is message from the server yet'}</p>
    </div>
  );
};

export default Notification;

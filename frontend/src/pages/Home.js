import React from 'react';
import NotificationError from '../components/NotificationError';
import NotificationSuccess from '../components/NotificationSuccess';

export function Home() {
  return (
    <>
      <h1>Home page</h1>
      <NotificationError />
      <NotificationSuccess />
    </>
  );
}

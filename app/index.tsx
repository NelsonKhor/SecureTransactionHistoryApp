import { StatusBar } from 'expo-status-bar';
import React, { ReactElement } from 'react';
import Login from './pages/Login';

export default function App(): ReactElement {
  return (
    <>
      <Login />
      <StatusBar style="auto" />
    </>
  );
}

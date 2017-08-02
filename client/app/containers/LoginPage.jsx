import React from 'react';
import LoginForm from '../components/LoginForm.jsx'

const LoginPage = () => {
  return(
    <div style={ styles.contents }>
      this is the login page
      <br />
      <LoginForm />
    </div>
  );
}

const styles ={
  contents:{
    display:          'flex',
    flexDirection:    'column',
    width:            '600px',
    margin:           '10px auto',
    backgroundColor:  '#eee',
    borderRadius:     '2px',
  },
}

export default LoginPage;
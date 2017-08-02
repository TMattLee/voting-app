import React from 'react';
import SignUpForm from '../components/SignUpForm.jsx'

const SignUpPage = () => {
  return (
    <div style={ styles.contents } >
      <div>this is the signup page</div>
      <br />
      <SignUpForm  />
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

export default SignUpPage;
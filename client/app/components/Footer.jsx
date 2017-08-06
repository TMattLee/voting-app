import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footerContainer}>
      <div style = {styles.footer}>
          Built using React and Node.js by <a href="https://tmattlee.github.io"
          style = {{textDecoration:'none',color: 'orange'}}>Matt Lee</a>
        </div>
        <div style = {styles.footer}>
          <a href="https://github.com/TMattLee/voting-app"
          style = {{textDecoration:'none',color: 'orange'}}>
            View Source 
          </a>
        </div>
    </div>
  );
}

const textColor = '#333';

const styles ={
  footerContainer:{
    display:          'flex',
    flexDirection:    'column',
    justifyContent:   'space-between',
    width:            '100%',
    margin:           '10px 0px 0px 0px',
    backgroundColor:  '#e8e8e8',
    boxShadow:        '0px 0px 2px',
    position:         'fixed',
    zIndex:           '100',
    bottom:           '0',
    left:             '0',
    right:            '0',
    height:           '60px',
  },
  footer:{
    color:            textColor,
    margin:           '5px',
    fontFamily:       'Impact',
    textAlign:        'center',
    textDecoration:   'none',
    fontFamily:       '"Fira Sans", Helvetica, Arial, sans-serif',
    fontWeight:       'bold',
    textTransform:    'uppercase'
  },
}

export default Footer;
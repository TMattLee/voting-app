import axios from 'axios';
import Cookies from 'universal-cookie';

export const CHECK_LOGGED_IN = 'CHECK_LOGGED_IN';
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT';
export const SET_NOT_DONE = 'SET_NOT_DONE';
export const SET_DONE = 'SET_DONE'

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

export const SHOW_EDIT_MODAL = 'SHOW_EDIT_MODAL';
export const SHOW_CREATE_MODAL = 'SHOW_CREATE_MODAL';
export const SHOW_POLL_MODAL = 'SHOW_POLL_MODAL';
export const SHOW_DELETE_MODAL = 'SHOW_DELETE_MODAL';

export const EDIT_MESSAGE = 'EDIT_MESSAGE';
export const GET_POLLS = 'GET_POLLS';
export const ADD_NEW_POLL = 'ADD_NEW_POLL';
export const EDIT_EXISTING_POLL = 'EDIT_EXISTING_POLL';
export const SET_CURRENT_POLL = 'SET_CURRENT_POLL';

export const DO_VOTE_ACTION = 'DO_VOTE_ACTION';

export const signIn = ( info ) => {
  return ( dispatch ) => {
    const cookies = new Cookies();
    axios.post( '/voting-app/login',info )
      .then( ( response ) => {
        if( response.data.redirect !== true ){
          dispatch({
            type: SIGN_IN,
            redirect: false,
            message: "Invalid username or password"
          });
        }
        else{
          let currentDate = new Date();
          let expireDate = new Date(
            currentDate.setHours( currentDate.getHours() + 1 ) // expires in one hour
          );
          cookies.set( 'uuvvuuvv', response.data.token,{
            path: '/voting-app',
            expires: expireDate,
            secure: 'true'
          });
          dispatch({
            type: SIGN_IN,
            redirect: response.data.redirect,
            message: "",
            username: info.uid
          })
        }
      })
      .catch( ( error ) => {
        console.log('x1: ',error );
      });
  }
}

export const signUp = ( uid, pw ) => {
  return ( dispatch ) => {
    const cookies = new Cookies();
    axios.get('/voting-app/check/' + uid )
        .then(  
          ( response ) => {
            if( response.data === "Valid Username"){
              const info = {
                "uid": uid,
                "utoken": pw
              };
              axios.post('/voting-app/signup',info )
                .then( ( response ) => {
                  let currentDate = new Date();
                  let expireDate = new Date(
                    currentDate.setHours( currentDate.getHours() + 1 ) // expires in one hour
                  );
                  cookies.set( 'uuvvuuvv', response.data.token,{
                    path: '/voting-app',
                    expires: expireDate,
                    secure: 'true'
                  });
                  dispatch({
                    type: SIGN_UP,
                    redirect: response.data.redirect,
                    message: "",
                    username: uid,
                  });
                  
                })
                .catch( ( error ) => {
                  console.log('x1: ',error );
                });
            }
            else{
              dispatch({
                type: SIGN_UP,
                redirect: false,
                message: "Username Unavailable"
              });
            }
          }
        )
        .catch(
          ( error ) => {
            console.log( error );
          }
        );
  }
}

export const signOut = () => ({
  type: SIGN_OUT,
})

export const checkLoggedIn = ( authCookie ) => {
  return ( dispatch ) => {
    console.log('attempt auth with', authCookie)
    axios.defaults.headers.common['Authorization'] = 'JWT ' + authCookie;
    axios.get('/voting-app/auth')
      .then( ( response ) => {
        console.log('response', response )
        if( response.data.auth !== "AUTHORIZED"){
          dispatch({
            type: CHECK_LOGGED_IN,
            isAuthorized: false,
            done:         true,
            redirect:     false,
          });
        }
        else{
          dispatch({
            type: CHECK_LOGGED_IN,
            isAuthorized: true,
            done:         true,
            redirect:     true,
            username:     response.data.displayName,
            userId:       response.data.uid
          });
        }
      })
      .catch( function ( error ) {
        console.log( error );
      });
  }
}

export const setLoggedOut = () => ({
  type: SET_LOGGED_OUT,
  isAuthorized: false,
  done:         true,
  redirect:     false,
});

export const setNotDone = () => ({
  type: SET_NOT_DONE,
  done: false,
});

export const getPollsFromDatabase = () => {
  return ( dispatch ) => {
    axios.get('/voting-app/polls')
    .then( ( response ) => {
      const pollData = response.data;
      console.log('dfdfdfdfd',pollData)
      dispatch({
        type: GET_POLLS,
        polls: pollData
      })
    })
    .catch( ( error ) => {
      console.log('error getting polls d', error );
    });
  }
}

export const editMessage = ( message ) => ({
  type: EDIT_MESSAGE,
  message: message
})

export const showModal = ( type, bool ) => ({
  type: type,
  isOpen: bool
});

export const addNewPoll = ( title, options, authCookie ) => {
  return ( dispatch ) => {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + authCookie;
    axios.post( '/voting-app/addpoll', 
      {
        title: title,
        options: options,
      })
      .then( ( response ) => {
        const pollData = response.data
        dispatch({
          type: GET_POLLS,
          polls: pollData
        });
      })
      .catch( ( error ) => {
        console.log('x1: ',error );
      });
  }
}

export const editExistingPoll = ( title, pollId, options, authCookie ) => {
  return ( dispatch ) => {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + authCookie;
    axios.post( '/voting-app/editpoll', 
      {
        title: title,
        options: options,
        pollId: pollId
      })
      .then( ( response ) => {
        if (response.data === "SUCCESS"){
          axios.get('/voting-app/polls')
            .then( ( response ) => {
              const pollData = response.data;
              console.log('got polls')
              dispatch({
                type: GET_POLLS,
                polls: pollData
              })
            })
            .catch( ( error ) => {
              console.log('error getting polls', error );
            });
        }
        else{
          console.log("error")
        }
      })
      .catch( ( error ) => {
        console.log('x1: ',error );
      });
  }
}

export const deleteExistingPoll = ( pollId, authCookie ) => {
  return ( dispatch ) => {
    console.log('pollid ', pollId)
    axios.defaults.headers.common['Authorization'] = 'JWT ' + authCookie;
    axios.post( '/voting-app/deletepoll', 
      {
        pollId: pollId
      })
      .then( ( response ) => {
        console.log('deleeted polls')
        if ( response.data === "SUCCESS" ){
          axios.get('/voting-app/polls')
            .then( ( response ) => {
              const pollData = response.data;
              console.log('polldata ', pollData)
              dispatch({
                type: GET_POLLS,
                polls: pollData
              })
            })
            .catch( ( error ) => {
              console.log('error getting polls', error );
            });
        }
        else{
          console.log("error")
        }
      })
      .catch( ( error ) => {
        console.log('x1: ',error );
      });
  }
}

export const setCurrentPoll = ( pollId ) => ({
  type: SET_CURRENT_POLL,
  pollId: pollId
})

export const addVote = ( uid, _id, itemId ) =>{
  return ( dispatch ) => {
    console.log('postit!1')
    checkVotePromise( uid, _id)
    .then( (resolve) => {
      console.log('resolve', resolve)
      if( resolve !== "VOTED_ALREADY"){
        axios.post( '/voting-app/voteonpoll', 
          {
            pollId: _id,
            itemId: itemId,
          })
          .then( ( response ) => {
            console.log( 'testing', response.data )
            if (response.data === "SUCCESS"){
                axios.get('/voting-app/polls')
                  .then( ( response ) => {
                    const pollData = response.data;
                    console.log('got polls')
                    dispatch({
                      type: GET_POLLS,
                      polls: pollData
                    })
                  })
                  .catch( ( error ) => {
                    console.log('error getting polls', error );
                  });
              }
              else{
                console.log("error")
              }
          })
          .catch( ( error ) => {
            console.log('x1: ',error );
          });
      }
      else{
        alert('Only one vote per user/ip is allowed per poll.')
      }
    })
    .catch( ( rejected ) =>{
      console.log( rejected );
    })
  }
}

const checkVotePromise = ( uid, pollId ) => {
  return new Promise( ( resolve, reject ) => {
    console.log('postit!')
    axios.get( '/voting-app/checkvoted', 
      {
        params:{
          uid:    uid,
          pollId: pollId
        }
      })
      .then( ( response ) => {
        console.log('got repsonse', response)
        if ( response.data === "HAS_NOT_VOTED" ){
            axios.post('/voting-app/setvoted',
              {
                uid:    uid,
                pollId: pollId
              })
              .then( ( response ) => {
                console.log( response );
                resolve("HAS_NOT_VOTED")
              })
              .catch( ( error ) => {
                console.log('there was an error')
                reject(error)
              });
          }
          else{
            console.log('voted')
            resolve("VOTED_ALREADY")
          }
      })
      .catch( ( error ) => {
        reject(error)
      });
  });
}
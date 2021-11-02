import React ,{useEffect} from 'react'
import { deleteEventInFirestore } from '../../../app/firestore/firestoreService';
import firebase from '../../../app/config/firebase'
import { Button } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
const Delete = ({event}) => {
  const history = useHistory();

    const user = firebase.auth().currentUser;
     console.log(user.uid);
      console.log(event.hostUid);


      const getCountTimeout = () => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      };
      
     function  remove(){
      deleteEventInFirestore(event.id)
      getCountTimeout();
    
      }


      
    
    

  return (
        <>
            {user.uid==event.hostUid &&
          <Button
            onClick={remove}
             
            
            color='red'
            floated='right'
            content='Delete'
          />
            }
        </>
    )
}

export default Delete

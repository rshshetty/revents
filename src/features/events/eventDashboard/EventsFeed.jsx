import React,{useEffect} from 'react'
import { Feed, FeedMeta, Header, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFeedRef, firebaseObjectToArray } from './../../../app/firestore/firebaseService';
import { listenToFeed } from './../../profiles/profileActions';
import EventFeedItem from './EventFeedItem';

const EventsFeed = () => {
  const dispatch = useDispatch();
  const {feed} = useSelector((state) => state.profile);


  useEffect(() => {
    getUserFeedRef().on('value', snapshot => {
      if (!snapshot.exists()) {
        return;
      }
      const feed = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToFeed(feed))
    })
    return () => {
      getUserFeedRef().off()
    }
  },[dispatch])




  return (
    <>
      <Header attached color='teal' icon='newspaper' content='News feed' />
      <Segment attached='bottom'>
        <Feed>
          {feed.map(post => (
          <EventFeedItem post={post} key={post.id} />
        ))}
        </Feed>
      </Segment>
    </>
  )
}

export default EventsFeed

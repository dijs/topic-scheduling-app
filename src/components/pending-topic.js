import React from 'react'
import Topic from './topic'
import Vote from './vote'

export default function PendingTopic(props) {
  const {title, upvote, score} = props
  const text = <span>{score} votes&nbsp;&nbsp;&nbsp;</span>
  const controls = <Vote title={title} upvote={upvote} />
  return <div className='list-group-item'>
    <Topic {...props} text={text} controls={controls} />
  </div>
}

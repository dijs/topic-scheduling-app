import React from 'react'
import Topic from './pending-topic'

export default function PendingTopics({topics, upvote, downvote, remove}) {

  function renderTopic({title, duration, score}, index) {
    return <Topic
      title={title}
      score={score}
      duration={duration}
      upvote={upvote}
      downvote={downvote}
      key={index}
      remove={remove}
    />
  }

  return <div>
    <h4>Pending Topics</h4>
    <div className='list-group'>
      {topics.map(renderTopic)}
    </div>
  </div>
}

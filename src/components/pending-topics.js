import React from 'react'
import Topic from './pending-topic'

export default function PendingTopics({topics, upvote, downvote}) {

  function renderTopic({title, score}, index) {
    return <Topic
      title={title}
      score={score}
      upvote={upvote}
      downvote={downvote}
      key={index}
    />
  }

  return <div>
    <h4>Pending Topics</h4>
    <div className='list-group'>
      {topics.map(renderTopic)}
    </div>
  </div>
}

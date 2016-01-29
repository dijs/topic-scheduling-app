import React from 'react'
import Topic from './pending-topic'

export default function PendingTopics({topics, upvote, remove}) {

  function renderTopic({title, description, duration, score}, index) {
    return <Topic
      title={title}
      score={score}
      description={description}
      duration={duration}
      upvote={upvote}
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

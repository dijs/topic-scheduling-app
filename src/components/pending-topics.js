import React from 'react'
import PendingTopic from './pending-topic'

export default function PendingTopics({topics, upvote, remove, edit}) {

  function renderTopic({title, description, duration, score}, index) {
    return <PendingTopic
      title={title}
      score={score}
      description={description}
      duration={duration}
      upvote={upvote}
      edit={edit}
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

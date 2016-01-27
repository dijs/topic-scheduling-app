import React from 'react'

export default function Topic({title, score = 0, upvote, downvote}) {
  return <div className='topic list-group-item'>
    <span>{title}</span>
    <span className='vote pull-right' onClick={() => downvote(title)}>⬇</span>
    <span className='vote pull-right' onClick={() => upvote(title)}>⬆&nbsp;&nbsp;</span>
    <span className='pull-right'>{score} pts&nbsp;&nbsp;&nbsp;</span>
  </div>
}

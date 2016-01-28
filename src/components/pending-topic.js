import React from 'react'

export default function Topic({title, score = 0, upvote, downvote, remove}) {
  return <div className='topic list-group-item'>
    <span>{title}</span>
    <span className='pull-right fa fa-trash' onClick={() => remove(title)}></span>
    <span className='vote pull-right' onClick={() => downvote(title)}>⬇&nbsp;&nbsp;</span>
    <span className='vote pull-right' onClick={() => upvote(title)}>⬆&nbsp;&nbsp;</span>
    <span className='pull-right'>{score} votes&nbsp;&nbsp;&nbsp;</span>
  </div>
}

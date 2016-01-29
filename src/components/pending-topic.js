import React from 'react'

export default function Topic({title, duration, score = 0, upvote, remove}) {
  return <div className='topic list-group-item'>
    <span>{title}&nbsp;</span>
    <small>({duration} mins)</small>
    <span className='pull-right fa fa-trash' onClick={() => remove(title)}></span>
    <span className='vote pull-right fa fa-thumbs-up' onClick={() => upvote(title)}>&nbsp;&nbsp;</span>
    <span className='pull-right'>{score} votes&nbsp;&nbsp;&nbsp;</span>
  </div>
}

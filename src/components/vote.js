import React from 'react'

const slug = title => title.replace(/\s+/g, '_').toLowerCase()
const hasVotedFor = title => Cookies.get(slug(title)) !== undefined
const voteFor = title => Cookies.set(slug(title), 'true')

export default function Vote({title, upvote}) {
  const handleVote = () => {
    if (hasVotedFor(title)) {
      alert(`You have alreay voted for "${title}"`)
    } else {
      upvote(title)
      voteFor(title)
    }
  }
  return <span className='fa fa-thumbs-up' onClick={handleVote}>&nbsp;&nbsp;</span>
}

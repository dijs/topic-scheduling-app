import React from 'react'
import RemoveModal from './remove-modal'
import Vote from './vote'

export default class Topic extends React.Component {
  render() {
    const {title, duration, score = 0, upvote, remove} = this.props
    const handleOpenModal = () => {
      const {removeModal} = this.refs
      removeModal.open()
    }
    return <div className='topic list-group-item'>
      <RemoveModal title={title} remove={remove} ref='removeModal' />
      <span>{title}&nbsp;</span>
      <small>({duration} mins)</small>
      <span className='pull-right fa fa-trash' onClick={handleOpenModal}></span>
      <span className='pull-right'><Vote title={title} upvote={upvote} /></span>
      <span className='pull-right'>{score} votes&nbsp;&nbsp;&nbsp;</span>
    </div>
  }
}

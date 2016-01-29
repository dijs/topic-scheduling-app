import React from 'react'
import RemoveModal from './remove-modal'

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
      <span className='vote pull-right fa fa-thumbs-up' onClick={() => upvote(title)}>&nbsp;&nbsp;</span>
      <span className='pull-right'>{score} votes&nbsp;&nbsp;&nbsp;</span>
    </div>
  }
}

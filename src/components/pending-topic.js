import React from 'react'
import RemoveModal from './remove-modal'
import Vote from './vote'
import DescriptionModal from './description-modal'

export default class Topic extends React.Component {
  render() {
    const {title, description, duration, score = 0, upvote, edit, remove} = this.props
    const handleOpenModal = () => {
      const {removeModal} = this.refs
      removeModal.open()
    }
    const handleOpenDescription = () => {
      this.refs.descriptionModal.open()
    }
    return <div className='topic list-group-item'>
      <DescriptionModal title={title} description={description} ref='descriptionModal' />
      <RemoveModal title={title} remove={remove} ref='removeModal' />
      <span>{title}&nbsp;</span>
      <small>({duration} mins)</small>
      <span className='pull-right fa fa-trash' onClick={handleOpenModal}></span>
      <span className='pull-right fa fa-info' onClick={handleOpenDescription}>&nbsp;&nbsp;</span>
      <span className='pull-right fa fa-pencil' onClick={() => edit(title)}>&nbsp;&nbsp;</span>
      <span className='pull-right'><Vote title={title} upvote={upvote} /></span>
      <span className='pull-right'>{score} votes&nbsp;&nbsp;&nbsp;</span>
    </div>
  }
}

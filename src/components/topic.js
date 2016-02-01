import React from 'react'
import RemoveModal from './remove-modal'
import DescriptionModal from './description-modal'

export default class Topic extends React.Component {
  render() {
    const {title, description, duration, edit, remove, controls, text, isStaffOverview = false} = this.props

    const openRemoveModal = () => this.refs.removeModal.open()
    const openDescriptionModal = () => this.refs.descriptionModal.open()
    const editTopic = () => edit(title)

    const defaultControls = <span>
      <DescriptionModal title={title} description={description} ref='descriptionModal' />
      <RemoveModal title={title} remove={remove} ref='removeModal' />
      <span className='fa fa-info' onClick={openDescriptionModal}>&nbsp;&nbsp;</span>
      <span className='fa fa-pencil' onClick={editTopic}>&nbsp;&nbsp;</span>
      <span className='fa fa-trash' onClick={openRemoveModal}>&nbsp;&nbsp;</span>
    </span>

    return <div>
      <span>{title}&nbsp;</span>
      <small>({duration} mins)</small>
      <div className='pull-right'>
        {text}
        {controls}
        {isStaffOverview ? '' : defaultControls}
      </div>
    </div>
  }
}

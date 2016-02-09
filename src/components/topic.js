import React from 'react'
import trunc from 'trunc-text'
import RemoveModal from './remove-modal'
import DescriptionModal from './description-modal'

const MAX_TITLE_CHARACTERS = 55

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

    return <div className='row'>
      <div className='col-md-7'>
        <span>{trunc(title, MAX_TITLE_CHARACTERS)}&nbsp;</span>
        <small>({duration} mins)</small>
      </div>
      <br className='visible-xs visible-sm' />
      <div className='col-md-5'>
        {text}
        {controls}
        {isStaffOverview ? '' : defaultControls}
      </div>
    </div>
  }
}

import 'babel-polyfill'
import React from 'react'
import Modal from './modal'

export default class RemoveModal extends React.Component {
  constructor(props) {
    super(props)
    this.open = this.open.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  open() {
    const {removeModal} = this.refs
    removeModal.open()
  }
  handleRemove() {
    const {title, remove} = this.props
    const {removeModal} = this.refs
    remove(title)
    removeModal.close()
  }
  render() {
    const {title, remove} = this.props
    const {removeModal} = this.refs
    const footer = <div>
      <button type='button' className='btn btn-default'
        onClick={() => removeModal.close()}>Cancel</button>
      <button type='button' className='btn btn-danger'
        onClick={this.handleRemove}>Remove</button>
    </div>
    const body = <p>Are you sure you want to remove "{title}"?</p>
    return <Modal title='Remove Topic' body={body} footer={footer} ref='removeModal' />
  }
}

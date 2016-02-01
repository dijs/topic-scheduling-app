import 'babel-polyfill'
import React from 'react'
import {markdown} from 'markdown'
import Modal from './modal'

export default class DescriptionModal extends React.Component {
  constructor(props) {
    super(props)
    this.open = this.open.bind(this)
  }
  open() {
    const {modal} = this.refs
    modal.open()
  }
  render() {
    const {title, description} = this.props
    const handleClose = () => {
      const {modal} = this.refs
      modal.close()
    }
    const __html = markdown.toHTML(description || '')
    const body = <p dangerouslySetInnerHTML={{__html}}></p>
    const footer = <div>
      <button type='button' className='btn btn-default' onClick={handleClose}>Close</button>
    </div>
    return <Modal title={title} body={body} footer={footer} ref='modal' />
  }
}

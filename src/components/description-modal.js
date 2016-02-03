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
    const html = markdown.toHTML(description)
    const markup = {__html: html}
    const body = <div dangerouslySetInnerHTML={markup} />
    const footer = <div>
      <button type='button' className='btn btn-default' onClick={handleClose}>Close</button>
    </div>
    return <Modal title={title} body={body} footer={footer} ref='modal' />
  }
}

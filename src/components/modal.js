import 'babel-polyfill'
import React from 'react'
import {findDOMNode} from 'react-dom'

export default class RemoveModal extends React.Component {
  constructor(props) {
    super(props)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }
  open() {
    const elem = findDOMNode(this)
    $(elem).modal('show')
  }
  close() {
    const elem = findDOMNode(this)
    $(elem).modal('hide')
  }
  render() {
    const {title, body, footer} = this.props
    return <div className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>{title}</h4>
          </div>
          <div className='modal-body'>{body}</div>
          <div className='modal-footer'>{footer}</div>
        </div>
      </div>
    </div>
  }
}

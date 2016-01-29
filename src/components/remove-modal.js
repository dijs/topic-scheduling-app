import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

export default class RemoveModal extends React.Component {
  constructor(props) {
    super(props)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  open() {
    const elem = ReactDOM.findDOMNode(this)
    $(elem).modal('show')
  }
  close() {
    const elem = ReactDOM.findDOMNode(this)
    $(elem).modal('hide')
  }
  handleRemove() {
    const {title, remove} = this.props
    remove(title)
    this.close()
  }
  render() {
    const {title, remove} = this.props
    return <div className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Remove Topic</h4>
          </div>
          <div className='modal-body'>
            <p>Are you sure you want to remove "{title}"?</p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default'
              onClick={this.close}>Cancel</button>
            <button type='button' className='btn btn-danger'
              onClick={this.handleRemove}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  }
}

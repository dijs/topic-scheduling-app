import React from 'react'

export default class AddTopicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAddTopic = this.handleAddTopic.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  handleChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  handleAddTopic() {
    this.props.addTopic(this.state.title)
    this.setState({
      title: ''
    })
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleAddTopic()
    }
  }
  render() {
    const {addTopic} = this.props
    const {title} = this.state
    return <form className='form-inline' action='#'>
      <div className='form-group'>
        <label className='sr-only'>Title</label>
        <input
          type='text'
          className='form-control'
          value={title}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder='Title' />
      </div>
      &nbsp;
      <button
        type='button'
        className='btn btn-default'
        onClick={this.handleAddTopic}>Add Topic</button>
    </form>
  }
}

import React from 'react'

const {max, min} = Math

export default class AddTopicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAddTopic = this.handleAddTopic.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.handleDurationBlur = this.handleDurationBlur.bind(this)
  }
  handleChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  handleAddTopic() {
    const {title, duration} = this.state
    this.props.addTopic({
      title,
      duration
    })
    this.setState({
      title: '',
      duration: '0'
    })
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleAddTopic()
    }
  }
  handleDurationBlur(e) {
    const n = parseInt(this.state.duration, 10)
    // TODO: Put this logic in reducer
    this.setState({
      duration: max(min(n, 60), 10)
    })
  }
  handleDurationChange(e) {
    this.setState({
      duration: e.target.value
    })
  }
  render() {
    const {addTopic} = this.props
    const {title, duration} = this.state
    return <form className='form-inline' action='#'>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          value={title}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder='Title' />
      </div>
      &nbsp;
      <div className='form-group'>
        <input
          type='text'
          onChange={this.handleDurationChange}
          onBlur={this.handleDurationBlur}
          value={duration}
          onKeyDown={this.handleKeyDown}
          style={{width:'70px'}}
          className='form-control'
          placeholder='mins' />
      </div>
      &nbsp;
      <button
        type='button'
        className='btn btn-default'
        onClick={this.handleAddTopic}>Add Topic</button>
    </form>
  }
}

import React from 'react'
const {max, min} = Math

export default class TopicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleAction = this.handleAction.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
    this.handleDurationBlur = this.handleDurationBlur.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.setTopic = this.setTopic.bind(this)
  }
  setTopic(topic) {
    const {title, duration, description} = topic
    this.setState({title, duration, description})
  }
  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleAddTopic()
    }
  }
  handleDurationBlur(e) {
    const n = parseInt(this.state.duration, 10)
    this.setState({
      duration: max(min(n, 60), 10)
    })
  }
  handleDurationChange(e) {
    this.setState({
      duration: e.target.value
    })
  }
  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    })
  }
  handleAction() {
    const {action} = this.props
    action(this.state)
    this.setState({
      title: '',
      description: '',
      duration: '0'
    })
  }
  render() {
    const {actionLabel} = this.props
    const {title, duration, description} = this.state
    const descriptionStyles = {
      margin: '10px 0',
      width: '100%',
      height: '150px'
    }
    return <form className='form-inline' action='#'>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          value={title}
          onChange={this.handleTitleChange}
          onKeyDown={this.handleKeyDown}
          placeholder='Title' />
      </div>
      &nbsp;&nbsp;
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
      <br />
      <textarea
        style={descriptionStyles}
        className='form-control'
        name='description'
        onChange={this.handleDescriptionChange}
        value={description}
        placeholder='This is a description.' />
      <br />
      <button
        type='button'
        className='btn btn-default'
        onClick={this.handleAction}>{actionLabel}</button>
    </form>
  }
}

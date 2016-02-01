import React from 'react'
import PendingTopics from '../components/pending-topics'
import ScheduledTopics from '../components/scheduled-topics'
import TopicForm from '../components/topic-form'
import {find} from 'lodash'

const TEST_URL = 'https://samplechat.firebaseio-demo.com/test-data'
const firebaseUrl = process.env.FIREBASE_URL || TEST_URL

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddTopic = this.handleAddTopic.bind(this)
    this.handleUpvote = this.handleUpvote.bind(this)
    this.handleMoveTopic = this.handleMoveTopic.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleEditTopic = this.handleEditTopic.bind(this)
    this.state = {
      editing: false,
      title: ''
    }
  }
  componentWillMount() {
    const {dispatch} = this.props
    this.firebaseRef = new Firebase(firebaseUrl)
    this.firebaseRef.on('child_added', data => {
      const action = data.val()
      if (action.type && action.payload) {
        dispatch(action)
      }
    })
  }
  componentWillUnmount() {
    this.firebaseRef.off()
  }
  handleAddTopic(topic) {
    this.firebaseRef.push({
      type: 'ADD_TOPIC',
      payload: topic
    })
  }
  handleEditTopic(title, topic) {
    this.firebaseRef.push({
      type: 'EDIT_TOPIC',
      payload: {
        title,
        topic
      }
    })
  }
  handleUpvote(title) {
    this.firebaseRef.push({
      type: 'UPVOTE_TOPIC',
      payload: {title}
    })
  }
  handleMoveTopic(data) {
    this.firebaseRef.push({
      type: 'MOVE_TOPIC',
      payload: data
    })
  }
  handleRemove(title) {
    this.firebaseRef.push({
      type: 'REMOVE_TOPIC',
      payload: {title}
    })
  }
  handleEdit(title) {
    const {pending} = this.props
    const topic = find(pending, topic => topic.title === title)
    if (topic) {
      this.refs.topicForm.setTopic(topic)
      this.setState({
        editing: true,
        title: topic.title
      })
    }
  }
  render() {
    const {pending, scheduled} = this.props
    const {editing, title} = this.state

    const editAction = topic => this.handleEditTopic(title, topic)
    const addAction = topic => this.handleAddTopic(topic)

    const topicForm = <TopicForm
      ref='topicForm'
      action={editing ? editAction : addAction}
      actionLabel={editing ? 'Save' : 'Add'} />

    return <div className='container'>
      <br />
      <div className='row'>
        <div className='col-md-6'>
          <PendingTopics
            topics={pending}
            edit={this.handleEdit}
            upvote={this.handleUpvote}
            remove={this.handleRemove} />
          {topicForm}
        </div>
        <div className='col-md-6'>
          <ScheduledTopics
            topics={scheduled}
            moveTopic={this.handleMoveTopic}
            remove={this.handleRemove} />
        </div>
      </div>
    </div>
  }
}

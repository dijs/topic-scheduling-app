import React from 'react'
import PendingTopics from '../components/pending-topics'
import ScheduledTopics from '../components/scheduled-topics'
import AddTopicForm from '../components/add-topic'

const TEST_URL = 'https://samplechat.firebaseio-demo.com/test-data'
const firebaseUrl = process.env.FIREBASE_URL || TEST_URL

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddTopic = this.handleAddTopic.bind(this)
    this.handleUpvote = this.handleUpvote.bind(this)
    this.handleDownvote = this.handleDownvote.bind(this)
    this.handleMoveTopic = this.handleMoveTopic.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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
  handleUpvote(title) {
    this.firebaseRef.push({
      type: 'UPVOTE_TOPIC',
      payload: {title}
    })
  }
  handleDownvote(title) {
    this.firebaseRef.push({
      type: 'DOWNVOTE_TOPIC',
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
  render() {
    const {pending, scheduled} = this.props
    return <div className='container'>
      <br />
      <div className='row'>
        <div className='col-md-6'>
          <PendingTopics
            topics={pending}
            upvote={this.handleUpvote}
            remove={this.handleRemove}
            downvote={this.handleDownvote} />
          <AddTopicForm addTopic={this.handleAddTopic} />
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

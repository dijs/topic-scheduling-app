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
  }
  componentWillMount() {
    const {dispatch} = this.props
    this.firebaseRef = new Firebase(firebaseUrl)
    this.firebaseRef.on('child_added', data => {
      const action = data.val()
      if (action.type) {
        dispatch(action)
      }
    })
  }
  componentWillUnmount() {
    this.firebaseRef.off()
  }
  handleAddTopic(title) {
    this.firebaseRef.push({
      type: 'ADD_TOPIC',
      payload: {title}
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
  render() {
    const {pending, scheduled} = this.props
    return <div className='container'>
      <br />
      <div className='row'>
        <div className='col-md-6'>
          <PendingTopics
            topics={pending}
            upvote={this.handleUpvote}
            downvote={this.handleDownvote} />
          <AddTopicForm addTopic={this.handleAddTopic} />
        </div>
        <div className='col-md-6'>
          <ScheduledTopics topics={scheduled} moveTopic={this.handleMoveTopic} />
        </div>
      </div>
    </div>
  }
}

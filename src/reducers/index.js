import {handleActions} from 'redux-actions'
import {Map, OrderedMap, List} from 'immutable'
import {ADD_TOPIC, UPVOTE_TOPIC, DOWNVOTE_TOPIC, MOVE_TOPIC, REMOVE_TOPIC} from '../actions'

const initialTopics = new Map({
  pending: new OrderedMap(),
  scheduled: new List()
})

const TOPIC_SCHEDULED_VOTE_THRESHOLD = 7

const scoreDescending = topic => -topic.get('score')

const reducer = handleActions({
  [ADD_TOPIC]: (topics, action) => {
    const {title, duration} = action.payload
    const topic = Map({
      score: 0,
      duration,
      title
    })
    const pending = topics.get('pending')
      .set(title, topic)
      .sortBy(scoreDescending)
    return topics.set('pending', pending)
  },
  [UPVOTE_TOPIC]: (topics, action) => {
    const {title} = action.payload
    const topic = topics.get('pending').get(title)
    const score = topic.get('score')
    const updatedTopic = topic.set('score', score + 1)
    if (updatedTopic.get('score') === TOPIC_SCHEDULED_VOTE_THRESHOLD) {
      const updatedTopics = topics.set('pending', topics.get('pending')
        .delete(title)
        .sortBy(scoreDescending))
      return updatedTopics.set('scheduled', topics.get('scheduled').push(updatedTopic))
    } else {
      return topics.set('pending', topics.get('pending').set(title, updatedTopic).sortBy(scoreDescending))
    }
  },
  [DOWNVOTE_TOPIC]: (topics, action) => {
    const {title} = action.payload
    const topic = topics.get('pending').get(title)
    const updatedTopic = topic.set('score', topic.get('score') - 1)
    return topics.set('pending', topics.get('pending').set(title, updatedTopic).sortBy(scoreDescending))
  },
  [MOVE_TOPIC]: (topics, action) => {
    const {source, target} = action.payload
    const sourceIndex = topics.get('scheduled').findIndex(topic => topic.get('title') === source.title)
    const targetIndex = topics.get('scheduled').findIndex(topic => topic.get('title') === target.title)
    const sourceTopic = topics.get('scheduled').get(sourceIndex).toJS()
    let list = topics.get('scheduled').valueSeq().toJS().filter(topic => topic.title !== sourceTopic.title)
    list.splice(targetIndex, 0, sourceTopic)
    const items = list.map(item => new Map(item))
    return topics.set('scheduled', new List(items))
  },
  [REMOVE_TOPIC]: (topics, action) => {
    const {title} = action.payload
    if (topics.get('pending').has(title)) {
      const updatedPending = topics.get('pending')
        .delete(title)
        .sortBy(scoreDescending)
      return topics.set('pending', updatedPending)
    }
    const index = topics.get('scheduled')
      .findIndex(topic => topic.get('title') === title)
    if (index !== -1) {
      const updatedScheduled = topics.get('scheduled').delete(index)
      return topics.set('scheduled', updatedScheduled)
    }
    return topics
  }
}, initialTopics)

export default reducer

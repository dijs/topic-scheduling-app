import 'babel-polyfill'
import React from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {getThursdays} from '../utils'
import ScheduledTopic from './scheduled-topic'

class ScheduledTopics extends React.Component {
  render() {
    const {topics, connectDropTarget, moveTopic, remove} = this.props

    const reviewedTopics = getThursdays(topics)

    function renderTopic(topic, index) {
      return <ScheduledTopic {...topic} key={index} moveTopic={moveTopic} remove={remove} />
    }

    return <div>
      <h4>Scheduled Topics</h4>
      <div className='list-group'>
        {reviewedTopics.map(renderTopic)}
      </div>
    </div>
  }
}

export default DragDropContext(HTML5Backend)(ScheduledTopics)

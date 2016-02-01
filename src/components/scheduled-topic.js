import React from 'react'
import {DragSource} from 'react-dnd'
import {DropTarget} from 'react-dnd'
import flow from 'lodash/flow'
import Topic from './topic'

const usingTitle = ({title}) => {title}

var topicTarget = {
  drop: usingTitle
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const topicSource = {
  beginDrag: usingTitle,
  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const {moveTopic} = props
    const source = monitor.getItem()
    const target = monitor.getDropResult()
    moveTopic({source, target})
  }
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function ScheduledTopic (props) {
  const {isDragging, connectDragSource, connectDropTarget, date, isStaffOverview} = props
  const style = {
    cursor: isStaffOverview ? '' : 'move',
    opacity: isDragging ? 0.5 : 1
  }
  const text = <time>{date}&nbsp;&nbsp;</time>
  const topic = <Topic {...props}
    isStaffOverview={isStaffOverview}
    text={text} />
  const item = <div className='list-group-item' style={style}>{topic}</div>
  if (isStaffOverview) {
    return item
  }
  return connectDropTarget(connectDragSource(item))
}

const target = DropTarget('TOPIC', topicTarget, targetCollect)
const source = DragSource('TOPIC', topicSource, sourceCollect)

export default flow(target, source)(ScheduledTopic)

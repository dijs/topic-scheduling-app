import React from 'react'
import {DragSource} from 'react-dnd'
import {DropTarget} from 'react-dnd'
import {flow} from 'lodash'

function usingTitle({title}) {
  return {title}
}

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

class ScheduledTopic extends React.Component {
  render() {
    const {isDragging, connectDragSource, connectDropTarget, title, date, index, isStaffOverview, remove} = this.props
    const style = {
      cursor: isStaffOverview ? '' : 'move',
      opacity: isDragging ? 0.5 : 1
    }
    const removeButton = <span className='pull-right fa fa-trash' onClick={() => remove(title)}></span>
    const item = <div className='list-group-item' style={style}>
      {isStaffOverview ? '' : removeButton}
      <span>{title}</span>
      <time className='pull-right'>{date}&nbsp;&nbsp;</time>
    </div>
    if (isStaffOverview) {
      return item
    }
    return connectDropTarget(connectDragSource(item))
  }
}

const target = DropTarget('TOPIC', topicTarget, targetCollect)
const source = DragSource('TOPIC', topicSource, sourceCollect)

export default flow(target, source)(ScheduledTopic)

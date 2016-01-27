import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Root from '../components/root'
import * as Actions from '../actions'

function mapStateToProps(topics) {
  return {
    pending: topics.get('pending').valueSeq().toJS(),
    scheduled: topics.get('scheduled').valueSeq().toJS()
  }
}

function mapDispatchToProps(dispatch) {
  const creators = bindActionCreators(Actions, dispatch)
  creators.dispatch = dispatch
  return creators
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)

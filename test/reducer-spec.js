import 'should'
import reducer from '../src/reducers'
import {ADD_TOPIC, UPVOTE_TOPIC, DOWNVOTE_TOPIC, MOVE_TOPIC} from '../src/actions'

describe('Reducers', () => {

  it('should add topic to pending', () => {
    let state = reducer(undefined, {
      type: ADD_TOPIC,
      payload: {title: 'first'}
    })
    state.get('pending').get('first').get('score').should.equal(0)
    reducer(state, {
      type: ADD_TOPIC,
      payload: {title: 'second'}
    }).get('pending').size.should.equal(2)
  })

  it('should upvote topic in pending', () => {
    let state = reducer(undefined, {
      type: ADD_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state.get('pending').get('test').get('score').should.equal(1)
  })

  it('should sort topics in pending after voting', () => {
    let state = reducer(undefined, {
      type: ADD_TOPIC,
      payload: {title: 'second'}
    })
    state = reducer(state, {
      type: ADD_TOPIC,
      payload: {title: 'first'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'first'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'first'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'second'}
    })
    state.get('pending').valueSeq().get(0).get('score').should.equal(2)
    state.get('pending').valueSeq().get(0).get('title').should.equal('first')
    state.get('pending').valueSeq().get(1).get('score').should.equal(1)
  })

  it('should downvote topic in pending', () => {
    let state = reducer(undefined, {
      type: ADD_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: DOWNVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state.get('pending').get('test').get('score').should.equal(0)
  })

  it('should move topic from pending to scheduled', () => {
    let state = reducer(undefined, {
      type: ADD_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state = reducer(state, {
      type: UPVOTE_TOPIC,
      payload: {title: 'test'}
    })
    state.get('pending').has('test').should.be.false()
    state.get('scheduled').get(0).get('title').should.equal('test')
  })

  it('should sort topic in scheduled', () => {
    let state = reducer(undefined, {
      type: ADD_TOPIC,
      payload: {title: 'first'}
    })
    state = reducer(state, {
      type: ADD_TOPIC,
      payload: {title: 'second'}
    })
    state = reducer(state, {
      type: ADD_TOPIC,
      payload: {title: 'third'}
    })
    for(var i = 0; i < 7; i++) {
      state = reducer(state, {
        type: UPVOTE_TOPIC,
        payload: {title: 'first'}
      })
    }
    for(var i = 0; i < 7; i++) {
      state = reducer(state, {
        type: UPVOTE_TOPIC,
        payload: {title: 'second'}
      })
    }
    for(var i = 0; i < 7; i++) {
      state = reducer(state, {
        type: UPVOTE_TOPIC,
        payload: {title: 'third'}
      })
    }
    state.get('scheduled').get(0).get('title').should.equal('first')
    state.get('scheduled').get(1).get('title').should.equal('second')
    state.get('scheduled').get(2).get('title').should.equal('third')
    state = reducer(state, {
      type: MOVE_TOPIC,
      payload: {
        source: {title:'third'},
        target: {title:'first'}
      }
    })
    state.get('scheduled').get(0).get('title').should.equal('third')
    state.get('scheduled').get(1).get('title').should.equal('first')
    state.get('scheduled').get(2).get('title').should.equal('second')
    state = reducer(state, {
      type: MOVE_TOPIC,
      payload: {
        source: {title:'second'},
        target: {title:'third'}
      }
    })
    state.get('scheduled').get(0).get('title').should.equal('second')
    state.get('scheduled').get(1).get('title').should.equal('third')
    state.get('scheduled').get(2).get('title').should.equal('first')
  })

})

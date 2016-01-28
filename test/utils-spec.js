import 'should'
import {getThursdays} from '../src/utils'
import sinon from 'sinon'

describe('utils', () => {

  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should create schedule', () => {
    const topics = [{
      title: 'first',
      duration: 30
    },{
      title: 'second',
      duration: 30
    },{
      title: 'third',
      duration: 60
    }]
    const schedule = getThursdays(topics)
    schedule.length.should.equal(4)
    schedule[0].title.should.startWith('Staff')
    schedule[0].date.toString().should.startWith('January 1st')
    schedule[1].title.should.startWith('first')
    schedule[1].date.toString().should.startWith('January 8th')
    schedule[2].title.should.startWith('second')
    schedule[2].date.toString().should.startWith('January 8th')
    schedule[3].title.should.startWith('third')
    schedule[3].date.toString().should.startWith('January 15th')
  })

})

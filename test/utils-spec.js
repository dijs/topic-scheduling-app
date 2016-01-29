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
      duration: 52
    },{
      title: 'second',
      duration: 20
    },{
      title: 'third',
      duration: 40
    },{
      title: 'fourth',
      duration: 60
    }]
    const schedule = getThursdays(topics)
    schedule.length.should.equal(5)
    schedule[0].title.should.startWith('Staff')
    schedule[0].date.toString().should.startWith('January 1st')
    schedule[1].title.should.startWith('first')
    schedule[1].date.toString().should.startWith('January 8th')
    schedule[2].title.should.startWith('second')
    schedule[2].date.toString().should.startWith('January 15th')
    schedule[3].title.should.startWith('third')
    schedule[3].date.toString().should.startWith('January 15th')
    schedule[4].title.should.startWith('fourth')
    schedule[4].date.toString().should.startWith('January 22nd')
  })

  it('should create schedule v2', () => {
    const topics = [{
      title: 'first',
      duration: 20
    },{
      title: 'second',
      duration: 45
    },{
      title: 'third',
      duration: 40
    },{
      title: 'fourth',
      duration: 55
    },{
      title: 'fifth',
      duration: 30
    }]
    const schedule = getThursdays(topics)
    schedule.length.should.equal(7)
    schedule[0].title.should.startWith('Staff')
    schedule[0].date.toString().should.startWith('January 1st')
    schedule[1].title.should.startWith('first')
    schedule[1].date.toString().should.startWith('January 8th')
    schedule[2].title.should.startWith('second')
    schedule[2].date.toString().should.startWith('January 15th')
    schedule[3].title.should.startWith('third')
    schedule[3].date.toString().should.startWith('January 22nd')
    schedule[4].title.should.startWith('fourth')
    schedule[4].date.toString().should.startWith('January 29th')
    schedule[5].title.should.startWith('Staff')
    schedule[5].date.toString().should.startWith('February 5th')
    schedule[6].title.should.startWith('fifth')
    schedule[6].date.toString().should.startWith('February 12th')
  })

})

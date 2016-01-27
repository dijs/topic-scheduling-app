import 'should'
import {sort} from '../src/utils'

describe('utils', () => {

  it('should sort dates', () => {
    const data = [1, 2, 3, 4]
    sort(data, 3, 1).should.deepEqual([1, 4, 2, 3])
    sort(data, 1, 0).should.deepEqual([2, 1, 3, 4])
    sort(data, 0, 3).should.deepEqual([2, 3, 4, 1])
    sort(data, 2, 1).should.deepEqual([1, 3, 2, 4])
  })

})

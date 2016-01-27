import moment from 'moment'

const thursday = 4
const daysInWeek = 7

function nextThursday() {
  const today = moment().day()
  if (today < thursday) {
    return moment().add(thursday - today, 'days')
  } else {
    return moment().add(thursday - today + daysInWeek, 'days')
  }
}

export function getThursdays(topics) {
  let next = nextThursday()
  let daysAhead = 0
  let thursdays = []
  topics.forEach(topic => {
    var current = moment(next).add(daysAhead, 'days')
    var date = current.format('MMMM Do YYYY')
    if (current.date() < 7) {
      thursdays.push({
        title: 'Staff Overview (Mandatory)',
        isStaffOverview: true,
        date
      })
      daysAhead += daysInWeek
      current = moment(next).add(daysAhead, 'days')
      date = current.format('MMMM Do YYYY')
    }
    thursdays.push({
      title: topic.title,
      date
    })
    daysAhead += daysInWeek
  })
  return thursdays
}

export function sort (array, fromIndex, toIndex) {
  const temp = array[fromIndex]
  const without = array.filter((e, index) => index !== fromIndex)
  without.splice(toIndex, 0, temp)
  return without
}

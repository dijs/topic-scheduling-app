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
  let minutes = 0
  topics.forEach(topic => {
    var current = moment(next).add(daysAhead, 'days')
    var date = current.format('MMMM Do YYYY')
    const isStaffOverview = current.date() < 7
    const {title, duration} = topic
    if (isStaffOverview) {
      thursdays.push({
        title: 'Staff Overview (Mandatory)',
        duration: 60,
        isStaffOverview,
        date
      })
      daysAhead += daysInWeek
      current = moment(next).add(daysAhead, 'days')
      date = current.format('MMMM Do YYYY')
    }
    thursdays.push({
      title,
      duration,
      date
    })
    minutes += topic.duration
    if (minutes >= 60) {
      minutes = 0
      daysAhead += daysInWeek
    }
  })
  return thursdays
}

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

function createStaffTopic(date) {
  return {
    title: 'Staff Overview (Mandatory)',
    duration: 60,
    isStaffOverview: true,
    date
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
    const {title, duration, description} = topic

    if (current.date() < 7) {
      thursdays.push(createStaffTopic(date))
      daysAhead += daysInWeek
      current = moment(next).add(daysAhead, 'days')
      date = current.format('MMMM Do YYYY')
      minutes = 0
    }

    minutes += duration
    if (minutes > 60) {
      minutes = duration
      daysAhead += daysInWeek
      current = moment(next).add(daysAhead, 'days')
      date = current.format('MMMM Do YYYY')
    }

    if (current.date() < 7) {
      thursdays.push(createStaffTopic(date))
      daysAhead += daysInWeek
      current = moment(next).add(daysAhead, 'days')
      date = current.format('MMMM Do YYYY')
      minutes = 0
    }

    thursdays.push({
      title,
      duration,
      date,
      description
    })

  })
  return thursdays
}

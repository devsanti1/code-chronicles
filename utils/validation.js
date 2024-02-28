import moment from "moment";

const patterns = {}
patterns.email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
patterns.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/
patterns.username = /^[a-z0-9_.-]{3,20}$/;

const myDate = (day, month, year) => {
  return `${(day).toString().padStart(2, "0")}/${(month + 1).toString().padStart(2, "0")} ${year}`
}

const toMoment = (date) => {
  const splitted = date.replace(" ", "/").split("/")
  return moment({ year: splitted[2], month: parseInt(splitted[1]) - 1, day: splitted[0] })
}

export { patterns, myDate, toMoment }
import moment from "moment";

const patterns = {}
patterns.email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
patterns.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/
patterns.username = /^[a-z0-9_.-]{3,20}$/;

const myDate = (date) => {
  if (date[0] === "-") {
    date = date.slice(1).split("-")
    return `${date[2]}/${date[1]} -${parseInt(date[0])}`
  } else {
    date = date.split("-")
    return `${date[2]}/${date[1]} ${date[0]}`
  }
}

const toMoment = (date) => {
  return moment(date).format("YYYY-MM-DD")
}

const myDecodingURI = (encodedURI) => {
  return JSON.parse(decodeURIComponent(JSON.stringify(encodedURI)))
}

export { patterns, myDate, toMoment, myDecodingURI }
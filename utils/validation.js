const patterns = {}
patterns.email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
patterns.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/
patterns.username = /^[a-z0-9_.-]{3,20}$/;

const myDate = (day, month, year) => {
  return `${(day).toString().padStart(2, "0")}/${(month + 1).toString().padStart(2, "0")} ${year}`
}

export { patterns, myDate }
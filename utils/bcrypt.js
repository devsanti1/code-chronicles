import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

export default {
  generateHash: async (password) => {
    return await bcrypt.hash(password, (await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))))
  },
  compareHash: async (password, hash) => {
    return await bcrypt.compare(password, hash)
  }
}
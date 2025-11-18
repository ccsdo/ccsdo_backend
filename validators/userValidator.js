const {z} = require("zod")

const sanitizeInput = require("../utils/sanitize");

const userSchema = z.object({
    username : z.string().email().transform(val => sanitizeInput(val)),
    password:z.string(),
})

module.export = userSchema
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRoutes.js"
import todoRouter from "./routes/todoRoutes.js"
const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.static(path.join(__dirname, "../public")))

app.use("/auth", authRouter)
app.use("/todos", todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})
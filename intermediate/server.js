import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.static(path.join(__dirname, "../public")))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})
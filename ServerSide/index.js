import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
import connectDB from "./db/index.js";
import { app } from './app.js'; 

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch((error) => {
    console.log("Connection is not established", error)
})


import express from "express"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from "cors"
import chatRoutes from "./routes/chat.routes.js"
import path from "path"
import { fileURLToPath } from "url";

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin:"https://perplexity-qfgq.onrender.com",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))

//routes
app.use("/api/auth",authRoutes)
app.use("/api/chats",chatRoutes)

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// React fallback (LAST)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app
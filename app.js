import express from "express";
import router from "./src/routes/language.routes.js";
import {start_DB} from "./src/config/database.js"


const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api", router);

app.use((req, res)=>{
    res.status(404).json({errorMessage: "Direction not found."});
});

start_DB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Servidor corriendo en http://localhost:"+PORT);
    });
});
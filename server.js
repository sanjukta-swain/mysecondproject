import express from 'express';
import bodyparser from 'body-parser'

// module to import database users
import userRoutes from'./routes/users.js'

const app = express();
const PORT = 5000

app.use(bodyparser.json());

app.get("/",(req,res) => {
    console.log('[GET ROUTE]')
    res.send("hello from homepage")
})

// make all users available at the route path
app.use('/users',userRoutes);

app.listen(PORT,() => {
    console.log(`server running on port: http://localhost:${PORT}`)
})
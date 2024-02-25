require('dotenv').config()

const expres = require(expres)
const app = express()

app.get('/',(req,res)=>{
    res.send("<h1>hello to login auth</h1>")
})

module.exports =app
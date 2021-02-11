const db = require('./database/mySqlDb');
const port = process.env.PORT || 3333

db.connect((err) => {
    if(err){
        throw(err)
    }
    console.log("database connected");
    const app = require('./app')(db)

    app.listen(port, () => {
        console.log(`Server is running on ${port} port`)
    })
})


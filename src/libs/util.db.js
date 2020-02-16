import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
// console.log(process.env)
const adapter = new LocalStorage(`coframe-${process.env.VUE_APP_VERSION}`)
    // console.log(adapter)
const db = low(adapter)
    // console.log(db)

db.defaults({
    sys: {},
    database: {}
}).write()

export default db
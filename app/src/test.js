const jwt = require('jsonwebtoken')

const res = jwt.sign({ id: 'id', email: 'email' }, 'sdfdsfdsklfjds;klfj;dsf')
console.log(res)

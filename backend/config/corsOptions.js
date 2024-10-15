const allowedOrigins = require('./allowedOrigin')

const corsOPtions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            // allow requests with no `origin` header.
            // The response will be used without any additional headers.
            callback(null, true)
        }else{
            callback(new Error("Invalid Origin"))
            console.log(`Invalid CORS request from ${origin}`)
        }
    },
    Credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOPtions
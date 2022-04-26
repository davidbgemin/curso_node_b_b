const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // conexión a mongodb:
        await mongoose.connect(process.env.MONGODB_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err, resp) => {
            if (err) throw err;
            console.log('Base de datos ONLINE');
        })

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}
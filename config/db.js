const mongoose = require('mongoose');

const connection = async () =>{ 
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb is connected with ${connection.host}`);
}

module.exports = connection;

/// const connect = async function connection(){
// try{
//    await mongoose.connect(url,{UseNewUrlParser:true, useUnifiedTopology:true})
// .then(()=>{
//     console.log('connection has been established successfully!');
// }).catch((error)=>{
//     console.log(error);
// })
// }catch(error){console.log(error);}
   
// }
// module.exports = connect;

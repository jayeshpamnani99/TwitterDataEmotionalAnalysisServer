var MongoClient = require('mongodb').MongoClient;

var db = null;


const DATABASE_URL = process.env.DATABASE_URL;


module.exports = {
	connect : () =>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect(DATABASE_URL,{useNewUrlParser:true, useUnifiedTopology:true},(err,client)=>{
				if(err){
					reject(err);
				}else{
					db = client.db("twitter_analytics");

					resolve();
				}
			})
		})
	},
	get : ()=>{
		return db;
	},
	
	close: async (client) => {
	  //client.close();
	  return true;
	}
	};

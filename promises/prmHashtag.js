const db = require('./prmConnection').get();

module.exports = {
    getHashtags : (pageno=0,limit=12)=>{
        return new Promise((resolve,reject)=>{
            db.collection("hashtags").find({}).sort({count:-1}).skip(pageno*limit).limit(limit).toArray((err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    },
    getHashtag : (hashtag)=>{
        return new Promise((resolve,reject)=>{
            db.collection("hashtags").findOne({hashtag:hashtag},(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
 
                }
            })
        })
    },
    getHashtagHistory : (hashtag, {startDate,endDate} = {})=>{
        return new Promise((resolve,reject)=>{

            var query = {hashtag:hashtag}

            if(startDate && endDate){
                Object.assign(query,{$and:[{timestamp:{$gte:startDate}},{timestamp:{$lte:endDate}}]});
            }

            
            db.collection("hashtag").find(query).sort({timestamp:-1}).toArray((err,result)=>{
                if(err){
                    reject();
                }else{
                    resolve(result);
                }
            })
        })
    },
    searchHashtag : (hashtag)=>{
        return new Promise((resolve,reject)=>{

            console.log(hashtag);

            db.collection("hashtags").find({hashtag:{$regex:".*"+hashtag+".*",$options:'i'}},{fields:{_id:0,hashtag:1}}).limit(10).toArray((err,result)=>{
                if(err){
                    reject();
                }else{
                    resolve(result);
                }
            })
        })
    }

}
var express = require('express');

const router = express.Router();

const {query,validationResult} = require('express-validator');

var prmHashtag = require('../promises/prmHashtag');

router.get('/hashtags',[
    query('pageno').optional({nullable:true}).isInt({min:0}).toInt()
],(req,res)=>{

    if(validationResult(req).isEmpty()){
        const pageno = req.query.pageno;
        (
            async ()=>{
                try{
    
                    const hashtags = await prmHashtag.getHashtags(pageno)
                    
                    var processedHashtags = [];

                    for(var i=0;i<hashtags.length;i++){

                        const currentHashtag = hashtags[i];

                        processedHashtags[i] = Object.assign({},{hashtag:currentHashtag.hashtag,count:currentHashtag.count,tones:(currentHashtag.tones && currentHashtag.tones.length > 0)?currentHashtag.tones[currentHashtag.tones.length-1]:{}})

                    }

                    res.send(processedHashtags);

                }catch(e){
                    console.log(e);
                    res.status(500).json({msg:"Something Went Wrong"})
                }
            }
        )();    
    }else{
        res.status(500).json({msg:"Something Went Wrong"})
    }
    
})  

router.get('/',[
    query('hashtag').isString().trim().escape(),
    query('startDate').optional({nullable:true}).isString().trim().escape(),
    query('endDate').isString().optional({nullable:true}).trim().escape(),
],(req,res)=>{

    if(validationResult(req).isEmpty()){

        const hashtag = req.query.hashtag;
        const startDate = (req.query.startDate)?new Date(startDate):null; 
        const endDate = (req.query.endDate)?new Date(endDate):null;

        (
            async ()=>{
                try{


                    const currentHashtag = await prmHashtag.getHashtag(hashtag);

                    // const hashtagHistory = await prmHashtag.getHashtagHistory(hashtag,{startDate:startDate,endDate:endDate});

                    res.json({hashtag:currentHashtag.hashtag,tweets:currentHashtag.tweets,count:currentHashtag.count,tones:currentHashtag.tones});

                }catch(err){
                    res.status(500).json({msg:"Something Went Wrong"});
                }
            }
        )();

    }else{
        res.status(500).json({msg:"Something Went Wrong"});
    }

})


router.get('/search',[
    query('hashtag').isAlphanumeric().trim().escape().isLength({min:1,max:50})
],(req,res)=>{

    if(validationResult(req).isEmpty()){    
        const hashtag = req.query.hashtag;

        (
            async ()=>{
                try{
                    const suggestions = await prmHashtag.searchHashtag(hashtag);

                    res.send(suggestions);
                }catch(e){
                    res.status(500).json({msg:"Something Went Wrong"});
                }
            }
        )();

    }else{
        res.status(500).json({msg:"Something Went Wrong"});
    }

})



module.exports = router;
(
    async ()=>{
        try{

            require('dotenv').config({});

            await require('./promises/prmConnection').connect();

            var express = require('express');

            var router = express.Router();

            var hashtagRouter = require('./routes/hashtag');



            router.use('/hashtag',hashtagRouter);
            //router.use();

            var app = express();

            const cors = require('cors');

            app.use(cors({origin:"http://localhost:3000",credentials:true}));

            app.use('/v1',router);
            app.use('*',(req,res)=>{
                res.send("Path Not Found");
            })

            app.listen(process.env.PORT,()=>{
                console.log("Listening on : " + process.env.PORT);
            });

        }catch(err){
            console.log(err);
        }
    }
)();

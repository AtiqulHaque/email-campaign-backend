var QUEUE_URL = 'https://sqs.ap-southeast-1.amazonaws.com/878799435537/metigyEmailCampaignQueue';
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({region : 'ap-southeast-1'});
const mysql = require('mysql');



exports.handler = function(event, context) {
  
  console.log(event);
  
  const con = mysql.createConnection ({
        host     : "rds-campaign.ccwrcwjkxjrb.ap-southeast-1.rds.amazonaws.com",
        user     : "campaignadmin",
        password : "123qweqaz",
        port     : 3306,
        database : "metigy-campaign"
    });
    
    
    
    con.connect(function(err) {
        if (err) throw err;
        
        console.log("Successfully conntected !");
        
         var sql = "SELECT * FROM contacts limit 50";
         
         con.query(sql, function (err, result) {
            
            if (err) throw err;
            
            console.log(result.length);
            
            let chunk = 8;
            let i = 0;
            let j = result.length;
            let temporary = null;
            
            
            for (i = 0 ; i < j; i += chunk) {
                temporary = result.slice(i, i + chunk);
                
                for(let k = 0; k < temporary.length; k++){
                  
                    var params = {
                      MessageBody: JSON.stringify(temporary[k]),
                      QueueUrl: QUEUE_URL
                    };
                    sqs.sendMessage(params, function(err,data){
                      if(err) {
                        console.log('error:',"** Failed to write to queue **" + err);
                        context.done('error', "** ERROR writing to SQS **");  	// ERROR when trying to enqueue to SQS
                      }else{
                        console.log('data:',data.MessageId);
                        context.done(null,'');  
                      }
                    });
                  
                }
            }
              
            
            
            
         });
         
         
    });
    
    
    
  
  
  
  
  
}





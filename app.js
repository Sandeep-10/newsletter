const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
      const FirstName=req.body.fname;
      const LastName=req.body.lname;
      const email=req.body.email;
      const data={
        members:[
          {
            email_address:email,
            status:"subscribed",
            merge_fields:{
              FNAME:FirstName,
              LNAME:LastName
            }
          }]
      };
      var jsonData=JSON.stringify(data);
      const url="xxx";
      const options={
        method: "POST",
        auth:"xxx"
      }
      const request=https.request(url,options,function(response){
        response.on("data",function(data){
          console.log(JSON.parse(data));
        });
        if(response.statusCode===200){
          res.sendFile(__dirname+"/success.html")
        }
        else{
          res.sendFile(__dirname+"/failure.html")
        }
      });
      request.write(jsonData);
      request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server up and running at port 3000");
});

//

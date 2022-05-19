const express = require("express");
const axios = require("axios");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mailchimp.setConfig({
    apiKey: '9f4d3d55e8e4f7af54cbe8ca69206efb-us17',
    server: 'us17',
  });
  
//   async function callPing() {
//     const response = await mailchimp.lists.getAllLists();
//     console.log(response);
//   }
  
// callPing();
const listId = "04ba86ee3b";
// const subscribingUser = {
//   firstName: "Prudence",
//   lastName: "McVankab",
//   email: "prudence.mcvankab@example.com"
// };


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    console.log(req.body.fname, req.body.lname, req.body.email);
    async function addMember(){
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: req.body.email,
            status: "subscribed",
            merge_fields: {
            FNAME: req.body.fname,
            LNAME: req.body.lname
            }
        });
        console.log(`Successfully added member, contact's id is ${response.id} .`);
        console.log(res.statusCode);
    }
    addMember();
    if (res.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{ res.send(__dirname + "/faliure.html")};
});

app.listen(process.env.PORT || 4000, function(){
    console.log("Server is running on port 4000");
});

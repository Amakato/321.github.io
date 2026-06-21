
import express from "express";
import cors from "cors";

const app=express();
app.use(cors());

const data={
 news:[
 "https://jsonplaceholder.typicode.com/posts",
 "https://jsonplaceholder.typicode.com/comments"
 ],
 users:["https://jsonplaceholder.typicode.com/users"]
};

app.get("/urls/:keyword",(req,res)=>{
 const arr=data[req.params.keyword];
 if(!arr) return res.status(404).json({error:"Ключевое слово не найдено"});
 res.json(arr);
});

app.get("/download",async(req,res)=>{
 try{
  const response=await fetch(req.query.url);
  const txt=await response.text();

  res.json({
   size:txt.length,
   progress:100,
   content:txt
  });
 }catch(e){
  res.status(500).json({error:e.message});
 }
});

app.listen(3000);

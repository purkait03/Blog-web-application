import express from "express"
import bodyParser from "body-parser";

const app = express()
const port = 3000
let allPosts = []


app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs",{posts : allPosts})
})

app.get("/create",(req,res)=>{
    res.render("create.ejs")
})

app.post("/post",(req,res)=>{
    const post = {
        title : req.body["title"],
        content : req.body["content"]
    }

    allPosts.push(post)
    res.redirect("/")

})

app.get("/edit/:index",(req,res)=>{
    const index = req.params.index

    if (allPosts[index]) {
        res.render("edit.ejs", {posts : allPosts[index], index:index})
    } else {
        res.redirect("/")
    }
})

app.post("/edit/:index",(req,res)=>{
    const index = req.params.index
    allPosts[index].title = req.body["title"]
    allPosts[index].content = req.body["content"]

    res.redirect("/")
})

app.get("/delete/:index",(req,res)=>{
    const index = req.params.index
    allPosts.splice(index, 1)

    res.redirect("/")
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})

app.post("/contact/submit",(req,res)=>{
    console.log("Name: "+req.body["name"]);
    console.log("Email: "+req.body["email"]);
    console.log("Comment: "+req.body["comment"]);



    res.redirect("/")
})

app.listen(port,()=>{
    console.log(`Sarver is running on ${port}`); 
})

// npx @tailwindcss/cli -i ./src/input.css -o ./public/styles/output.css --watch
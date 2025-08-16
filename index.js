import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(path.dirname(''), 'public')));

// ضبط EJS
app.set("view engine", "ejs");
app.set("views", path.join(path.dirname(''), "views"));

// البيانات
let posts = [];

// الصفحة الرئيسية - قائمة البوستات
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// صفحة إنشاء بوست
app.get("/post", (req, res) => {
  res.render("post");
});

// إضافة بوست جديد
app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

// حذف بوست
app.post("/delete", (req, res) => {
  const { index } = req.body;
  posts.splice(index, 1);
  res.redirect("/");
});

// صفحة تعديل بوست واحد
app.get("/updatepost/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts[id];
  if (!post) return res.status(404).send("Post not found");
  res.render("updatepost", { id, post });
});

// تنفيذ التعديل
app.post("/updatepost/:id", (req, res) => {
  const id = Number(req.params.id);
  posts[id].title = req.body.title;
  posts[id].content = req.body.content;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

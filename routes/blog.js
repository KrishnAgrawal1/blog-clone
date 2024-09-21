const { Router } = require("express");
const upload = require("../services/imageUplode");
const Blog = require("../modles/blog");
const Comment = require("../modles/comment");

const router = Router();

router.get("/add-blog", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", { user: req.user, blog: blog, comments });
});

router.post("/comment/:blogId", async (req, res) => {
  const comment = await Comment.create({
    comment: req.body.comment,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/add-blog", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  let coverImage;
  try {
    coverImage = `/uploads/${req.user._id}/${req.file.filename}`;
  } catch (e) {
    coverImage = "/images/default.jfif";
  }

  const blog = await Blog.create({
    title,
    body,
    coverImageURL: coverImage,
    createdBy: req.user._id,
  });

  return res.render("addBlog", {
    user: req.user,
  });
});

module.exports = router;

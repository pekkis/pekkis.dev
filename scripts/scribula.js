"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blogposts_1 = require("@/services/blogposts");
//const fields = await directus.request(readFieldsByCollection("BlogPosts"));
// console.log("FIELDS", fields);
// const posts = await getPosts();
var post = await (0, blogposts_1.getPost)("test-post");

import { getPosts, getPost } from "@/services/blogposts";
import { directus } from "@/services/directus";
import {
  createDirectus,
  rest,
  readFieldsByCollection,
  readFields
} from "@directus/sdk";
import util from "node:util";

//const fields = await directus.request(readFieldsByCollection("BlogPosts"));

// console.log("FIELDS", fields);

// const posts = await getPosts();

const post = await getPost("pariisi-reactiuden-kaupunki");

console.log("POST", util.inspect(post, true, 666));

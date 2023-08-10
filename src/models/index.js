// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, CommentReply, Like, Comment, PostList, Post } = initSchema(schema);

export {
  User,
  CommentReply,
  Like,
  Comment,
  PostList,
  Post
};
// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { LikeComment, User, CommentReply, Like, Comment, PostList, Post } = initSchema(schema);

export {
  LikeComment,
  User,
  CommentReply,
  Like,
  Comment,
  PostList,
  Post
};
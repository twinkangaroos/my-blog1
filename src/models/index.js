// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Recipeclub, LikeComment, User, CommentReply, Like, Comment, PostList, Post } = initSchema(schema);

export {
  Recipeclub,
  LikeComment,
  User,
  CommentReply,
  Like,
  Comment,
  PostList,
  Post
};
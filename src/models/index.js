// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { GctNewsList, GctNews, Recipeclub, LikeComment, User, CommentReply, Like, Comment, PostList, Post } = initSchema(schema);

export {
  GctNewsList,
  GctNews,
  Recipeclub,
  LikeComment,
  User,
  CommentReply,
  Like,
  Comment,
  PostList,
  Post
};
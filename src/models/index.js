// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PostList, Post } = initSchema(schema);

export {
  PostList,
  Post
};
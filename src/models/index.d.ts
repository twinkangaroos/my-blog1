import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerLikeComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LikeComment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly comment_id?: string | null;
  readonly user_id?: string | null;
  readonly like_flag?: boolean | null;
  readonly post_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLikeComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LikeComment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly comment_id?: string | null;
  readonly user_id?: string | null;
  readonly like_flag?: boolean | null;
  readonly post_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LikeComment = LazyLoading extends LazyLoadingDisabled ? EagerLikeComment : LazyLikeComment

export declare const LikeComment: (new (init: ModelInit<LikeComment>) => LikeComment) & {
  copyOf(source: LikeComment, mutator: (draft: MutableModel<LikeComment>) => MutableModel<LikeComment> | void): LikeComment;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_id?: string | null;
  readonly email?: string | null;
  readonly nickname?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_id?: string | null;
  readonly email?: string | null;
  readonly nickname?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerCommentReply = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CommentReply, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly comment_id?: string | null;
  readonly user_id?: string | null;
  readonly comment?: string | null;
  readonly post_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCommentReply = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CommentReply, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly comment_id?: string | null;
  readonly user_id?: string | null;
  readonly comment?: string | null;
  readonly post_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CommentReply = LazyLoading extends LazyLoadingDisabled ? EagerCommentReply : LazyCommentReply

export declare const CommentReply: (new (init: ModelInit<CommentReply>) => CommentReply) & {
  copyOf(source: CommentReply, mutator: (draft: MutableModel<CommentReply>) => MutableModel<CommentReply> | void): CommentReply;
}

type EagerLike = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Like, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly post_id?: string | null;
  readonly user_id?: string | null;
  readonly like_flag?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLike = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Like, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly post_id?: string | null;
  readonly user_id?: string | null;
  readonly like_flag?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Like = LazyLoading extends LazyLoadingDisabled ? EagerLike : LazyLike

export declare const Like: (new (init: ModelInit<Like>) => Like) & {
  copyOf(source: Like, mutator: (draft: MutableModel<Like>) => MutableModel<Like> | void): Like;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly post_id?: string | null;
  readonly user_id?: string | null;
  readonly comment?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly post_id?: string | null;
  readonly user_id?: string | null;
  readonly comment?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerPostList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PostList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly type?: string | null;
  readonly sort?: number | null;
  readonly post_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPostList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PostList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content?: string | null;
  readonly type?: string | null;
  readonly sort?: number | null;
  readonly post_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PostList = LazyLoading extends LazyLoadingDisabled ? EagerPostList : LazyPostList

export declare const PostList: (new (init: ModelInit<PostList>) => PostList) & {
  copyOf(source: PostList, mutator: (draft: MutableModel<PostList>) => MutableModel<PostList> | void): PostList;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly author?: string | null;
  readonly show_date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly author?: string | null;
  readonly show_date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}
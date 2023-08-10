import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Post, PostList } from '../../models';
import { useState, useEffect, use } from 'react';
import { Card, View, Flex, useTheme, Button, TextAreaField, Badge, Heading, Text, Icon } from '@aws-amplify/ui-react';
import Header from "../Header"
import Markdown from 'react-markdown'
import { Comment, User, Like, LikeComment } from '../../models';
import { useRef } from 'react';

const PostComponent = () => {
    const [post, setPost] = useState("")
    const [post_list, setPostList] = useState([])
    const [id, setId] = useState("")
    const [my_comment, setMyComment] = useState("")
    const [comment, setComment] = useState([])
    const [user, setUser] = useState([])
    const commentRef = useRef(null); // コメント入力要素のrefを作成
    const [like_id, setLikeId] = useState("")
    const [like_my_comment, setLikeMyComment] = useState([])
    const [like_comment_counts, setLikeCommentCounts] = useState([])
    
    // パスパラメータからidを取得
    const router = useRouter()
    const param_id = router.query.id
    const { tokens } = useTheme()

    // リアルタイム表示の設定
    useEffect(() => {
        // real time functionality
        DataStore.observe(Post).subscribe(()  => {
            doInit()
        })
        DataStore.observe(PostList).subscribe(()  => {
            doInit()
        })
        DataStore.observe(Comment).subscribe(()  => {
            getComment()
        })
    }, [])

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
        // Comment取得
        getComment()
    }, [param_id])

    // 初期処理
    async function doInit() {
        if (param_id) {
            setId(param_id)
            // Post取得
            const post_result = await DataStore.query(Post, (c) => c.id.eq(param_id))
            if (post_result && post_result.length > 0) {
                setPost(post_result[0])
                console.log("Success in taking Post.")

                // PostList取得
                const post_list_result = await DataStore.query(PostList, (c) => c.post_id.eq(param_id), {
                    sort:(s) => s.sort(SortDirection.ASCENDING),
                })
                if (post_list_result && post_list_result.length > 0) {
                    setPostList(post_list_result)
                    console.log("Success in taking PostList.")
                }
            } else {
                console.log("Error when retrieving DB during doInit().....")
            }

            // User全取得　TODO：ニックネーム取得要／TODO：データ件数多い場合の対処要
            const user_result = await DataStore.query(User)
            if (user_result && user_result.length > 0) {
                setUser(user_result)
                console.log("Success in taking all User.")
            }

            // Like取得 //TODO: ユーザーID指定
            const like_result = await DataStore.query(Like, (c) => c.user_id.eq("dummy"))
            if (like_result && like_result.length > 0) {
                setLikeId(like_result[0].id)
                console.log("Success in taking Like.")
            }
        }
    }

    // （記事に紐づく）コメントリスト取得
    async function getComment() {
        if (param_id) {
            // 現記事idに紐づくCommentを取得
            const comment_result = await DataStore.query(Comment, (c) => c.post_id.eq(param_id), {
                sort:(s) => s.updatedAt(SortDirection.DESCENDING),
            })
            if (comment_result && comment_result.length > 0) {
                setComment(comment_result)
                console.log("Success in taking Comment.")
            }

            // 現記事idに紐づくLikeCommentの件数取得
            const like_comment_result = await DataStore.query(LikeComment, (c) => c.post_id.eq(param_id))
            if (like_comment_result && like_comment_result.length > 0) {
                // 件数カウント
                const commentCounts = {}; // オブジェクトを作成して各 comment_id の件数を管理
                like_comment_result.forEach(likeComment => {
                    const commentId = likeComment.comment_id;
                    commentCounts[commentId] = (commentCounts[commentId] || 0) + 1; // comment_id ごとにカウントを増やす
                });
                setLikeCommentCounts(commentCounts)
                console.log("Success in taking LikeComment count.", commentCounts)
            }

            // 現記事id＋自分のLikeComment取得（複数） //TODO: ユーザーID指定
            const like_my_comment_result = await DataStore.query(LikeComment, (c) => c.and(c => [
                c.post_id.eq(param_id),
                c.user_id.eq("dummy"), // TODO
            ]))
            if (like_my_comment_result && like_my_comment_result.length > 0) {
                setLikeMyComment(like_my_comment_result)
                console.log("Success in taking my LikeComment.", like_my_comment_result)
            }
        }
    }

    // コメントするクリック
    const onCommentClick = async () => {
        if (!my_comment) {
            alert("コメントを入力してください。")
            return
        }
        try {
            await DataStore.save(
                new Comment({
                    "post_id": id,
                    "user_id": "dummy",
                    "comment": my_comment
                })
            )
            console.log("コメントが投稿されました。")
            setMyComment("")
            if (commentRef.current) {
                commentRef.current.value = ""
            }
        }
        catch (error) {
            console.error('コメント登録時にエラーが発生しました:', error)
        }
    }

    // コメント削除クリック
    const onCommentDelete = async (comment_id) => {
        try {
            const modelToDelete = await DataStore.query(Comment, comment_id)
            await DataStore.delete(modelToDelete)
            console.log("Comment successfully deleted.")

            const modelToDelete2 = await DataStore.query(LikeComment, comment_id)
            await DataStore.delete(modelToDelete2)
            console.log("LikeComment successfully deleted.")
        }
        catch (error) {
            console.error('コメント削除時にエラーが発生しました:', error)
        }
    }

    // （この記事に）いいねクリック
    const onLikeClick = async () => {
        try {
            // 「いいね」していない場合→追加
            if (!like_id) {
                const newLike = await DataStore.save(
                    new Like({
                        "post_id": id,
                        "user_id": "dummy", // TODO
                        "like_flag": true
                    })
                )
                setLikeId(newLike.id)
                console.log("Successfully like.")
            }
            // 「いいね」している場合→削除
            else {
                const modelToDelete = await DataStore.query(Like, like_id);
                DataStore.delete(modelToDelete);
                setLikeId("")
                console.log("Successfully deleted like.")
            }
        }
        catch (error) {
            console.error('いいね時にエラーが発生しました:', error)
        }
    }

    // （コメントに）いいねクリック
    const onLikeCommentClick = async (comment_id, like_flag) => {
        try {
            // 「いいね」していない場合→追加
            if (!like_flag) {
                console.log("comment_id", comment_id)
                await DataStore.save(
                    new LikeComment({
                        "comment_id": comment_id,
                        "user_id": "dummy", // TODO
                        "like_flag": true,
                        "post_id": id
                    })
                );
                // LikeComment含め再取得
                getComment()
                console.log("Successfully like to a comment.")
            }
            // 「いいね」している場合→削除
            else {
                const modelToDelete = await DataStore.query(LikeComment, (c) => c.and(c => [
                    c.comment_id.eq(comment_id),
                    c.user_id.eq("dummy"), // TODO
                ]))
                console.log("model", modelToDelete[0].id)
                await DataStore.delete(LikeComment, modelToDelete[0].id);
                // LikeComment含め再取得
                getComment()
                console.log("Successfully deleted like.")
            }
        }
        catch (error) {
            console.error('いいね時にエラーが発生しました:', error)
        }
    }


    // UTCを日本時間に変換する関数
    const convertUTCtoJST = (utcDateString) => {
        if (utcDateString) {
            const utcDate = new Date(utcDateString);
            const jstOffset = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
            const jstDate = new Date(utcDate.getTime() + jstOffset);
            return jstDate.toISOString(); // ISO 8601 形式で返す
        }
        return "";
    }
    // 日付を成形する関数 TODO:共通化 
    const extractDateAndTimeChars = (dateString) => {
        if (dateString) {
            const jstDateString = convertUTCtoJST(dateString)
            return jstDateString.substring(0, 10) + " " + jstDateString.substring(11, 19)
        }
        return ""
    }


    return (
        <>
            <Header />
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
            >
                <Card>
                    <Flex direction="column" alignItems="center" className="ProseMirror note-common-styles__textnote-body">
                        <h1
                            style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px" }}
                            dangerouslySetInnerHTML={{ __html: post && post.title ? post.title : '' }}
                        />
                        {
                            post_list.length > 0 ?
                            post_list.map((postItem, index) => {
                                const { type, content } = postItem
                                if (type === "div") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <div
                                                key={index}
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: content ? content.replace(/\n/g, '<br />') : '' }}
                                            />
                                        </Flex>
                                    )
                                } else if (type === "h2") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <h2
                                                key={index}
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: content ? content.replace(/\n/g, '<br />') : '' }}
                                            />
                                        </Flex>
                                    )
                                } else if (type === "h3") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <h3
                                                key={index}
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: content ? content.replace(/\n/g, '<br />') : '' }}
                                            />
                                        </Flex>
                                    )
                                }
                            })
                            :
                            ''
                        }
                        
                        <Flex justifyContent="center">
                            <Button 
                                variation="default" 
                                size="Large" 
                                isFullWidth={true}
                                style={{ width: '180px', marginTop: '20px', borderColor: 'red' }}
                                onClick={() => onLikeClick()}
                            >
                                {
                                    like_id ?
                                    <>
                                        <Icon
                                            ariaLabel="Favorite"
                                            viewBox={{ width: 24, height: 24 }}
                                            pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
                                            3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            fill="red"
                                        />
                                        &nbsp;いいねを解除
                                    </>
                                    :
                                    <>
                                        <Icon
                                            ariaLabel="Favorite"
                                            viewBox={{ width: 24, height: 24 }}
                                            pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
                                            3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            fill="lightgray"
                                        />
                                        &nbsp;いいね
                                    </>
                                }
                                
                            </Button>
                        </Flex>

                        <h3>この記事にコメントする</h3>
                        <TextAreaField 
                            ref={(commentRef)}
                            rows="5"
                            style={{ outline: 'none', lineHeight: '1.5', width: "640px" }}
                            placeholder='コメント記入後、「コメントする」ボタンを押すとすぐに公開されます。'
                            onChange={(e) => setMyComment(e.target.value)}
                        />
                        <Flex justifyContent="center" style={{ marginBottom: '40px' }}>
                            <Button 
                                variation="primary"
                                size="Large" 
                                isFullWidth={true}
                                style={{  width: '200px', marginTop: '20px', backgroundColor: 'red' }}
                                onClick={() => onCommentClick()}
                            >コメントする</Button>
                        </Flex>

                        <h2>この記事に関するみなさんからのコメント</h2>
                        <Flex direction="column">
                        {
                            comment.map((commentItem, index) => (
                                <Card 
                                    key={commentItem.id} 
                                    variation="outlined" 
                                    style={{ borderColor: 'lightgray', width: '640px' }}
                                >
                                    <Flex
                                        direction="column"
                                        gap={tokens.space.xs}
                                    >
                                        <Flex alignItems="flex-start">
                                            <Badge size="small" variation="info">
                                                {user.find((u) => u.user_id === commentItem.user_id)?.nickname}
                                            </Badge>
                                            <Badge size="small" variation="success">
                                                {extractDateAndTimeChars(commentItem.updatedAt)}
                                            </Badge>
                                        </Flex>
                                        <Text as="span">
                                            {commentItem.comment}
                                        </Text>
                                        <Flex 
                                            direction="row" 
                                            justifyContent="flex-end"
                                            alignItems="center"
                                        >
                                            {/* TODO：自コメントの場合のみ「削除」表示 */}
                                            <Button variation="link" size="small" onClick={() => onCommentDelete(commentItem.id)}>削除</Button>
                                            <Button variation="default" size="small">返信</Button>
                                            {/***** コメントに対するいいねボタン *****/}
                                            {
                                                like_my_comment.find((lmc) => lmc.comment_id === commentItem.id) ?
                                                <Button 
                                                    variation="default" 
                                                    size="small" 
                                                    style={{ width: '10px', border: 'none' }}
                                                    onClick={() => onLikeCommentClick(commentItem.id, true)}
                                                >
                                                    <Icon
                                                        ariaLabel="Favorite"
                                                        viewBox={{ width: 24, height: 24 }}
                                                        pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
                                                        3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                        fill="red"
                                                    />
                                                </Button>
                                                :
                                                <Button 
                                                    variation="default" 
                                                    size="small" 
                                                    style={{ width: '10px', border: 'none' }}
                                                    onClick={() => onLikeCommentClick(commentItem.id, false)}
                                                >
                                                    <Icon
                                                        ariaLabel="Favorite"
                                                        viewBox={{ width: 24, height: 24 }}
                                                        pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
                                                        3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                        fill="lightgray"
                                                    />
                                                </Button>
                                            }
                                            {/***** コメントに対するいいねの件数 *****/}
                                            {
                                                like_comment_counts[commentItem.id] ?
                                                like_comment_counts[commentItem.id]
                                                :
                                                0
                                            }
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))
                        }
                        </Flex>
                    </Flex>
                </Card>
            </View>
        </>
    )
}

export default PostComponent
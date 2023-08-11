import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Post, PostList } from '../../models';
import { useState, useEffect, use } from 'react';
import { Card, View, Flex, useTheme, Button, TextAreaField, Badge, Heading, Text, Icon } from '@aws-amplify/ui-react';
import Header from "../Header"
import Markdown from 'react-markdown'
import { Comment, User, Like, LikeComment, CommentReply } from '../../models';
import { useRef } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const PostComponent = () => {
    const [post, setPost] = useState("")
    const [post_list, setPostList] = useState([])
    const [my_comment, setMyComment] = useState("")
    const [comment, setComment] = useState([])
    //const [user, setUser] = useState([])
    const commentRef = useRef(null); // 記事に対するコメント入力要素のrefを作成
    const [like_id, setLikeId] = useState("")   // 記事に対するいいねの有無
    const [like_my_comment, setLikeMyComment] = useState([])    // 自分が各コメントにLikeしたか
    const [like_comment_counts, setLikeCommentCounts] = useState([]) // コメントidごとのいいね件数
    const [comment_user, setCommentUser] = useState([]) // コメントidごとのユーザーid
    const [param_id, setParamId] = useState(null); // パスパラメータの値を保持するステート
    const [showReplyArea, setShowReplyArea] = useState([]); // 返信入力エリアの表示状態を管理する配列
    const [reply_comment, setReplyComment] = useState([])
    const replyRefArray = useRef([])
    const [comment_reply_user, setCommentReplyUser] = useState([])

    const { user, signOut } = useAuthenticator((context) => [
        context.user,
        context.signOut,
    ])

    // パスパラメータからidを取得
    const router = useRouter()
    const { tokens } = useTheme()

    // パスパラメータの取得が完了したら、param_id ステートを更新
    useEffect(() => {
        if (router.query.id) {
            setParamId(router.query.id);
        }
    }, [router.query.id])
    
    // param_id が有効な値の場合に doInit 関数を実行
    useEffect(() => {
        if (param_id !== null) {
            doInit()
        }
        // real time functionality
        //DataStore.observe(Comment).subscribe(()  => {
        //    console.log("observe Comment")
        //    getComment()
        //})
        //DataStore.observe(LikeComment).subscribe(()  => {
        //    console.log("observe LikeComment")
        //    getLikeComment()
        //})
    }, [param_id])

    // 初期処理
    async function doInit() {
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

        // 当記事に対する自分のLike有無を取得
        if (user) {
            const like_result = await DataStore.query(Like, (c) => c.and(c => [
                c.post_id.eq(param_id),
                c.user_id.eq(user.username),
            ]))
            if (like_result && like_result.length > 0) {
                setLikeId(like_result[0].id)
                console.log("Success in taking Like.")
            }
        }
        getComment()
        getLikeComment()
        getReplyComment()
    }

    // コメント取得
    async function getComment() {
        // 現記事idに紐づくCommentを取得
        const comment_result = await DataStore.query(Comment, (c) => c.post_id.eq(param_id), {
            sort:(s) => s.createdAt(SortDirection.DESCENDING),
        })
        if (comment_result && comment_result.length > 0) {
            // コメント登録直後は、createdAt = null のため、やむを得ず最新コメントをリストの先頭に移動
            const comment_sorted = comment_result.sort((a, b) => {
                if (!a.createdAt) return -1; // a が createdAt = null の場合、a を先頭に
                if (!b.createdAt) return 1;  // b が createdAt = null の場合、b を先頭に
                return b.createdAt - a.createdAt; // 通常の比較
            })
            setComment(comment_sorted)

            // コメントidごとのユーザーid→ニックネームを取得
            const commentUser = {};
            // すべてのコメントユーザー情報を取得し終わるまで待つ
            await Promise.all(
                comment_sorted.map(async (commentResult) => {
                    const nickname = await getCommentUserNickname(commentResult.user_id)
                    if (nickname) {
                        commentUser[commentResult.id] = nickname
                    }
            }))
            setCommentUser(commentUser)
        }
        else {
            setComment([])
            setCommentUser([])
        }
        console.log("Success in taking Comment.")
    }

    // ユーザーのニックネームを取得
    async function getCommentUserNickname(userId) {
        const user_result = await DataStore.query(User, ((c) => c.user_id.eq(userId)))
        if (user_result && user_result.length > 0) {
            return user_result[0].nickname
        }
        return null
    }
    
    // コメントに対する「いいね」取得
    async function getLikeComment() {
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
        }
        else {
            setLikeCommentCounts([])
        }
        console.log("Success in taking LikeComment count.")

        // 現記事id＋自分のLikeComment取得（複数）
        if (user) {
            const like_my_comment_result = await DataStore.query(LikeComment, (c) => c.and(c => [
                c.post_id.eq(param_id),
                c.user_id.eq(user.username),
            ]))
            if (like_my_comment_result && like_my_comment_result.length > 0) {
                setLikeMyComment(like_my_comment_result)
            }
            else {
                setLikeMyComment([])
            }
            console.log("Success in taking my LikeComment.")
        }
    }

    // コメントに対する返信コメント取得
    async function getReplyComment() {
        // 現記事idに紐づくReplyCommentの件数取得
        const reply_comment_result = await DataStore.query(CommentReply, (c) => c.post_id.eq(param_id), {
            sort:(s) => s.createdAt(SortDirection.DESCENDING),
        })
        if (reply_comment_result && reply_comment_result.length > 0) {
            // コメント登録直後は、createdAt = null のため、コメントをリストの先頭に移動
            const reply_sorted = reply_comment_result.sort((a, b) => {
                if (!a.createdAt) return -1; // a が createdAt = null の場合、a を先頭に
                if (!b.createdAt) return 1;  // b が createdAt = null の場合、b を先頭に
                return b.createdAt - a.createdAt; // 通常の比較
            })
            setReplyComment(reply_sorted)

            // コメントidごとのユーザーid→ニックネームを取得
            const commentReplyUser = {};
            // すべてのコメントユーザー情報を取得し終わるまで待つ
            await Promise.all(
                reply_sorted.map(async (commentReplyResult) => {
                    const nickname = await getCommentUserNickname(commentReplyResult.user_id)
                    if (nickname) {
                        commentReplyUser[commentReplyResult.id] = nickname
                    }
            }))
            setCommentReplyUser(commentReplyUser)
            console.log("Success in taking ReplyComment.")
        }
        else {
            setReplyComment([])
            setCommentReplyUser([])
        }
        console.log("Success in taking ReplyComment.")
    }



    // 「コメントする」クリック
    const onCommentClick = async () => {
        if (!my_comment) {
            alert("コメントを入力してください。")
            return
        }
        if (!user) {
            alert("ログインしてください。")
            return
        }
        try {
            await DataStore.save(
                new Comment({
                    "post_id": param_id,
                    "user_id": user.username,
                    "comment_body": my_comment
                })
            )
            setMyComment("")
            if (commentRef.current) {
                commentRef.current.value = ""
            }
            console.log("コメントが投稿されました。")
            // コメント再取得
            getComment()
        }
        catch (error) {
            console.error('コメント登録時にエラーが発生しました:', error)
        }
    }

    // コメント削除クリック（各コメントの中から自分のコメントのみ）
    const onCommentDelete = async (comment_id) => {
        try {
            const commentToDelete = await DataStore.query(Comment, comment_id)
            if (commentToDelete) {
                await DataStore.delete(commentToDelete)
            }
            console.log("Comment successfully deleted.")

            await DataStore.delete(LikeComment, (c) => c.comment_id.eq(comment_id))
            console.log("LikeComment successfully deleted.")

            await DataStore.delete(CommentReply, (c) => c.comment_id.eq(comment_id))
            console.log("CommentReply successfully deleted.")
            
            // コメント再取得
            getComment()
        }
        catch (error) {
            console.error('コメント削除時にエラーが発生しました:', error)
        }
    }

    // いいねクリック（当記事に）
    const onLikeClick = async () => {
        try {
            if (!user) {
                alert("ログインしてください。")
                return
            }
            // 「いいね」していない場合→追加
            if (!like_id) {
                const newLike = await DataStore.save(
                    new Like({
                        "post_id": param_id,
                        "user_id": user.username,
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

    // いいねクリック（各コメントに）
    const onLikeCommentClick = async (comment_id, like_flag) => {
        console.log("comment_id", comment_id)
        console.log("like_flag", like_flag)
        try {
            if (!user) {
                alert("ログインしてください。")
                return
            }
            // 「いいね」していない場合→追加
            if (!like_flag) {
                await DataStore.save(
                    new LikeComment({
                        "comment_id": comment_id,
                        "user_id": user.username,
                        "like_flag": true,
                        "post_id": param_id
                    })
                );
                console.log("Successfully like to a comment.")
            }
            // 「いいね」している場合→削除
            else {
                const modelToDelete = await DataStore.query(LikeComment, (c) => c.and(c => [
                    c.comment_id.eq(comment_id),
                    c.user_id.eq(user.username),
                ]))
                console.log("model", modelToDelete[0].id)
                await DataStore.delete(LikeComment, modelToDelete[0].id);
                console.log("Successfully deleted like.")
            }
            // Likeコメント再取得
            getLikeComment()
        }
        catch (error) {
            console.error('いいね時にエラーが発生しました:', error)
        }
    }

    // 「返信」エリアの表示・非表示切り替え
    const toggleReplyArea = (index) => {
        const updatedShowReplyArea = [...showReplyArea];
        updatedShowReplyArea[index] = !updatedShowReplyArea[index]; // クリックされたコメントの表示状態を反転させる
        setShowReplyArea(updatedShowReplyArea);
    }

    
    // 返信ボタンクリック時(各コメントに）
    const onReplyClick = async (commentId, index) => {
        const replyText = replyRefArray.current[index].value
        
        if (!replyText) {
            alert("返信内容を入力してください。");
            return;
        }
        if (!user) {
            alert("ログインしてください。");
            return;
        }
        try {
            await DataStore.save(
                new CommentReply({
                    "comment_id": commentId,
                    "user_id": user.username,
                    "comment_body": replyText,
                    "post_id": param_id
                })
            )
            
            // テキストエリアの値をクリア
            if (replyRefArray.current[index]) {
                replyRefArray.current[index].value = ""
            }
            console.log("返信が投稿されました。")
            // 再取得
            getReplyComment()
        } catch (error) {
            console.error('返信登録時にエラーが発生しました:', error);
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
                        {/***** POSTのループ *****/}
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
                        {/***** 記事に対する「いいね」エリア *****/}
                        <Flex justifyContent="center">
                        {
                            user && like_id ?
                            <Button 
                                variation="default" 
                                size="Large" 
                                isFullWidth={true}
                                style={{ width: '180px', marginTop: '20px', borderColor: 'red' }}
                                onClick={() => onLikeClick()}
                            >
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
                            </Button>
                            :
                            ''
                        }
                        {
                            user && !like_id ?
                            <Button 
                                variation="default" 
                                size="Large" 
                                isFullWidth={true}
                                style={{ width: '180px', marginTop: '20px', borderColor: 'red' }}
                                onClick={() => onLikeClick()}
                            >
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
                            </Button>
                            :
                            ''
                        }
                        {
                            !user ?
                                <Button 
                                variation="default" 
                                size="Large" 
                                isFullWidth={true}
                                style={{ width: '400px', marginTop: '20px', borderColor: 'red' }}
                                onClick={() => onLikeClick()}
                                isDisabled={true}
                            >「いいね」するにはログインしてください</Button>
                            :
                            ''
                        }
                        </Flex>
                        
                        {/***** 記事に対する（自分の）コメントエリア *****/}
                        <h3>この記事にコメントする</h3>
                        <TextAreaField 
                            ref={(commentRef)}
                            rows="5"
                            style={{ outline: 'none', lineHeight: '1.5', width: "640px" }}
                            placeholder='コメント記入後、「コメントする」ボタンを押すとすぐに公開されます。'
                            onChange={(e) => setMyComment(e.target.value)}
                        />
                        <Flex justifyContent="center" style={{ marginBottom: '40px' }}>
                            {
                                user?
                                <Button 
                                    variation="primary"
                                    size="Large" 
                                    isFullWidth={true}
                                    style={{  width: '200px', marginTop: '20px', backgroundColor: 'red' }}
                                    onClick={() => onCommentClick()}
                                >コメントする</Button>
                                :
                                <Button 
                                    variation="primary"
                                    size="Large" 
                                    isFullWidth={true}
                                    style={{  width: '400px', marginTop: '20px' }}
                                    onClick={() => onCommentClick()}
                                    isDisabled={true}
                                >コメントするにはログインしてください</Button>
                            }
                            
                        </Flex>
                        {/***** 記事に対する（みなさんの）コメントエリア *****/}
                        {
                            comment.length > 0 ?
                            <h2>この記事に関するみなさんからのコメント</h2>
                            :
                            ''
                        }
                        <Flex direction="column">
                        {
                            // *****（みなさんの）コメントブロック *****
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
                                        {/***** 記事に対するコメント *****/}
                                        <Flex alignItems="flex-start">
                                            {/***** ニックネーム *****/}
                                            <Badge size="small" variation="info">
                                                {comment_user[commentItem.id]}
                                            </Badge>
                                            {/***** 更新日時 *****/}
                                            {
                                                commentItem.updatedAt ?
                                                <Badge size="small" variation="success">
                                                    {extractDateAndTimeChars(commentItem.updatedAt)}
                                                </Badge>
                                                :
                                                ''
                                            }
                                        </Flex>
                                        {/***** コメント本文 *****/}
                                        <Text as="span">
                                            {commentItem.comment_body}
                                        </Text>
                                        {/***** 削除・返信エリア *****/}
                                        <Flex 
                                            direction="row" 
                                            justifyContent="flex-end"
                                            alignItems="center"
                                        >
                                            {/***** 削除ボタン *****/}
                                            {
                                                user && user.username === commentItem.user_id ?
                                                <Button variation="link" size="small" onClick={() => onCommentDelete(commentItem.id)}>削除</Button>
                                                :
                                                ''
                                            }
                                            {/***** 返信ボタン *****/}
                                            <Button variation="default" size="small" onClick={() => toggleReplyArea(index)}>返信</Button>
                                            {/***** （みなさんの）コメントに対するいいねボタン *****/}
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
                                    {/***** 返信コメント入力エリア *****/}
                                    {
                                        showReplyArea[index] && ( // 返信入力エリアが表示されている場合に表示
                                            <Flex direction="column">
                                                <TextAreaField 
                                                    ref={ref => (replyRefArray.current[index] = ref)}
                                                    rows="5"
                                                    style={{ outline: 'none', lineHeight: '1.5', width: "100%" }}
                                                    placeholder='入力後、「返信する」ボタンを押すとすぐに公開されます。'
                                                />
                                                <Button 
                                                    variation="primary"
                                                    size="Large" 
                                                    isFullWidth={true}
                                                    style={{  width: '100%', backgroundColor: 'red' }}
                                                    onClick={() => onReplyClick(commentItem.id, index)}
                                                >返信する</Button>
                                            </Flex>
                                        )
                                    }
                                    {/***** 返信コメント表示エリア *****/}
                                    {
                                        reply_comment.map((replyItem, index2) => (
                                            replyItem.comment_id === commentItem.id ?
                                            <Flex
                                                key={index2}
                                                direction="column"
                                                gap={tokens.space.xs}
                                                style={{ backgroundColor: 'whitesmoke', margin: '6px', padding: '16px', borderRadius: '10px' }}
                                            >
                                                {/***** 記事に対するコメント *****/}
                                                <Flex alignItems="flex-start">
                                                    {/***** ニックネーム *****/}
                                                    <Badge size="small" variation="info">
                                                    {comment_reply_user[replyItem.id]}
                                                    </Badge>
                                                    {/***** 更新日時 *****/}
                                                    {
                                                        replyItem.updatedAt ?
                                                        <Badge size="small" variation="success">
                                                            {extractDateAndTimeChars(replyItem.updatedAt)}
                                                        </Badge>
                                                        :
                                                        ''
                                                    }
                                                </Flex>
                                                {/***** コメント本文 *****/}
                                                <Text as="span">
                                                    {replyItem.comment_body}
                                                </Text>
                                            </Flex>
                                            :
                                            ''
                                            
                                        ))
                                    }
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

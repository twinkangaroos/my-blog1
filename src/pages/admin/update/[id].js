import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Post, PostList } from '../../../models';
import { useState, useEffect } from 'react';
import { Heading, Card, View, Flex, TextField, Button, TextAreaField, Text, useTheme } from '@aws-amplify/ui-react';
import { useRef } from 'react';

const PostDetail = () => {
    const [post, setPost] = useState("")
    const [post_list, setPostList] = useState([])
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const inputEls = useRef([]); // テキストエリアの参照を保持する配列
    const [contents, setContents] = useState(['']); // テキストエリアのvalueを保持する配列
    const [focusOnNextAdd, setFocusOnNextAdd] = useState(true); // テキストエリア追加時にフォーカスを当てるかのフラグ

    // パスパラメータからidを取得
    const router = useRouter()
    const param_id = router.query.id
    const { tokens } = useTheme();

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
    }, [param_id])
    
    async function doInit() {
        if (param_id) {
            console.log("doInit getPost...", param_id)
            setId(param_id)
            // Post取得
            const post_result = await DataStore.query(Post, (c) => c.id.eq(param_id))
            if (post_result && post_result.length > 0) {
                setPost(post_result[0])
                setTitle(post_result[0].title)
                console.log("Success in taking Post.")

                // PostList取得
                const post_list_result = await DataStore.query(PostList, (c) => c.post_id.eq(param_id), {
                    sort:(s) => s.sort(SortDirection.ASCENDING),
                })
                if (post_list_result && post_list_result.length > 0) {
                    setPostList(post_list_result)
                    // DBから取得したpost_listをテキストエリアに紐づけ
                    const updatedContents = post_list_result.map(item => item.content)
                    setContents(updatedContents)
                    console.log("Success in taking PostList.")
                }
            } else {
                console.log("Error when retrieving DB during doInit().....")
            }
        }
    }

    // 更新ボタンクリック
    const onUClick = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Postの更新
                await DataStore.save(
                    Post.copyOf(
                        post, 
                        updated => {
                            updated.title = title
                        }
                    )
                )
                console.log("Post successfully updated.")
                
                // PostListの全削除
                if (post_list && post_list.length > 0) {
                    for (const pl of post_list) {
                        await DataStore.delete(PostList, pl.id)
                    }
                    console.log("All PostList successfully deleted.")
                }
                
                // PostListの再作成
                let i = 0
                console.log("contents=", contents)
                for (const ct of contents) {
                    console.log("content=", ct)
                    await DataStore.save(
                        new PostList({
                            "content": ct,
                            "sort": i,
                            "post_id": id
                        })
                    )
                    i++
                    console.log("All PostList successfully created.")
                }
                
                // PostListの最新情報を取得してstateを更新
                const post_list_result = await DataStore.query(PostList, (c) => c.post_id.eq(param_id));
                if (post_list_result && post_list_result.length > 0) {
                    setPostList(post_list_result);
                }

                console.log("更新が完了しました");
            } else {
                console.log("記事が見つかりません")
            }
        } catch (error) {
            console.error('更新時にエラーが発生しました:', error);
        }
    }

    // 削除ボタンクリック
    const onDClick = async (e) => {
        e.preventDefault();
        /*
        try {
            if (id) {
                // テーブルA（Post）の削除
                await DataStore.delete(Post, c => c.id("eq", id))

                // テーブルB（PostList）の削除
                await DataStore.delete(PostList, c => c.postListPostId("eq", id))

                console.log("削除が完了しました")
            } else {
                console.log("記事が見つかりません")
            }
        } catch (error) {
            console.error('削除時にエラーが発生しました:', error);
        }
        */
    }
    
    // テキストエリアの値が変更された時
    const handleOnChange = (e, index) => {
        const updatedContents = [...contents]
        updatedContents[index] = e.target.value
        setContents(updatedContents)

        const updatedPostList = post_list.map((pl, i) => {
            if (i === index) {
                return { ...pl, content: e.target.value }
            }
            return pl
        })
        setPostList(updatedPostList)
    }

    // 「テキストエリアを追加する」クリック時
    const handleAddTextArea = () => {
        setContents([...contents, ''])
        setFocusOnNextAdd(true); // フォーカスを当てるフラグをtrueに設定
    }
    
    // テキストエリア追加時
    useEffect(() => {
        if (focusOnNextAdd && inputEls.current.length > 0) {
            // 新しく追加されたテキストボックスにフォーカスを当てる
            inputEls.current[inputEls.current.length - 1].focus()
            setFocusOnNextAdd(false) // フォーカスを当てるフラグをfalseに設定
        }
    }, [focusOnNextAdd, contents])
    
    return (
        <>
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
            >
                <Heading level={5}>記事編集</Heading>
                <Card>
                    <Flex direction="column" alignItems="flex-start" className="ProseMirror note-common-styles__textnote-body">
                        <TextField
                            placeholder="記事タイトル"
                            //label=""
                            errorMessage="There is an error"
                            defaultValue={title}
                            width="620px"
                            variation="quiet"
                            isRequired={true}
                            onChange={e => setTitle(e.target.value)}
                        />
                        {
                            post_list.map((pl, index) => (
                                <TextAreaField 
                                    key={index}
                                    ref={(el) => (inputEls.current[index] = el)}
                                    value={pl.content}
                                    onChange={(e) => handleOnChange(e, index)}
                                    rows={pl.content ? pl.content.split('\n').length : 1} // 改行の数に応じてrowsを増やす
                                    width="620px"
                                    style={{ border: 'none', outline: 'none', resize: 'none', width: '100%' }} // 枠線をゼロにするCSSスタイルを適用
                                    //onSelect={(e) => handleTextAreaSelect(e, index)}
                                />

                            ))
                        }
                        <Button variation="primary" onClick={handleAddTextArea}>テキストエリアを追加する</Button>
                        
                        <Flex direction="row" alignItems="flex-start">
                            <Button variation="primary" onClick={onUClick}>更新する</Button>
                            <Button variation="warning" onClick={onDClick}>削除する</Button>
                        </Flex>
                    </Flex>
                </Card>
            </View>
        </>
    )
}

export default PostDetail
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Post, PostList } from '../../../models';
import { useState, useEffect } from 'react';
import { Heading, Card, View, Flex, TextField, Button, TextAreaField, Text, useTheme, Link, Loader } from '@aws-amplify/ui-react';
import { useRef } from 'react';

const PostDetail = () => {
    const [post, setPost] = useState("")
    const [post_list, setPostList] = useState([])
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const divRefs = useRef([]); // contenteditableの参照を保持する配列
    const [post_list_flag, setPostListFlag] = useState(false)
    const [focusOnNextAdd, setFocusOnNextAdd] = useState(true); // 要素追加時にフォーカスを当てるかのフラグ

    // パスパラメータからidを取得
    const router = useRouter()
    const param_id = router.query.id
    const { tokens } = useTheme()

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
    }, [param_id, post_list_flag])

    // 要素追加時
    useEffect(() => {
        if (focusOnNextAdd && divRefs.current.length > 0) {
            // 新しく追加された要素にフォーカスを当てる
            divRefs.current[divRefs.current.length - 1].focus()
            setFocusOnNextAdd(false) // フォーカスを当てるフラグをfalseに設定
        }
    }, [focusOnNextAdd, post_list])
    
    // 初期処理
    async function doInit() {
        if (param_id) {
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
                    // Model形式で保持（例：[0]Model {id: '', ..} [1]Model {id: '', ..}）
                    setPostList(post_list_result)
                    setPostListFlag(true)
                    console.log("Success in taking PostList.")
                }
            } else {
                console.log("Error when retrieving DB during doInit().....")
            }
        }
    }

    // 更新ボタンクリック
    const onUClick = async (e) => {
        e.preventDefault()
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
                
                if (post_list && post_list.length > 0) {
                    // PostListの全削除
                    for (const pl of post_list) {
                        await DataStore.delete(PostList, pl.id);
                    }
                    console.log("All PostList successfully deleted.")
                    
                    // contenteditableの内容を取得（※追加したてのnullの考慮要）
                    const updatedContent = post_list.map((pl, index) => {
                        const el = divRefs.current[index];
                        return el ? el.innerText : '';
                    })
                    console.log("debug updatedContent=", updatedContent)
                    
                    // PostListの再作成
                    let i = 0
                    for (const pl of post_list) {
                        const updatedContentValue = updatedContent[i] // 更新後のcontentの値を取得
                        console.log("updatedContent=", updatedContent)
                        await DataStore.save(
                            new PostList({
                                "content": updatedContentValue,
                                "type": pl.type,
                                "sort": i,
                                "post_id": id,
                            })
                        )
                        i++
                    }
                    console.log("All PostList successfully created.")
                }
                
                // PostList再取得
                const post_list_result = await DataStore.query(PostList, (c) => c.post_id.eq(param_id), {
                    sort:(s) => s.sort(SortDirection.ASCENDING),
                })
                if (post_list_result && post_list_result.length > 0) {
                    setPostList(post_list_result)
                    console.log("Success in taking PostList again.")
                }
                console.log("更新が完了しました。")
            } else {
                console.log("記事が見つかりません");
            }
        }
        catch (error) {
            console.error('更新時にエラーが発生しました:', error);
        }
    }
    // 削除ボタンクリック
    const onDClick = async (e) => {
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

    // 「段落の追加」クリック時
    const handleAddDiv = () => {
        //setPostListContents([...post_list_contents, ''])
        setPostList((prevList) => [...prevList, new PostList({ content: '', type: 'div' })]); // post_listにも要素を追加
        setFocusOnNextAdd(true); // フォーカスを当てるフラグをtrueに設定
    }
    // 「h2大見出しの追加」クリック時
    const handleAddH2 = () => {
        //setPostListContents([...post_list_contents, ''])
        setPostList((prevList) => [...prevList, new PostList({ content: '', type: 'h2' })]); // post_listにも要素を追加
        setFocusOnNextAdd(true); // フォーカスを当てるフラグをtrueに設定
    }
    
    return (
        <>
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
            >
                <Flex justifyContent="flex-end">
                    <Button variation="warning" onClick={onUClick} size="small">更新する</Button>
                </Flex>
                
                <Card>
                    <Flex direction="column" alignItems="flex-start" className="ProseMirror note-common-styles__textnote-body">
                        <TextField
                            placeholder="記事タイトル"
                            errorMessage="There is an error"
                            defaultValue={title}
                            width="640px"
                            isRequired={true}
                            onChange={e => setTitle(e.target.value)}
                            style={{ fontSize: '32px', fontWeight: 'bold', border: 'none' }}
                        />
                        {
                            post_list.length > 0 ?
                                post_list.map((postItem, index) => {
                                    const { type, content } = postItem
                                    if (type === "div") {
                                        return (
                                            <div
                                                key={index}
                                                contentEditable
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: content ? content.replace(/\n/g, '<br />') : '' }}
                                                ref={el => (divRefs.current[index] = el)}
                                            /> 
                                        )
                                    } else if (type === "h2") {
                                        return (
                                            <h2
                                                key={index}
                                                contentEditable
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: content ? content.replace(/\n/g, '<br />') : '' }}
                                                ref={el => (divRefs.current[index] = el)}
                                            /> 
                                        )
                                    }
                                })
                                :
                                <Loader />
                        }
                        <Button variation="default" onClick={handleAddDiv} size="small">段落の追加</Button>
                        <Button variation="default" onClick={handleAddH2} size="small">h2大見出しの追加</Button>
                    </Flex>
                    <Flex justifyContent="flex-end">
                        <Link href="#" onClick={onDClick}>削除する</Link>
                    </Flex>
                </Card>
            </View>
        </>
    )
}

export default PostDetail
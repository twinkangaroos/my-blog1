import '@aws-amplify/ui-react/styles.css';
import styles from "../../../styles/editable.module.css"
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Post, PostList } from '../../../models';
import { useState, useEffect } from 'react';
import { Card, View, Flex, Button, useTheme, Link, Loader, RadioGroupField, Radio } from '@aws-amplify/ui-react';
import { useRef } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import HeaderAdmin from "../../HeaderAdmin"

const PostDetail = () => {
    const [post, setPost] = useState("")
    const [post_list, setPostList] = useState([])
    const [id, setId] = useState("")
    const [post_list_flag, setPostListFlag] = useState(false)
    const [focusOnNextAdd, setFocusOnNextAdd] = useState(true); // 要素追加時にフォーカスを当てるかのフラグ
    const divRefs = useRef([]); // contenteditableの参照を保持する配列
    const titleRef = useRef(null); // title要素のrefを作成
    const [selectedElementIndex, setSelectedElementIndex] = useState(-1);
    const [contents, setContents] = useState(['']); // 各要素のvalueを保持する配列（移動時に必要。Modelは書き込み不可のため）

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
                console.log("Success in taking Post.")

                // PostList取得
                const post_list_result = await DataStore.query(PostList, (c) => c.post_id.eq(param_id), {
                    sort:(s) => s.sort(SortDirection.ASCENDING),
                })
                if (post_list_result && post_list_result.length > 0) {
                    // Model形式で保持（例：[0]Model {id: '', ..} [1]Model {id: '', ..}）
                    setPostList(post_list_result)
                    setPostListFlag(true)
                    // DBのpost_listをテキストで保持
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
        e.preventDefault()
        try {
            if (id) {
                if (titleRef.current) {
                    const updatedTitle = titleRef.current.innerText
                    console.log("title=",updatedTitle)
                    const currentDate = new Date()
                    // AWSDate 形式に変換
                    const awsDate = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 形式に変換

                    // Postの更新
                    await DataStore.save(
                        Post.copyOf(
                            post, 
                            updated => {
                                updated.title = updatedTitle
                                updated.show_date = awsDate
                            }
                        )
                    )
                    console.log("Post successfully updated.") 
                }
                
                // PostListの全削除（※post_idで一括削除するとトランザクションがおかしくなる？）
                await DataStore.delete(PostList, (post_list) => post_list.post_id.eq(id))
                console.log("All PostList successfully deleted.")

                if (post_list && post_list.length > 0) {
                    // TODO: contentsを利用すればよいはず？
                    // contenteditableの内容を取得（※追加したてのnullの考慮要）
                    const updatedContent = post_list.map((pl, index) => {
                        const el = divRefs.current[index];
                        return el ? el.innerText : '';
                    })
                    
                    // TODO: 段落が多くなれば途中で処理が切れてしまう？
                    // PostListの再作成
                    let i = 0
                    for (const pl of post_list) {
                        const updatedContentValue = updatedContent[i] // 更新後のcontentの値を取得
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
                
                // Post再取得
                const post_result = await DataStore.query(Post, (c) => c.id.eq(id))
                if (post_result && post_result.length > 0) {
                    setPost(post_result[0])
                    console.log("Success in taking PostList again.")
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
        try {
            if (id) {
                // テーブルB（PostList）の削除
                await DataStore.delete(PostList, (post_list) => post_list.post_id.eq(id))
                
                // テーブルA（Post）の削除
                await DataStore.delete(Post, id)

                console.log("削除が完了しました")
                // TODO:リスト一覧にリダイレクト
            } else {
                console.log("記事が見つかりません")
            }
        } catch (error) {
            console.error('削除時にエラーが発生しました:', error);
        }
    }

    // 要素追加時（段落（div）・h2大見出し（h2）・h3小見出し（h3））
    const handleAddElement = (tag_type) => {
        setPostList((prevList) => [...prevList, new PostList({ content: '', type: tag_type })]); // post_listに要素を追加
        setContents([...contents, ''])
        setFocusOnNextAdd(true); // フォーカスを当てるフラグをtrueに設定
    }
    
    // h1タイトル入力時、エンターキーを無効化
    const handleKeyDownH1 = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enterキーのデフォルトの改行処理を防ぐ
        }
    }

    // 文字がない状態でバックスペース → 要素を削除
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const el = divRefs.current[index];
            // バックスペースキーが押されたときに内容が空なら要素を削除
            if (el.innerText === '') {
                setPostList(prevList => prevList.filter((_, i) => i !== index));
                // contentsの要素も削除
                setContents(prevContents => prevContents.filter((_, i) => i !== index));
            }
        }
    }

    // 「上に移動」ボタンのクリック時（例：index=5 → 4）
    const handleMoveUp = (index) => {
        if (index > 0) {
            // Model要素をコピーして新しい配列を作成
            const updatedList = [...post_list];
            [updatedList[index - 1], updatedList[index]] = [updatedList[index], updatedList[index - 1]];
            setPostList(updatedList);
            
            // 表示要素も同様に
            const updatedContents = [...contents];
            // 入力中の文字列を反映
            updatedContents[index] = divRefs.current[index].innerText;
            [updatedContents[index - 1], updatedContents[index]] = [updatedContents[index], updatedContents[index - 1]];
            setContents(updatedContents);
        }
    }

    // 「下に移動」ボタンのクリック時
    const handleMoveDown = (index) => {
        if (index < post_list.length - 1) {
            // Model要素をコピーして新しい配列を作成
            const updatedList = [...post_list];
            [updatedList[index], updatedList[index + 1]] = [updatedList[index + 1], updatedList[index]];
            setPostList(updatedList);
            
            // 表示要素も同様に
            const updatedContents = [...contents];
            // 入力中の文字列を反映
            updatedContents[index] = divRefs.current[index].innerText;
            [updatedContents[index], updatedContents[index + 1]] = [updatedContents[index + 1], updatedContents[index]];
            setContents(updatedContents);
        }
    }

    return (
        <Authenticator.Provider>
        <HeaderAdmin />
        <Authenticator hideSignUp={true}>
        {({ signOut, user }) => ( 
        <>
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
            >
                <Flex
                    justifyContent="flex-end"
                    style={{
                        paddingBottom: '20px',
                        position: 'sticky',
                        top: 0, // 画面上部からの位置を指定します
                        zIndex: 1, // 必要に応じてz-indexを調整します
                    }}
                >
                    <Button variation="link" size="small"><Link href="/admin/postlist">一覧に戻る</Link></Button>
                    {
                        post ?
                        <Button variation="warning" onClick={onUClick} size="small">更新する</Button>
                        :
                        ''
                    }
                </Flex>
                
                <RadioGroupField
                    label="記事のタイプ"
                    name="article_type"
                    direction="row"
                    style={{ marginBottom: '20px' }}
                >
                    <Radio value="basic">基本タイプ</Radio>
                    <Radio value="link">リンクタイプ</Radio>
                </RadioGroupField>
                <Card>
                    <Flex direction="column" alignItems="flex-start" className="ProseMirror note-common-styles__textnote-body">
                        {
                            post ?
                            <h1
                                contentEditable
                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px" }}
                                dangerouslySetInnerHTML={{ __html: post && post.title ? post.title : '' }}
                                ref={titleRef} // refをtitle要素に紐付け
                                onKeyDown={handleKeyDownH1} // Enterキーの処理を行う
                                placeholder="記事タイトル"
                                className={styles.editableContentH1}
                            />
                            :
                            ''
                        }
                        {
                            post_list.length > 0 ?
                            post_list.map((postItem, index) => {
                                // 上に移動ボタン
                                const renderUpElement = (index) => {
                                    if (index > 0) {
                                        return (
                                            <Button onClick={() => handleMoveUp(index)} className="amplify-button amplify-field-group__control amplify-button--default amplify-button--small">↑</Button>
                                        )
                                    } else {
                                        return (
                                            <Button isDisabled={true} className="amplify-button amplify-field-group__control amplify-button--default amplify-button--small amplify-button--disabled">↑</Button>
                                        )
                                    }
                                }
                                // 下に移動ボタン
                                const renderDownElement = (index) => {
                                    if (index < post_list.length - 1) {
                                        return (
                                            <Button onClick={() => handleMoveDown(index)} className="amplify-button amplify-field-group__control amplify-button--default amplify-button--small">↓</Button>
                                        )
                                    } else {
                                        return (
                                            <Button isDisabled={true} className="amplify-button amplify-field-group__control amplify-button--default amplify-button--small amplify-button--disabled">↓</Button>
                                        )
                                    }
                                }
                                if (postItem.type === "div") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <div
                                                key={index}
                                                contentEditable
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: contents[index] ? contents[index].replace(/\n/g, '<br />') : '' }}
                                                ref={el => (divRefs.current[index] = el)}
                                                onKeyDown={e => handleKeyDown(e, index)}
                                                //onClick={() => setSelectedElementIndex(index)}
                                            />
                                            <Flex>
                                                {renderUpElement(index)}
                                                {renderDownElement(index)}
                                            </Flex>
                                        </Flex>
                                    )
                                } else if (postItem.type === "h2") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <h2
                                                key={index}
                                                contentEditable
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: contents[index] ? contents[index].replace(/\n/g, '<br />') : '' }}
                                                ref={el => (divRefs.current[index] = el)}
                                                onKeyDown={e => handleKeyDown(e, index)}
                                            />
                                            <Flex>
                                                {renderUpElement(index)}
                                                {renderDownElement(index)}
                                            </Flex>
                                        </Flex>
                                    )
                                } else if (postItem.type === "h3") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <h3
                                                key={index}
                                                contentEditable
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: contents[index] ? contents[index].replace(/\n/g, '<br />') : '' }}
                                                ref={el => (divRefs.current[index] = el)}
                                                onKeyDown={e => handleKeyDown(e, index)}
                                            />
                                            <Flex>
                                                {renderUpElement(index)}
                                                {renderDownElement(index)}
                                            </Flex>
                                        </Flex>
                                    )
                                }
                            })
                            :
                            ''
                        }
                         {
                            post ?
                            <Flex direction="row">
                                <Button variation="default" onClick={() => handleAddElement("div")} size="small">段落の追加</Button>
                                <Button variation="default" onClick={() => handleAddElement("h2")} size="small">h2大見出しの追加</Button>
                                <Button variation="default" onClick={() => handleAddElement("h3")} size="small">h3小見出しの追加</Button>
                            </Flex>
                            :
                            ''
                         }
                    </Flex>
                    {
                        post ?
                        <Flex justifyContent="flex-end">
                            <Link href="#" onClick={onDClick}>削除する</Link>
                        </Flex>
                        :
                        ''
                    }
                </Card>
            </View>
        </>
        )}
        </Authenticator>
        </Authenticator.Provider>
    )
}

export default PostDetail
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
    //const [post_list_flag, setPostListFlag] = useState(false)
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
    //}, [param_id, post_list_flag])
    }, [])

    // 要素追加時
    useEffect(() => {
        
    }, [focusOnNextAdd, post_list])
    
    // 初期処理
    async function doInit() {
        if (param_id) {
            setId(param_id)
            
        }
    }

    // 更新ボタンクリック
    const onUClick = async (e) => {
        
    }

    // 削除ボタンクリック
    const onDClick = async (e) => {
        
    }

    // 要素追加時（段落（div）・h2大見出し（h2）・h3小見出し（h3））
    const handleAddElement = (tag_type) => {
        
    }
    
    // h1タイトル入力時、エンターキーを無効化
    const handleKeyDownH1 = (e) => {
        
    }

    // 文字がない状態でバックスペース → 要素を削除
    const handleKeyDown = (e, index) => {
        
    }

    // 「上に移動」ボタンのクリック時（例：index=5 → 4）
    const handleMoveUp = (index) => {
        
    }

    // 「下に移動」ボタンのクリック時
    const handleMoveDown = (index) => {
        
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
                    // TODO:
                    defaultValue="basic"
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
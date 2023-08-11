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
    }, [])

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
            aaa
        </>
        )}
        </Authenticator>
        </Authenticator.Provider>
    )
}

export default PostDetail
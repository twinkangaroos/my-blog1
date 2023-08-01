import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Post } from '../../../models';
import { useState, useEffect } from 'react';
import { Heading, Card, View, Flex, TextField, Button, TextAreaField, Text, useTheme } from '@aws-amplify/ui-react';
import { useRef } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, ModalButton } from 'react-modal'
//import { Modal, ModalHeader, ModalBody, ModalFooter, Input, ModalButton } from 'react-bootstrap';

const PostDetail = () => {
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

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
            setId(param_id)
            const post_result = await DataStore.query(Post, (c) => c.id.eq(param_id))
            setTitle(post_result[0].title)
            setContent(post_result[0].content)
        }

    }

    // 更新ボタンクリック
    const onUClick = async (e) => {
        e.preventDefault();
        try {
            console.log("TODO:update")
        } catch (error) {
            console.error('更新時にエラーが発生しました:', error);
        }
    }
    // 削除ボタンクリック
    const onDClick = async (e) => {
        e.preventDefault();
        try {
            console.log("TODO:delete")
        } catch (error) {
            console.error('削除時にエラーが発生しました:', error);
        }
    }

    const inputEls = useRef([]); // テキストボックスの参照を保持する配列
    const [names, setNames] = useState(['']); // テキストボックスの値を保持する配列
    const [focusOnNextAdd, setFocusOnNextAdd] = useState(true); // テキストエリア追加時にフォーカスを当てるかのフラグ

    // テキストボックスの値が変更された時に実行する関数
    const handleOnChange = (e, index) => {
        const updatedNames = [...names];
        updatedNames[index] = e.target.value;
        setNames(updatedNames);
    }

    // フォーカスを当てるボタンが押された時に実行する関数
    const handleOnClick = (index) => () => {
        inputEls.current[index].focus();
    };

    // テキストボックスを追加するボタンが押された時に実行する関数
    const handleAddTextArea = () => {
        setNames([...names, ''])
        setFocusOnNextAdd(true); // フォーカスを当てるフラグをtrueに設定
    }
    
    // テキストボックスを追加した後に、新しく追加されたテキストボックスにフォーカスを当てる
    useEffect(() => {
        if (focusOnNextAdd && inputEls.current.length > 0) {
            inputEls.current[inputEls.current.length - 1].focus()
            setFocusOnNextAdd(false) // フォーカスを当てるフラグをfalseに設定
        }
    }, [focusOnNextAdd, names])
    



    // 選択されたテキストエリアのインデックスを保持するステート変数
    const [selectedTextArea, setSelectedTextArea] = useState(null);
    // ポップアップで編集されたテキストを保持するステート変数
    const [editedText, setEditedText] = useState("");
    
    // テキストエリアを選択した時に実行される関数
    const handleTextAreaSelect = (e, index) => {
        console.log(
            e.currentTarget.value.substring(
                e.currentTarget.selectionStart,
                e.currentTarget.selectionEnd
            )
        )
        
        setSelectedTextArea(index); // 選択されたテキストエリアのインデックスを更新
        setEditedText(names[index]); // ポップアップの入力欄に現在のテキストエリアの内容を設定
    }

    // リンクを設定するボタンがクリックされた時に実行される関数
    const handleSetLink = () => {
        // editedTextの内容を選択されたテキストエリアに設定する
        if (selectedTextArea !== null) {
            const updatedNames = [...names];
            updatedNames[selectedTextArea] = editedText;
            setNames(updatedNames);
            setSelectedTextArea(null); // ポップアップを閉じるためにnullにリセット
            setEditedText(""); // ポップアップの入力欄をクリア
        }
    };

    // ポップアップを閉じるボタンがクリックされた時に実行される関数
    const handleClosePopup = () => {
        setSelectedTextArea(null);
        setEditedText("");
    };


    return (
        <>
            {/* ポップアップ */}
            {selectedTextArea !== null && (
                <Modal isOpen={true} onRequestClose={handleClosePopup}>
                    <ModalHeader>リンクを設定する</ModalHeader>
                    <ModalBody>
                        <Input value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <ModalButton onClick={handleSetLink}>設定</ModalButton>
                        <ModalButton variation="danger" onClick={handleClosePopup}>キャンセル</ModalButton>
                    </ModalFooter>
                </Modal>
            )}
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
                >
                <Card>
                    <Flex direction="column" alignItems="flex-start" className="ProseMirror note-common-styles__textnote-body">
                        <TextField
                            placeholder="記事タイトル"
                            label="タイトル"
                            errorMessage="There is an error"
                            defaultValue={title}
                            width="620px"
                            variation="quiet"
                            isRequired={true}
                            onChange={e => setTitle(e.target.value)}
                        />
                        {
                            names.map((name, index) => (
                                <TextAreaField 
                                    key={index}
                                    ref={(el) => (inputEls.current[index] = el)}
                                    value={name}
                                    onChange={(e) => handleOnChange(e, index)}
                                    rows={name.split('\n').length} // 改行の数に応じてrowsを増やす
                                    width="620px"
                                    style={{ border: 'none', outline: 'none', resize: 'none', width: '100%' }} // 枠線をゼロにするCSSスタイルを適用
                                    onSelect={(e) => handleTextAreaSelect(e, index)}
                                    //resize="vertical"
                                    //label="本文"
                                    //defaultValue = {content}
                                    //variation="quiet"
                                    //isRequired={true}
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
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Post } from '../../../models';
import { useState, useEffect } from 'react';
import { Heading, Card, View, Flex, TextField, Button, TextAreaField, Text, useTheme } from '@aws-amplify/ui-react';
import { useRef } from 'react';

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

    const [textAreas, setTextAreas] = useState([{ id: 1, value: '' }])
    const [pAreas, setPAreas] = useState([{ id: 1, value: '' }])

    // KeyUpイベントで改行コードを見つけたら新たなTextAreaを追加。ただし、Shift+Enterは無視。
    const handleTextAreaKeyUp = (event, id) => {
        const inputRef = useRef(null)

        if (event.key === 'Enter' && !event.shiftKey && event.target.value.trim() !== '' 
            && event.target.value.slice(-1) === '\n') {
            event.preventDefault();
            const lastTextArea = textAreas[textAreas.length - 1];
            // 入力中のテキストエリアが最後尾の場合
            if (lastTextArea.id === id) {
                // 最後の改行コードを取り除く
                const hasNewLine = event.target.value.includes('\n');
                console.log("pre_kaigyou?=", hasNewLine)
                console.log("pre=", event.target.value)
                const updatedValue = event.target.value.slice(0, -1);
                const hasNewLine2 = updatedValue.includes('\n');
                console.log("after_kaigyou?=", hasNewLine2)
                console.log("after=", updatedValue)
                // 最後のテキストエリアのvalueにupdatedValueの値をセット
                const updatedTextAreas = textAreas.map(textArea => {
                    if (textArea.id === lastTextArea.id) {
                        return { ...textArea, value: updatedValue };
                    }
                    return textArea;
                });
                // 新しくテキストエリアを追加
                setTextAreas(prevState => [
                    // 既存の配列を展開して後ろに配列を追加
                    ...prevState,
                    { id: id + 1, value: '' }
                ])
                //　次のテキストエリアにフォーカス
                textareaRefs[index + 1].current.focus()
            }
        }
    }
    // changeイベントでTextArea配列を詰め直し
    const handleTextAreaChange = (event, id) => {
        const updatedTextAreas = textAreas.map(textArea => {
            // 入力中のテキストエリアのみ値を更新
            if (textArea.id === id) {
                return { ...textArea, value: event.target.value };
            }
            return textArea;
        });
        setTextAreas(updatedTextAreas);
    }

    const textareaRefs = []; // 複数のテキストエリアの参照を格納する配列

    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter') {
          // Enterキーが押されたら次のテキストエリアにフォーカスを移す
          if (index < textareaRefs.length - 1) {
            textareaRefs[index + 1].current.focus();
          }
        }
    }

    const inputEl = useRef(null);
    const handleOnClick = () => console.log(inputEl);

    return (
        <>
            <input ref="{inputEl}" type="text" />
            <button onClick={handleOnClick}>フォーカスを当てる</button>
            {
                Array.from({ length: 3 }).map((_, index) => (
                    <textarea
                        key={index}
                        ref={(ref) => (textareaRefs[index] = ref)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                )
                )
            }
            <div>
                {
                /*
                textAreas.map(textArea => (
                    <textarea
                        key={textArea.id}
                        value={textArea.value}
                        onChange={event => handleTextAreaChange(event, textArea.id)}
                        onKeyUp={event => handleTextAreaKeyUp(event, textArea.id)}
                        rows={4}
                        cols={40}
                    />
                ))
                */
                }
            </div>
            {/*
            <div class="sc-d525148d-4 cbrQzt">
                <label class="amplify-label" for="amplify-id-:Rcm:">本文</label>
                <div contentEditable="true" class="ProseMirror note-common-styles__textnote-body" role="textbox" aria-multiline="true">
                    <Heading width='30vw' level={2}>
                        h２要素です
                    </Heading>
                    <p>
                        p要素です
                    </p>
                </div>
            </div>
            */}
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
                            width="80%"
                            variation="quiet"
                            isRequired={true}
                            onChange={e => setTitle(e.target.value)}
                        />
                        
                        {textAreas.map(textArea => (
                            <TextAreaField 
                                key={textArea.id}
                                value={textArea.value}
                                ref={(ref) => (textArea.id = ref)}
                                onChange={event => handleTextAreaChange(event, textArea.id)}
                                onKeyUpCapture={event => handleTextAreaKeyUp(event, textArea.id)}
                                //label="本文"
                                //defaultValue = {content}
                                rows="1"
                                //variation="quiet"
                                width="80%"
                                resize="vertical"
                                //isRequired={true}
                            /> 
                        ))}
                        
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
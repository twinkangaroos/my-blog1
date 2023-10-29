import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { GctNews, GctNewsList } from '../../../../models';
import { useState, useEffect } from 'react';
import { View, Flex, Button, useTheme, Link, Image, Table, TableHead, TableRow, TableCell, TableBody } from '@aws-amplify/ui-react';
import { useRef } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import HeaderAdmin from "../../../HeaderAdmin";
//import ImageUploader from '../../../../utils/ImageUploader';
import { Storage } from 'aws-amplify';
import CommonHeader from "../CommonHeader"

const GctNewsDetail = () => {
    const [gctNews, setGctNews] = useState("")
    const [gctNewsList, setGctNewsList] = useState([])
    const [id, setId] = useState("") // パラメータのIDを親IDとして保存
    
    const [focusOnNextAdd, setFocusOnNextAdd] = useState(true); // 要素追加時にフォーカスを当てるかのフラグ
    const [contents, setContents] = useState(['']); // 各要素のvalueを保持する配列（移動時に必要。Modelは書き込み不可のため）
    const [contentsImagePath, setContentsImagePath] = useState(['']) // imgのファイルパスを保持する配列
    const divRefs = useRef([]); // contenteditableの参照を保持する配列
    
    const titleRef = useRef(null) // title要素のrefを作成
    const showDateRef = useRef(null)
    
    const [selectedFile, setSelectedFile] = useState(null);


    // パスパラメータからidを取得
    const router = useRouter()
    const param_id = router.query.id
    const { tokens } = useTheme()

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
    }, [param_id])

    // 要素追加時
    useEffect(() => {
        if (focusOnNextAdd && divRefs.current.length > 0) {
            // 新しく追加された要素にフォーカスを当てる
            if (divRefs.current[divRefs.current.length - 1]) {
                divRefs.current[divRefs.current.length - 1].focus()
                setFocusOnNextAdd(false) // フォーカスを当てるフラグをfalseに設定
            }
        }
    }, [focusOnNextAdd, gctNewsList])
    
    // 初期処理
    const doInit = async() => {
        if (param_id) {
            setId(param_id)
            // GctNews取得
            const gctNewsResult = await DataStore.query(GctNews, (c) => c.id.eq(param_id))
            if (gctNewsResult && gctNewsResult.length > 0) {
                setGctNews(gctNewsResult[0])
                console.log("First success in taking GctNews.", gctNewsResult[0])

                // GctNewsList取得
                const gctNewsListResult = await DataStore.query(GctNewsList, (c) => c.gct_news_id.eq(param_id), {
                    sort:(s) => s.sort(SortDirection.ASCENDING),
                })
                if (gctNewsListResult && gctNewsListResult.length > 0) {
                    // Model形式で保持（例：[0]Model {id: '', ..} [1]Model {id: '', ..}）
                    setGctNewsList(gctNewsListResult)
                    // DBのgctNewsList.conent をテキストで保持
                    const updatedContents = gctNewsListResult.map(item => {
                        return item.content
                    })
                    setContents(updatedContents)

                    // DBのgctNewsList.type = imag の場合ImagePathを保持
                    const updatedImagePathPromises = gctNewsListResult.map(async item => {
                        let imagePath = ""
                        if (item.type === "img") {
                            try {
                                imagePath = await Storage.get(item.content)
                            }
                            catch (error) {
                                console.error('Error fetchImage:', error);
                            }
                        }
                        return imagePath
                    })
                    //　Promiseオブジェクトの配列のため、Promiseの結果を取り出してからセットする必要がある。
                    const updatedImagePath = await Promise.all(updatedImagePathPromises)
                    setContentsImagePath(updatedImagePath)
                    
                    console.log("First success in taking GctNewsList.")
                }
            } else {
                console.log("Error when retrieving DB during doInit().....")
            }
        }
    }

    // TODO:配列ごとに保持要
    // ファイル選択時
    const handleFileChange = (e) => {
        const selectFile = e.target.files[0];
        setSelectedFile(selectFile);
    }

    // ファイルアップロード時
    const handleFileUpload = async (index) => {
        if (selectedFile) {
            try {
                const imageFile = await Storage.put(selectedFile.name, selectedFile); // ファイルのアップロード
                console.log("File upload succeeded! ", selectedFile.name)
                
                const updatedContents = [...contents]; // コピーを作成
                updatedContents[index] = selectedFile.name; // 配列に「ファイル名」を格納
                setContents(updatedContents); // 配列を更新

                const updatedContentsImagePath = [...contentsImagePath]; // コピーを作成
                const imagePath = await Storage.get(selectedFile.name)
                updatedContentsImagePath[index] = imagePath // 配列に「ファイルパス」を格納
                setContentsImagePath(updatedContentsImagePath); // 配列を更新
            } catch (error) {
                console.error('File upload failed. ', error);
            }
        }
    }

    
    // 更新ボタンクリック
    const onUClick = async (e) => {
        e.preventDefault()
        try {
            if (id) {
                if (!titleRef.current.innerText) {
                    alert("タイトルを入力してください")
                    return
                }
                
                const updatedTitle = titleRef.current.innerText
                const currentDate = new Date() // 2023-08-09T09:02:09.955Z
                // AWSDate 形式に変換
                const awsDate = currentDate.toISOString().split('T')[0]
                
                // gctNews再取得
                const currentGctNews = await DataStore.query(GctNews, (c) => c.id.eq(id))
                if (currentGctNews && currentGctNews.length > 0) {
                    // GctNewsの更新
                    const updatedGctNews = await DataStore.save(
                        GctNews.copyOf(
                            currentGctNews[0], 
                            updated => {
                                updated.title = updatedTitle
                                updated.show_date = awsDate
                            }
                        )
                    )
                    console.log("GctNews successfully updated.")
                } else {
                    console.log("Error when retrieving GctNews before Updated.....")
                    return
                }
                
                // GctNewsListの全削除（※gct_news_idで一括削除するとトランザクションがおかしくなる？）
                await DataStore.delete(GctNewsList, (gctNewsList) => gctNewsList.gct_news_id.eq(id))
                console.log("All GctNewsList successfully deleted.")
                
                // GctNewsListの再作成
                if (gctNewsList && gctNewsList.length > 0) {
                    // contenteditableの内容を取得（※追加したてのnullの考慮要）
                    const updatedContent = gctNewsList.map((_pl, index) => {
                        // imgの場合、contentsの値を採用
                        if (_pl.type == "img") {
                            return contents[index] ? contents[index] : ''
                        }
                        // それ以外はcontenteditableの内容を取得 
                        else {
                            const el = divRefs.current[index]
                            return el ? el.innerText : ''
                        }
                    })
                    
                    // GctNewsListの再作成
                    let i = 0
                    for (const pl of gctNewsList) {
                        const updatedContentValue = updatedContent[i] // 更新後のcontentの値を取得
                        await DataStore.save(
                            new GctNewsList({
                                "content": updatedContentValue,
                                "type": pl.type,
                                "sort": i,
                                "gct_news_id": id,
                            })
                        )
                        i++
                    }
                    console.log("All GctNewsList successfully created.")
                }

                // GctNews再取得（※この時点で取得してもうまくいかない模様）
                const r_result = await DataStore.query(GctNews, (c) => c.id.eq(id))
                if (r_result && r_result.length > 0) {
                    setGctNews(r_result[0])
                    console.log("Success in taking GctNews again.", r_result[0])
                } else {
                    console.log("Error when retrieving GctNews after Updated.....")
                    return
                }
                
                alert("更新完了しました。")
            } else {
                console.log("記事が見つかりません")
                return
            }
        }
        catch (error) {
            console.error('更新時にエラーが発生しました:', error);
        }
    }

    
    // 要素追加時（段落（div）・h2大見出し（h3）・h3小見出し（h4））
    const handleAddElement = (tag_type) => {
        setGctNewsList((prevList) => [...prevList, new GctNewsList({ content: '', type: tag_type })]); // gctNewsListに要素を追加
        setContents([...contents, ''])
        setFocusOnNextAdd(true); // フォーカスを当てるフラグをtrueに設定
    }

    // エンターキーを無効化
    const handleKeyDownEnter = (e) => {
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
                setGctNewsList(prevList => prevList.filter((_, i) => i !== index));
                // contentsの要素も削除
                setContents(prevContents => prevContents.filter((_, i) => i !== index));
            }
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
                    <Button variation="link" size="large"><Link href="/admin/gctnewslist">一覧に戻る</Link></Button>
                    {
                        gctNews ?
                        <Button variation="warning" onClick={onUClick} size="large">更新する</Button>
                        :
                        ''
                    }
                </Flex>
                
                <CommonHeader />
                
                {/* --------------------  main -------------------- */}
                <main>
                    <div className="wrapper">
                        <div className="content">
                            <header>
                                {
                                    gctNews ?
                                    <h1
                                        contentEditable
                                        dangerouslySetInnerHTML={{ __html: gctNews && gctNews.title ? gctNews.title : '' }}
                                        ref={titleRef} // refをtitle要素に紐付け
                                        onKeyDown={handleKeyDownEnter} // Enterキーの処理を行う
                                        placeholder="「英語学習ミニセミナー＆オンライン座談会」実施レポート"
                                        className='is-large'
                                    />
                                    : "DB取得に失敗しました。"
                                }
                            </header>
                            <div className="news-detail-info">
                                <div>
                                    <span className="cat-tip cat-case">導入事例</span>
                                    <div
                                        contentEditable
                                        dangerouslySetInnerHTML={{ __html: gctNews && gctNews.show_date ? gctNews.show_date : '' }}
                                        ref={showDateRef}
                                        onKeyDown={handleKeyDownEnter}
                                        style={{ float: "right" }}
                                    />
                                </div>
                                <ul className="tags">
                                    <li><span>TOEFL Primary®</span></li>
                                    <li><span>TOEFL Junior®</span></li>
                                    <li><span>イベント</span></li>
                                    <li><span>活用者インタビュー</span></li>
                                </ul>
                                <div style={{ margin: "5px 0", display: "none" }}>
                                    <a href="https://twitter.com/TOEFL_GCT?ref_src=twsrc%5Etfw" className="twitter-follow-button"
                                        data-show-count="false" data-lang="ja">Follow</a>
                                    <a href="https://twitter.com/share" className="twitter-share-button"
                                        data-text="「英語学習ミニセミナー＆オンライン座談会」実施レポート" data-url="https://gc-t.jp/news/case/8298/"
                                        data-lang="ja">Tweet</a>
                                </div>
                            </div>
                            
                            {/* --------------------  list -------------------- */}
                            <div className="news-detail-entry">
                            {
                                gctNewsList.length > 0 ?
                                gctNewsList.map((newsItem, index) => {
                                    // 上に移動ボタン
                                    //const renderUpElement = (index) => {
                                    //    if (index > 0) {
                                    //        return (
                                    //            <Button onClick={() => handleMoveUp(index)} className="amplify-button amplify-field-group__control amplify-button--default amplify-button--small">↑</Button>
                                    //        )
                                    //     } else {
                                    //         return (
                                    //             <Button isDisabled={true} className="amplify-button amplify-field-group__control amplify-button--default amplify-button--small amplify-button--disabled">↑</Button>
                                    //         )
                                    //     }
                                    // }
                                    // // 下に移動ボタン
                                    // const renderDownElement = (index) => {
                                    //     if (index < gctNewsList.length - 1) {
                                    //         return (
                                    //             <Button onClick={() => handleMoveDown(index)} className="amplify-button amplify-field-group__control amplify-button--default amplify-button--small">↓</Button>
                                    //         )
                                    //     } else {
                                    //         return (
                                    //             <Button isDisabled={true} className="amplify-button amplify-field-group__control amplify-button--default amplify-button--small amplify-button--disabled">↓</Button>
                                    //         )
                                    //     }
                                    // }
                                    if (newsItem.type === "div") {
                                        return (
                                            <Flex key={index + "_head"} className="left">
                                                <div
                                                    key={index}
                                                    contentEditable
                                                    style={{ lineHeight: "2", marginTop: "10px", marginBottom: "10px" }}
                                                    className="left"
                                                    dangerouslySetInnerHTML={{ __html: contents[index] ? contents[index].replace(/\n/g, '<br />') : '' }}
                                                    ref={el => (divRefs.current[index] = el)}
                                                    onKeyDown={e => handleKeyDown(e, index)}
                                                />
                                                
                                            </Flex>
                                        )
                                    } else if (newsItem.type === "img") {
                                        return (
                                            <Flex key={index + "_head"} className="right fr">
                                                <Flex direction="column">
                                                    <figure className="right fr">
                                                        <Image
                                                            key={index}
                                                            className="sp-none"
                                                            //src={"/gc-t.jp/wp-content/uploads/2017/09/news_main-1.jpg"}
                                                            src={contentsImagePath[index]}
                                                            width={300}
                                                        />
                                                    </figure>
                                                    <Flex justifyContent="flex-end">
                                                        <input type="file" key={"file_"+index} onChange={handleFileChange} style={{ fontSize: '9px' }} />
                                                        <Button variation="warning" key={"file_button_"+index} onClick={() => handleFileUpload(index)} size="small" style={{ fontSize: '9px' }}>アップロード</Button>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        )
                                    } else if (newsItem.type === "h3") {
                                        return (
                                            <Flex key={index + "_head"} direction="row" width={'100%'}>
                                                <h3
                                                    key={index}
                                                    contentEditable
                                                    style={{ TextIndent: "1em" }}
                                                    dangerouslySetInnerHTML={{ __html: contents[index] ? contents[index].replace(/\n/g, '<br />') : '' }}
                                                    ref={el => (divRefs.current[index] = el)}
                                                    onKeyDown={e => handleKeyDown(e, index)}
                                                />
                                                
                                            </Flex>
                                        )
                                    } else if (newsItem.type === "h4") {
                                        return (
                                            <Flex key={index + "_head"} direction="row" width={'100%'}>
                                                <h4
                                                    key={index}
                                                    contentEditable
                                                    //style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: '100%' }}
                                                    dangerouslySetInnerHTML={{ __html: contents[index] ? contents[index].replace(/\n/g, '<br />') : '' }}
                                                    ref={el => (divRefs.current[index] = el)}
                                                    onKeyDown={e => handleKeyDown(e, index)}
                                                />
                                                
                                            </Flex>
                                        )
                                    }
                                })
                                :
                                ''
                            }
                            </div>

                            {
                                gctNews ?
                                <Flex direction="row" alignItems="flex-end" style={{ marginTop: '20px', clear: "both" }}>
                                    <Button variation="default" onClick={() => handleAddElement("h3")} size="large" style={{height: '50px', fontWeight: 'bold'}}>大見出しの追加</Button>
                                    <Button variation="default" onClick={() => handleAddElement("h4")} size="large" style={{height: '40px'}}>小見出しの追加</Button>
                                    <Button variation="default" onClick={() => handleAddElement("div")} size="large" style={{height: '30px'}}>段落の追加</Button>
                                    <Button variation="default" onClick={() => handleAddElement("img")} size="large" style={{height: '30px'}}>画像の追加</Button>
                                </Flex>
                                :
                                'DB取得に失敗しました。'
                            }


                        </div>
                    </div>
                </main>


                
                

                

            </View>
        </>
        )}
        </Authenticator>
        </Authenticator.Provider>
    )
}

export default GctNewsDetail
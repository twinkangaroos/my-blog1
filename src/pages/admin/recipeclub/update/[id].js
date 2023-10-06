import '@aws-amplify/ui-react/styles.css';
//import styles from "../../../../styles/editable.module.css"
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Recipeclub } from '../../../../models';
import { useState, useEffect } from 'react';
import { View, Flex, Button, useTheme, Link, Image, Table, TableHead, TableRow, TableCell, TableBody } from '@aws-amplify/ui-react';
import { useRef } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import HeaderAdmin from "../../../HeaderAdmin";
import ImageUploader from '../../../../utils/ImageUploader';
import { Storage } from 'aws-amplify';
import Div2 from '../../../../components/div2';
import TableStore from '../../../../components/table_store';

const RecipeclubDetail = () => {
    const [recipeclub, setRecipeclub] = useState("")
    //const [post_list, setPostList] = useState([])
    const [id, setId] = useState("")
    const [main_image_path, setMainImagePath] = useState(null);
    const [main_image, setMainImage] = useState(null);
    const [brandsite_url, setBrandsiteUrl] = useState("")
    const [directshop_url, setDirectshopUrl] = useState("")
    const [amazon_url, setAmazonUrl] = useState("")
    const [lohaco_url, setLohacoUrl] = useState("")
    
    //const [focusOnNextAdd, setFocusOnNextAdd] = useState(true); // 要素追加時にフォーカスを当てるかのフラグ
    //const [contents, setContents] = useState(['']); // 各要素のvalueを保持する配列（移動時に必要。Modelは書き込み不可のため）
    //const divRefs = useRef([]); // contenteditableの参照を保持する配列
    
    const titleRef = useRef(null); // title要素のrefを作成
    const subtitleRef = useRef(null);
    const ingredientRef = useRef(null);
    const brandsiteUrlRef = useRef(null);
    const directshopUrlRef = useRef(null);
    const amazonUrlRef = useRef(null);
    const lohacoUrlRef = useRef(null);
    
    const [free_components, setFreeComponents] = useState([])
    const [free_components_data, setFreeComponentsData] = useState([])
    

    // パスパラメータからidを取得
    const router = useRouter()
    const param_id = router.query.id
    const { tokens } = useTheme()

    useEffect(() => {
        // publicのJSを読み込み
        const script1 = document.createElement('script');
        script1.type = 'text/javascript';
        script1.src = '/js/script_4.js';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = '/js/script_117.js';
        document.head.appendChild(script2);

        const script3 = document.createElement('script');
        script3.type = 'text/javascript';
        script3.src = '/js/script_127.js';
        document.head.appendChild(script3);

        return () => {
            // コンポーネントがアンマウントされた際のクリーンアップ処理
            document.head.removeChild(script1);
            document.head.removeChild(script2);
            document.head.removeChild(script3);
        };
    }, []);

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
    }, [param_id])
    
    // 初期処理
    async function doInit() {
        if (param_id) {
            setId(param_id)
            // Recipeclub取得
            const recipe_result = await DataStore.query(Recipeclub, (c) => c.id.eq(param_id))
            if (recipe_result && recipe_result.length > 0) {
                setRecipeclub(recipe_result[0])
                console.log("First success in taking Recipeclub.", recipe_result[0])

                // メイン画像の取得
                try {
                    const image_file = await Storage.get(recipe_result[0].main_image)
                    setMainImagePath(image_file)
                }
                catch (error) {
                    console.error('Error fetchImage:', error);
                }
                // DB更新に備えて初期セット
                setMainImage(recipe_result[0].main_image)

                // 「ブランドサイトへ」リンク初期セット
                if (recipe_result[0].brandsite_url) {
                    brandsiteUrlRef.current.innerHTML = recipe_result[0].brandsite_url
                } else {
                    brandsiteUrlRef.current.innerHTML = '<a href="https://www.glico.com/jp/product/">〉ブランドサイトへ</a>';
                }
                
            } else {
                console.log("Error when retrieving DB during doInit().....")
            }
        }
    }

    // ImageUploaderからファイル名を受け取るコールバック関数
    const handleFileUpload = async (fileName) => {
        // メイン画像の再セット
        try {
            const image_file = await Storage.get(fileName)
            setMainImagePath(image_file)
        }
        catch (error) {
            console.error('Error fetchImage:', error);
        }
        setMainImage(fileName)
    }
    
    // 「〉ブランドサイトへ」リンク挿入
    const insertBrandsiteLink = () => {
        // https://www.glico.com/jp/product/snack_biscuit_cookie/cratz/?=recipeclub
        //const selectedText = window.getSelection().toString();
        //${selectedText}
        // 正規表現でhref属性の値を取得
        const str = brandsiteUrlRef.current.innerHTML;
        const hrefRegex = /href="([^"]+)"/;
        const match = str.match(hrefRegex);
        let hrefValue = '';
        if (match) {
            hrefValue = match[1];
            console.log('href属性の値:', hrefValue);
        }
        const url = prompt('リンク先URLを https:// から入力してください:', hrefValue);
        if (url) {
            // リンクを挿入
            const linkHTML = `<a href="${url}" target="_blank">〉ブランドサイトへ</a>`;
            brandsiteUrlRef.current.innerHTML = linkHTML;
            //document.execCommand('insertHTML', false, linkHTML);
        }
    }
    const insertDirectshopLink = () => {
    }
    const insertAmazonLink = () => {
    }
    const insertLohacoLink = () => {
    }

    
    // Div2コンポーネントを追加する
    const addComponentDiv2 = () => {
        // 空のデータ保持用配列を追加
        setFreeComponentsData((prevDataArray) => [...prevDataArray, {}]);
        setFreeComponents((prevFreeComponents) => {
            const index = prevFreeComponents.length // 現在の要素数をインデックスとして使用
            return [...prevFreeComponents, 
                <Div2 
                    key={index} 
                    onSaveComponentData={(data) => handleComponentDataSave(data, index)}
                />
            ]
        })
    }

    // Div2から入力されたデータを受け取るコールバック関数
    const handleComponentDataSave = (data, index) => {
        console.log("index", index)
        console.log("data", data)
        //setData
        setFreeComponentsData((prevDataArray) => {
            const updatedDataArray = [...prevDataArray];
            updatedDataArray[index] = data;
            return updatedDataArray;
        });
    }

    //　TableShopコンポーネントを追加する
    const addComponentTableStore = () => {
        // 空のデータ保持用配列を追加
        setFreeComponentsData((prevDataArray) => [...prevDataArray, {}]);

        setFreeComponents((prevFreeComponents) => {
            const index = prevFreeComponents.length // 現在の要素数をインデックスとして使用
            return [...prevFreeComponents,
                <TableStore
                    key={index}
                    onSaveComponentData={(data) => handleComponentDataSave(data, index)}
                />
            ]
        })
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
                if (!subtitleRef.current.innerText) {
                    alert("サブタイトルを入力してください")
                    return
                }
                if (!ingredientRef.current.innerHTML) {
                    alert("材料を入力してください")
                    return
                }
                if (!brandsiteUrlRef.current.innerHTML) {
                    alert("ブランドサイトURLを入力してください")
                    return
                }
                const updatedTitle = titleRef.current.innerText
                const updatedSubTitle = subtitleRef.current.innerText
                const updatedIngredient = ingredientRef.current.innerHTML
                const updatedBrandsiteUrl = brandsiteUrlRef.current.innerHTML
                const currentDate = new Date() // 2023-08-09T09:02:09.955Z
                // AWSDate 形式に変換
                const awsDate = currentDate.toISOString().split('T')[0]
                
                // Recipeclub再取得
                const current_recipeclub = await DataStore.query(Recipeclub, (c) => c.id.eq(id))
                if (current_recipeclub && current_recipeclub.length > 0) {
                    console.log("Success in taking Recipeclub immediately.", current_recipeclub[0])
                    
                    // Recipeclubの更新
                    const updatedRecipeclub = await DataStore.save(
                        Recipeclub.copyOf(
                            current_recipeclub[0], 
                            updated => {
                                updated.title = updatedTitle
                                updated.subtitle = updatedSubTitle
                                updated.main_image = main_image
                                updated.ingredient = updatedIngredient
                                updated.brandsite_url = updatedBrandsiteUrl
                                updated.show_date = awsDate
                            }
                        )
                    )
                    console.log("Recipeclub successfully updated.")
                } else {
                    console.log("Error when retrieving Recipeclub before Updated.....")
                    return
                }
                
                // Recipeclub再取得（※Recipeclubはこの時点で取得してもうまくいかない模様）
                const r_result = await DataStore.query(Recipeclub, (c) => c.id.eq(id))
                if (r_result && r_result.length > 0) {
                    setRecipeclub(r_result[0])
                    console.log("Success in taking Recipeclub again.", r_result[0])
                } else {
                    console.log("Error when retrieving Post after Updated.....")
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

    
    // h2タイトル入力時、エンターキーを無効化
    const handleKeyDownEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enterキーのデフォルトの改行処理を防ぐ
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
                    <Button variation="link" size="large"><Link href="/admin/postlist">一覧に戻る</Link></Button>
                    {
                        recipeclub ?
                        <Button variation="warning" onClick={onUClick} size="large">更新する</Button>
                        :
                        ''
                    }
                </Flex>
               
                <div className="c-breadcrumbsSet01">
                    <div className="l-contentsWidth">
                        <div className="l-mqWrapper">
                            <ol>
                                <li><Link href="/"><span>xxxx xxxxx</span></Link></li>
                                <li><Link href="/"><span>XXXXXX</span></Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="c-pageTitleSet01 type03">
                    <div className="bgArea" style={{ backgroundImage: `url('../../../image/recipe_page_title01.png')` }}></div>
                    <div className="bgAreaSp" style={{ backgroundImage: `url('../../../image/recipe_page_title01_sp.png'` }}></div>
                    <div className="titleArea">
                        <h1 className="m-pageTitle01"><span className="is-large">XXXXXX</span><span className="is-small">xxxxxx xxxx</span><span
                            className="townImage is-right" style={{ backgroundImage: `url('../../../image/recipe_town01.png'` }}></span>
                        </h1>
                    </div>
                </div>


                <div className="l-bgBlock01 is-bgImage bg-right" data-page-has-comment="/withglico/forum/comment.jsp"
                    data-get-cmt-text="/withglico/forum/content.jsp" data-check-login="/withglico/member/checklogin.jsp"
                    data-like-and-cmt="/withglico/forum/like.jsp?id=50702&type=1" data-like-action="/withglico/forum/like.jsp"
                    data-delete-img-action="/withglico/forum/comment.jsp?action=deleteimage"
                    data-delete-cmt-action="/withglico/forum/comment.jsp?action=delete" data-id-page-comment="50702"
                    data-type-page="1">
                    <div className="l-componentBlock" data-main-content="">
                        <div className="l-smallContentsWidth">
                            <div className="l-mqWrapper">
                                <div className="l-columnBlock">
                                    {
                                        recipeclub ?
                                        <h2
                                            contentEditable
                                            dangerouslySetInnerHTML={{ __html: recipeclub && recipeclub.title ? recipeclub.title : '' }}
                                            ref={titleRef} // refをtitle要素に紐付け
                                            onKeyDown={handleKeyDownEnter} // Enterキーの処理を行う
                                            placeholder="レシピタイトル"
                                            className='is-large'
                                        />
                                        :
                                        ''
                                    }
                                    
                                    <div
                                        contentEditable 
                                        dangerouslySetInnerHTML={{ __html: recipeclub && recipeclub.subtitle ? recipeclub.subtitle : '' }}
                                        ref={subtitleRef}
                                        onKeyDown={handleKeyDownEnter}
                                        placeholder="サブタイトル"
                                        className="recipe_shoukai"
                                    />

                                    <div className="recipe_img_zai">
                                        <div className="c-imageSet01">
                                            <div className="imageBlock">
                                                <div className="m-imageModule01">
                                                    <p className="image">
                                                        {
                                                            main_image_path && (
                                                                <Image src={main_image_path} />
                                                            )
                                                        }
                                                    </p>
                                                </div>
                                                <ImageUploader onFileUpload={handleFileUpload} />
                                                {main_image && <p style={{ fontSize: '9px' }}>ファイル名：{main_image}</p>}
                                            </div>
                                        </div>
                                        
                                        

                                        <div className="recipe_zairyo">
                                            <div><span className="recipe_zairyo_title">材料</span>　1人分</div>
                                            <ul 
                                                contentEditable
                                                dangerouslySetInnerHTML={{ __html: recipeclub && recipeclub.ingredient ? recipeclub.ingredient : '' }}
                                                ref={ingredientRef}
                                                className='editable-list'
                                            />
                                        </div>
                                    </div>

                                    <div className="recipe_glicoitem">
                                        <div>
                                            <div className="recipe_glicoitem_head">
                                                レシピに使用している商品はこちら
                                            </div>
                                            <div className="recipe_glicoitem_content">
                                                <div className="recipe_glicoitem_content_img">
                                                    <img src="https://with.glico.com/image.jsp?id=50700" alt="gi_bisco1" />
                                                </div>
                                                <div className="recipe_glicoitem_content_main">
                                                    <div className="recipe_glicoitem_title"><span>クラッツ＜ペッパーベーコン＞</span>
                                                        <Flex direction="row" justifyContent="flex-end">
                                                            <div
                                                                contentEditable
                                                                style={{ outline: 'none' }}
                                                                ref={brandsiteUrlRef}
                                                                className="brandsiteRef"
                                                            />
                                                            <div>
                                                                <Button variation="warning" onClick={insertBrandsiteLink} size="small">リンク確認・挿入</Button>
                                                            </div>
                                                        </Flex>
                                                    </div>
                                                    <div className="recipe_glicoitem_desc">
                                                        カリッと噛むたびに、ブラックペッパーをきかせたベーコンの濃厚な旨みがジュッワと溢れ出し、ビールの味を引き立てます。90％のビールユーザーに「ビールが進む」と評価されたおつまみスナックです。
                                                    </div>
                                                    <div className="recipe_glicoitem_links">
                                                        <ul style={{ listStyle: 'none' }}>
                                                            <li>
                                                                <p className="m-btnModule02  tagBtn">
                                                                    <a
                                                                    href="https://shop.glico.com/products/gh-6716744?&checked=1?=recipeclub"
                                                                    target="_blank"><span>ご購入はこちら<br className="tagBtnbr" />
                                                                        （ダイレクトショップ）</span></a>
                                                                </p>
                                                                <Button variation="warning" onClick={insertDirectshopLink} size="small">リンク確認・挿入</Button>
                                                                </li>
                                                            <li>
                                                                <p className="m-btnModule02  tagBtn">
                                                                    <a href="https://amzn.to/3pIUmZ7"
                                                                    target="_blank"><span>ご購入はこちら<br className="tagBtnbr" />
                                                                        （Amazon）</span></a>
                                                                </p>
                                                                <Button variation="warning" onClick={insertAmazonLink} size="small">リンク確認・挿入</Button>
                                                            </li>
                                                            <li>
                                                                <p className="m-btnModule02  tagBtn">
                                                                    <a
                                                                    href="https://lohaco.yahoo.co.jp/store/h-lohaco/item/j672363/?=recipeclub"
                                                                    target="_blank"><span>ご購入はこちら<br className="tagBtnbr" />
                                                                        （LOHACO）</span></a>
                                                                </p>
                                                                <Button variation="warning" onClick={insertLohacoLink} size="small">リンク確認・挿入</Button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="recipe_method">
                                        <div className="recipe_method_title">作り方</div>
                                        <ul>
                                            <li>
                                                <p className="kouteijun"><span>1</span></p>
                                                <div className="recipe_method_detail">
                                                    きゅうりは輪切りにし、塩少々（分量外）で揉んで5分おき、水気を絞る。じゃがいもはひと口サイズに切る。ミニトマトは4等分のくし切りにする。</div>
                                            </li>
                                            <li>
                                                <p className="kouteijun"><span>2</span></p>
                                                <div className="recipe_method_detail">
                                                    じゃがいもを耐熱容器に入れ、水小さじ1（分量外）をふってふんわりラップする。電子レンジ600Wで5分ほど加熱し、マッシャーやフォークなどで潰す。</div>
                                            </li>
                                            <li>
                                                <p className="kouteijun">3</p>
                                                <div className="recipe_method_detail">➁の粗熱がとれたら、クラッツ・①・マヨネーズを和え、塩・こしょうで味を整える。

                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="recipe_memo">
                                        <div className="recipe_memo_title">
                                            ひとことメモ
                                        </div>
                                        <div className="recipe_memo_content"><span
                                            style={{ fontSize: '16px', letterSpacing: '0.04em' }}>※材料のアレルゲンについては、ご確認の上でご調理ください。</span><span
                                                style={{ fontSize: '16px', letterSpacing: '0.04em', whiteSpace: 'pre' }}> </span><br />
                                        </div>
                                    </div>
                                    




                                    <hr />
                                    <div>
                                        <Flex style={{ fontSize: '11px', margin: '10px' }}>※以下、コンポーネント追加エリア</Flex>
                                        <Button variation="warning" onClick={addComponentDiv2} size="small">Div2コンポーネントを追加</Button>
                                        &nbsp;
                                        <Button variation="warning" onClick={addComponentTableStore} size="small">TableStoreコンポーネントを追加</Button>
                                    </div>
                                    <Flex style={{ margin: '10px' }}/>
                                    <div>
                                        {free_components.map((components, index) => (
                                            <div key={index}>{components}</div>
                                        ))}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                

            </View>
        </>
        )}
        </Authenticator>
        </Authenticator.Provider>
    )
}

export default RecipeclubDetail
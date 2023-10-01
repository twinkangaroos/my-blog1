import { useState, useEffect } from 'react';
import ImageUploader from '../utils/ImageUploader';
import { Image, Flex, Button } from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import { useRef } from 'react';

//　編集したテキストを返すため引数をセット
const Div2 = ({ onSaveComponentData, index }) => {
    const [sub_image, setSubImage] = useState(null);
    const [sub_image_path, setSubImagePath] = useState(null);
    const titleRef = useRef(null); // title要素のrefを作成
    const bodyRef = useRef(null);

    // 初期ロード時の処理
    useEffect(() => {
        titleRef.current.innerText = '手数料は？'
        bodyRef.current.innerHTML = `
            約定金額と別枠の委託手数料はいただかない代わりに、実質的なコストとして、「スプレッド（売買価格の差）」で調整される仕組みです。<br />
            買付の際は始値よりも、スプレッド分高い価格で買付いただき、売却の際はスプレッド分安い価格で売却していただきます。<br />
            なお、約定の際の単価は買付時は円未満切上げ、売却時は円未満切捨てとなります。
        `
    }, [])

    // ImageUploaderからファイル名を受け取るコールバック関数
    const handleFileUpload = async (fileName) => {
        // メイン画像の再セット
        try {
            const image_file = await Storage.get(fileName)
            setSubImagePath(image_file)
        }
        catch (error) {
            console.error('Error fetchImage:', error);
        }
        setSubImage(fileName)
    }

    // コンポーネントを仮保存
    const saveComponent = () => {
        //onTitleSave(titleRef.current.innerText, index) // Div2タイトルを親コンポーネントに渡す
        //onImageSave(sub_image, index) // 画像ファイル名を親コンポーネントに渡す

        const componentData = {
            title: titleRef.current.innerText,
            image: sub_image,
            body: bodyRef.current.innerHTML
        };
        onSaveComponentData(componentData, index); // オブジェクトを親コンポーネントに渡す
        alert('仮保存が成功しました')
    }

    return (
        <>
            <div>
                <h3 
                    contentEditable
                    ref={titleRef}
                />
                <div style={{ float: 'right', margin: '16px' }}>
                    <p style={{ margin: '0' }}>
                        {
                            sub_image_path && (
                                <Image src={sub_image_path} />
                            )
                        }
                    </p>
                    <ul style={{ padding: '0', margin: '0' }}>
                        <li style={{ listStyle: 'none', fontSize: '0.8em' }}><span>※</span>概算注文金額は、約定日となる日の基準値を元に算出されます。</li>
                    </ul>
                </div>
                <div>
                    <p contentEditable ref={bodyRef} />
                </div>
            </div>
            <Flex style={{ marginBottom: '10px' }} />
            <Flex direction="column" alignItems='center'>
                <ImageUploader onFileUpload={handleFileUpload} />
                {sub_image && <p style={{ fontSize: '9px' }}>ファイル名：{sub_image}</p>}
                <Button variation="warning" onClick={saveComponent} size="small">このコンポーネントを仮保存（※最終保存要）</Button>
            </Flex>
            <Flex style={{ marginBottom: '20px' }} />
        </>
    )
}

export default Div2

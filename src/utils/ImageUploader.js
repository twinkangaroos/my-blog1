import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';

//　アップロードしたファイル名を返すための引数をセット
const ImageUploader = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (file) {
            try {
                await Storage.put(file.name, file); // ファイルのアップロード
                onFileUpload(file.name); // アップロードしたファイル名を親コンポーネントに渡す
                alert('アップロードが成功しました');
            } catch (error) {
                console.error('アップロードエラー:', error);
            }
        } else {
            alert('ファイルを選択してください');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} style={{ fontSize: '9px' }} />
            <Button variation="warning" onClick={handleUpload} size="small">アップロード</Button>
        </div>
    );
}

export default ImageUploader
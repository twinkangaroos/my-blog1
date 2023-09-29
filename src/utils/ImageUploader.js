import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';

function ImageUploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await Storage.put(file.name, file); // ファイルのアップロード
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
      <input type="file" onChange={handleFileChange} style={{ fontSize: 'small' }} />
      <Button variation="warning" onClick={handleUpload} size="small">アップロード</Button>
    </div>
  );
}

export default ImageUploader;
import React, { useState } from 'react';
import Modal from 'react-modal';

// スタイルの設定（オーバーレイやモーダルのスタイルを指定）
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // モーダルの背後に表示されるオーバーレイのスタイル
        pointerEvents: 'auto', // 背後のコンテンツを操作可能にする
    },
    content: {
        width: '300px',
        height: '200px',
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        pointerEvents: 'auto', // モーダルが開かれた時に背後のコンテンツを操作可能にする
    },
};

// アプリのコンポーネント
function Test2() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // モーダルを開く関数
    const openModal = () => {
    setModalIsOpen(true);
    };

    // モーダルを閉じる関数
    const closeModal = () => {
    setModalIsOpen(false);
    };

  return (
    <div>
      <h1>React Modal サンプル</h1>
      <button onClick={openModal}>モーダルを開く</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={false} // 背後のコンテンツのクリックでモーダルを閉じない
        ariaHideApp={false} // スクリーンリーダーの警告を非表示にする（オプション）
      >
        <h2>モーダルコンテンツ</h2>
        <p>これはモーダルの中身です。</p>
        <button onClick={closeModal}>閉じる</button>
      </Modal>
    </div>
  );
}

export default Test2;
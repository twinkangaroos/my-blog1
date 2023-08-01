import React from 'react';
import styles from './FloatingBox.module.css'; // モジュールスタイルをインポート

function FloatingBox() {
  return (
    <div className={styles.container}>
      <div className={styles.floatingBox}>
        {/* ここにテキストボックスなどの入力要素を配置する */}
        <input type="button" value="aaa" />
        <input type="button" value="aaa" />
        <input type="button" value="aaa" />
        
      </div>
    </div>
  );
}

export default FloatingBox;
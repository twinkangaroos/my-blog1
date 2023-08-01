import { useState, useRef, useEffect } from 'react';

const Test = () => {
    const inputEls = useRef([]); // テキストボックスの参照を保持する配列
    const [names, setNames] = useState(['']); // テキストボックスの値を保持する配列
    const [focusOnNextAdd, setFocusOnNextAdd] = useState(true); // テキストエリア追加時にフォーカスを当てるかのフラグ

    // テキストボックスの値が変更された時に実行する関数
    const handleOnChange = (e, index) => {
        const updatedNames = [...names];
        updatedNames[index] = e.target.value;
        setNames(updatedNames);
    }

    const handleKeyUp = (e, index) => {
        if (e.key === 'Enter' && !e.shiftKey && (index === names.length - 1)) {
            e.preventDefault() // エンターキーが押された場合、デフォルトの改行を防ぐ
            // TODO：下記では、アルファベット入力の場合に改行が除去されない。。ボタンクリックの追加にする。
            // 改行を除去した後、テキストエリア追加
            if (e.target.value.match(/[\n\r]$/)) {
                const newValue = e.target.value.replace(/[\n\r]$/, ''); // 改行を除去
                const updatedNames = [...names];
                updatedNames[index] = newValue;
                setNames(updatedNames);
                // テキストエリア追加
                handleAddTextArea()
            }
        }
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
    
    return (
        <>
            <h1>テキストエリア動的追加</h1>
            <div>
                {
                    names.map((name, index) => (
                        <div key={index}>
                            <textarea
                                ref={(el) => (inputEls.current[index] = el)}
                                value={name}
                                onChange={(e) => handleOnChange(e, index)}
                                onKeyUp={(e) => handleKeyUp(e, index)}
                            />
                            <p>入力した名前{index + 1}:{name}</p>
                            <button onClick={handleOnClick(index)}>フォーカスを当てる</button>
                            <hr />
                        </div>
                    ))
                }
                <button onClick={handleAddTextArea}>テキストエリアを追加する</button>
            </div>
        </>
        
    )
}

export default Test

                /*
                    //const inputEl = useRef(null);
    //const inputEl2 = useRef(null);
    //const [name, setName] = useState('');
    //const [name2, setName2] = useState('');
    //const handleOnChange = (e) => setName(e.target.value);
    //const handleOnChange2 = (e) => setName2(e.target.value);
    //const handleOnClick = () => inputEl.current.focus();
    //const handleOnClick2 = () => inputEl2.current.focus();
                <div style={{ margin: '2em' }}>
                <input ref={inputEl} type="text" value={name} onChange={handleOnChange} />
                <input ref={inputEl2} type="text" value={name2} onChange={handleOnChange2} />
                <p>名前1:{name}</p>
                <p>名前2:{name2}</p>
                <button onClick={handleOnClick}>フォーカスを当てる</button>
                <button onClick={handleOnClick2}>フォーカスを当てる2</button>
                </div>
                */
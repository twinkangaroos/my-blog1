import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from 'react';
import { Flex, Button } from '@aws-amplify/ui-react';
import { useRef } from 'react';
import Div2 from '../../../../components/div2';
import TableStore from '../../../../components/table_store';

const Test = () => {
    //const [div2title, setDiv2Title] = useState([])
    //const [div2_image_name, setDiv2ImageName] = useState([])
    //const [table_data, setTableData] = useState("")
    const [free_components, setFreeComponents] = useState([])
    const [free_components_data, setFreeComponentsData] = useState([])
    
    // Div2コンポーネントを追加する
    const addComponentDiv2 = () => {
        // 空のデータ保持用配列を追加
        setFreeComponentsData((prevDataArray) => [...prevDataArray, {}]);

        setFreeComponents((prevFreeComponents) => {
            const index = prevFreeComponents.length // 現在の要素数をインデックスとして使用
            //const componentData = {
            //    title: "", // 初期値を設定
            //    image: ""  // 初期値を設定
            //};
            return [...prevFreeComponents, 
                <Div2 
                    key={index} 
                    //componentData={componentData}
                    onSaveComponentData={(data) => handleComponentDataSave(data, index)}
                />
            ]
            //return [...prevFreeComponents, 
            //    <Div2 
            //        key={index} 
            //        onTitleSave={(div2_title) => handleTitleSave(div2_title, index)} 
            //        onImageSave={(div2_image_name) => handleImageSave(div2_image_name, index)}
            //    />
            //]
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

    const checkData = () => {
        console.log("free_components", free_components)
        console.log("free_components_data", free_components_data)
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
    /*
    // Div2からテキストを受け取るコールバック関数
    const handleTitleSave = (div2_title, index) => {
        console.log("div2_title", div2_title)
        // div2title 配列の対応するインデックスに値をセット
        setDiv2Title((prevDiv2Titles) => {
            const newDiv2Titles = [...prevDiv2Titles];
            newDiv2Titles[index] = div2_title;
            return newDiv2Titles;
        })
        console.log("div2title", div2title)
    }
    const handleImageSave = (div2_image_name, index) => {
        console.log("div2_image_name", div2_image_name)
        // div2_image_name 配列の対応するインデックスに値をセット
        setDiv2ImageName((prevDiv2Images) => {
            const newDiv2Images = [...prevDiv2Images];
            newDiv2Images[index] = div2_image_name;
            return newDiv2Images;
        })
    }
    */


    // TableからTableテキストデータを受け取るコールバック関数
    //const handleTableSave = (table_data, index) => {
    //    // Tableデータセット
    //    console.log("table_data", table_data)
    //    setTableData(table_data)
    //}

    return (
        <>
            <div>
                <div style={{ fontSize: '11px', margin: '10px' }}>※以下、コンポーネント追加エリア</div>
                <Button variation="warning" onClick={addComponentDiv2} size="small">Div2コンポーネントを追加</Button>
                <Button variation="warning" onClick={addComponentTableStore} size="small">TableStoreコンポーネントを追加</Button>
                <Button variation="warning" onClick={checkData} size="small">変数チェック</Button>

            </div>
            <div style={{ margin: '10px' }}/>
            <div>
                {free_components.map((components, index) => (
                    <div key={index}>{components}</div>
                ))}
            </div>
        </>
    )
}

export default Test
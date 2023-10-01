import { Table, TableHead, TableRow, TableCell, TableBody } from '@aws-amplify/ui-react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Flex, Button } from '@aws-amplify/ui-react';

const TableStore = ({ onSaveComponentData, index }) => {
    const tableRef = useRef(null);
    
    // コンポーネントを仮保存
    const saveComponent = () => {
        const componentData = {
            table_data: tableRef.current.innerHTML,
        }
        onSaveComponentData(componentData, index); // オブジェクトを親コンポーネントに渡す
        alert('仮保存が成功しました')
    }

    // 初期ロード時の処理
    useEffect(() => {
        const initialTableHtml = `
            <table class="amplify-table amplify-table--normal amplify-table--striped" data-highlightonhover="false"
                data-size="normal" data-variation="striped">
                <caption class="amplify-table__caption">販売店舗一覧</caption>
                <thead class="amplify-table__head">
                    <tr class="amplify-table__row">
                        <th class="amplify-table__th">店舗名</th>
                        <th class="amplify-table__th">住所</th>
                        <th class="amplify-table__th">電話番号</th>
                    </tr>
                </thead>
                <tbody class="amplify-table__body">
                    <tr class="amplify-table__row">
                        <td class="amplify-table__td">仙台支店</td>
                        <td class="amplify-table__td">仙台市○○町</td>
                        <td class="amplify-table__td">99-9999-9999</td>
                    </tr>
                    <tr class="amplify-table__row">
                        <td class="amplify-table__td">尼崎支店</td>
                        <td class="amplify-table__td">尼崎市○○町</td>
                        <td class="amplify-table__td">99-9999-9999</td>
                    </tr>
                    <tr class="amplify-table__row">
                        <td class="amplify-table__td">熊本支店</td>
                        <td class="amplify-table__td">熊本市○○市</td>
                        <td class="amplify-table__td">99-9999-9999</td>
                    </tr>
                </tbody>
            </table>
        `;
        tableRef.current.innerHTML = initialTableHtml;
    }, [])

    return (
        <>
            <div contentEditable ref={tableRef} />
            <Flex style={{ marginBottom: '10px' }} />
            <Flex direction="column" alignItems='center'>
                <Button variation="warning" onClick={saveComponent} size="small">このコンポーネントを仮保存（※最終保存要）</Button>
            </Flex>
            <Flex style={{ marginBottom: '20px' }} />
        </>
    )
}

export default TableStore
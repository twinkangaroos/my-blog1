import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Post } from '../../models';
import { useState, useEffect } from 'react';
import { Table, TableCell, TableBody, TableHead, TableRow, Flex } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import HeaderAdmin from "../HeaderAdmin"

const PostList = () => {
    const [posts, setPosts] = useState([])

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
    }, [])

    async function doInit() {
        console.log("doInit")
        const items = await DataStore.query(Post, Predicates.ALL, {
            sort:(s) => s.createdAt(SortDirection.DESCENDING),
        })
        setPosts(items)
    }
    return (
        <>
        <HeaderAdmin />
        <Authenticator hideSignUp={true}>
        {({ signOut, user }) => ( 
        <>
            <Flex
                style={{
                    paddingBottom: '20px',
                    position: 'sticky',
                    top: 0, // 画面上部からの位置を指定します
                    zIndex: 1, // 必要に応じてz-indexを調整します
                }}
            >
                <h2>お知らせ管理</h2>
            </Flex>
            <Table
              caption={""}
              highlightOnHover={true}
              size={"small"}
              variation={"striped"}
              style={{ width: '96%' }}
            >
                <TableHead>
                    <TableRow>
                    <TableCell as="th">タイトル</TableCell>
                    <TableCell as="th">作成日時</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    posts.map(post => (
                        <TableRow key={post.id}>
                            <TableCell><Link href={`/admin/update/${post.id}`}>{post.title}</Link></TableCell>
                            <TableCell>{post.createdAt}</TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
        </>
        )}
        </Authenticator>
        </>
    )
}

export default PostList
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Post } from '../../models';
import { useState, useEffect } from 'react';
import { Table, TableCell, TableBody, TableHead, TableRow } from '@aws-amplify/ui-react';

const PostList = () => {
    const [posts, setPosts] = useState([])

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
    }, [])

    async function doInit() {
        console.log("init...")
        const items = await DataStore.query(Post, Predicates.ALL, {
            sort:(s) => s.createdAt(SortDirection.ASCENDING),
        })
        //const items = await DataStore.query(Post)
        console.log("get items.")
        setPosts(items)
    }
    return (
        <>
            <Table
              caption={""}
              highlightOnHover={true}
              size={"small"}
              variation={"striped"}
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
    )
}

export default PostList
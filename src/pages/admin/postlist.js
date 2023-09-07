import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Post } from '../../models';
import { useState, useEffect } from 'react';
import { Table, TableCell, TableBody, TableHead, TableRow, Flex, View, useTheme, Card, Button } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import HeaderAdmin from "../HeaderAdmin"
import { useRouter } from 'next/router'

const PostList = () => {
    const [posts, setPosts] = useState([])
    const { tokens } = useTheme()
    const router = useRouter()

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
        // real time functionality
        DataStore.observe(Post).subscribe(()  => {
            doInit()
        })
    }, [])

    // 初期処理
    async function doInit() {
        const items = await DataStore.query(Post, Predicates.ALL, {
            sort:(s) => s.createdAt(SortDirection.DESCENDING),
        })
        setPosts(items)
    }

    // 編集ボタンクリックで画面遷移
    const nextButtonClick = (p_id) => {
        // <Link href={`/admin/update/${post.id}`}>編集</Link>
        router.push(`/admin/update/${p_id}`)
    }

    // 記事作成ボタンクリックで画面遷移
    const createButtonClick = (p_id) => {
        router.push(`/admin/create_post`)
    }

    // 日付を成形する関数 TODO:共通化
    const extractDateAndTimeChars = (dateString) => {
        if (dateString) {
            return dateString.substring(0, 10) + " " + dateString.substring(11, 19)
        }
        return ""
    }

    return (
        <>
        <HeaderAdmin />
        <Authenticator hideSignUp={true}>
        {({ signOut, user }) => ( 
        <>
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
            >
                <Flex
                    justifyContent="flex-end"
                    style={{
                        paddingBottom: '20px',
                        position: 'sticky',
                        top: 0, // 画面上部からの位置を指定します
                        zIndex: 1, // 必要に応じてz-indexを調整します
                    }}
                >
                    <Button variation="warning" onClick={() => createButtonClick()} size="large">記事を作成する</Button>
                </Flex>
                <Flex>
                    <h2>記事一覧</h2>
                </Flex>
                <Flex style={{ width: '100%' }}>
                    <Table
                    caption={""}
                    highlightOnHover={true}
                    size={"large"}
                    //variation={"striped"}
                    >
                        <TableHead style={{ display: 'none' }}>
                            <TableRow>
                            <TableCell as="th"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            posts.map(post => (
                                <TableRow key={post.id}>
                                    <TableCell onClick={() => nextButtonClick(post.id)}>
                                        <Flex direction="row" justifyContent="space-between">
                                            <Flex direction="column" gap="0rem">
                                                <h3>{post.title}</h3>
                                                <Flex style={{ color: 'gray' }}>更新日：{extractDateAndTimeChars(post.updatedAt)}</Flex>
                                            </Flex>
                                            <Flex alignItems="center" style={{ marginRight: '10px' }}>
                                                <Button variation="default" onClick={() => nextButtonClick(post.id)} size='large'>編集</Button>
                                            </Flex>
                                        </Flex>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </Flex>
            </View>
        </>
        )}
        </Authenticator>
        </>
    )
}

export default PostList
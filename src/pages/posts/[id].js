import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Post, PostList } from '../../models';
import { useState, useEffect } from 'react';
import { Heading, Card, View, Flex, Text, useTheme } from '@aws-amplify/ui-react';

const PostComponent = () => {
    const [post, setPost] = useState("")
    const [post_list, setPostList] = useState([])
    const [id, setId] = useState("")
    
    // パスパラメータからidを取得
    const router = useRouter()
    const param_id = router.query.id
    const { tokens } = useTheme()

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
    }, [param_id])

    async function doInit() {
        if (param_id) {
            console.log("doInit getPost...", param_id)
            setId(param_id)
            // Post取得
            const post_result = await DataStore.query(Post, (c) => c.id.eq(param_id))
            if (post_result && post_result.length > 0) {
                setPost(post_result[0])
                console.log("Success in taking Post.")

                // PostList取得
                const post_list_result = await DataStore.query(PostList, (c) => c.post_id.eq(param_id), {
                    sort:(s) => s.sort(SortDirection.ASCENDING),
                })
                if (post_list_result && post_list_result.length > 0) {
                    setPostList(post_list_result)
                    console.log("Success in taking PostList.")
                }
            } else {
                console.log("Error when retrieving DB during doInit().....")
            }
        }
    }

    return (
        <>
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
            >
                <Card>
                    <Flex 
                        direction="column" 
                        alignItems="flex-start" 
                        className="ProseMirror note-common-styles__textnote-body"
                        width="640px"
                    >
                        <Text
                            level={2}
                            width="100%"
                            style={{ fontSize: '32px', fontWeight: 'bold', padding: '8px 16px 8px 16px' }}
                        >
                            {post.title}
                        </Text>
                        {
                            post_list.map((pl, index) => (
                                <Flex
                                    key={index}
                                    width="100%"
                                    style={{ padding: '8px 16px 8px 16px', lineHeight: '1.5' }}
                                >
                                    <p dangerouslySetInnerHTML={{ __html: pl.content.replace(/\n/g, '<br />') }} 
                                        style={{lineHeight: '1.5'}} />
                                </Flex>
                            ))
                        }
                    </Flex>
                </Card>
            </View>
        </>
    )
}

export default PostComponent
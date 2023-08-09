import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Post, PostList } from '../../models';
import { useState, useEffect } from 'react';
import { Card, View, Flex, useTheme, Button, TextAreaField, Badge, Heading, Text, Icon } from '@aws-amplify/ui-react';
import Header from "../Header"
import Markdown from 'react-markdown'

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
        // real time functionality
        DataStore.observe(Post).subscribe(()  => {
            doInit()
        })
        DataStore.observe(PostList).subscribe(()  => {
            doInit()
        })
    }, [param_id])

    async function doInit() {
        if (param_id) {
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
            <Header />
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
            >
                <Card>
                    <Flex direction="column" alignItems="flex-start" className="ProseMirror note-common-styles__textnote-body">
                        <h1
                            style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px" }}
                            dangerouslySetInnerHTML={{ __html: post && post.title ? post.title : '' }}
                        />
                        {
                            post_list.length > 0 ?
                            post_list.map((postItem, index) => {
                                const { type, content } = postItem
                                if (type === "div") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <div
                                                key={index}
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: content ? content.replace(/\n/g, '<br />') : '' }}
                                                Markdown
                                            />
                                        </Flex>
                                    )
                                } else if (type === "h2") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <h2
                                                key={index}
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: content ? content.replace(/\n/g, '<br />') : '' }}
                                            />
                                        </Flex>
                                    )
                                } else if (type === "h3") {
                                    return (
                                        <Flex key={index + "_head"}>
                                            <h3
                                                key={index}
                                                style={{ border: 'none', outline: 'none', lineHeight: '1.5', width: "640px"  }}
                                                dangerouslySetInnerHTML={{ __html: content ? content.replace(/\n/g, '<br />') : '' }}
                                            />
                                        </Flex>
                                    )
                                }
                            })
                            :
                            ''
                        }
                        
                    </Flex>
                    <Flex justifyContent="center">
                        <Button 
                            variation="default" 
                            size="Large" 
                            isFullWidth={true}
                            style={{ width: '100px', marginTop: '20px', borderColor: 'red' }}
                        >
                            <Icon
                                ariaLabel="Favorite"
                                viewBox={{ width: 24, height: 24 }}
                                pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
                                3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            />
                            いいね
                        </Button>
                    </Flex>

                    <h3>この記事にコメントをする</h3>
                    <TextAreaField 
                        //ref={(el) => (inputEls.current[index] = el)}
                        //value={pl.content}
                        //onChange={(e) => handleOnChange(e, index)}
                        rows="5"
                        width="100%"
                        //style={{ border: 'none', outline: 'none', lineHeight: '1.5' }} // 枠線をゼロにするCSSスタイルを適用
                        //resize="vertical"
                    />
                    <Flex justifyContent="center" style={{ marginBottom: '40px' }}>
                        <Button 
                            variation="primary" 
                            size="Large" 
                            isFullWidth={true}
                            style={{  width: '200px', marginTop: '20px', backgroundColor: 'red' }}
                        >確認画面へ</Button>
                    </Flex>

                    <h2>この記事に関するみなさんからのコメント</h2>
                    <Flex>
                        <Card variation="outlined" style={{ borderColor: 'lightgray' }}>
                            <Flex
                                direction="column"
                                gap={tokens.space.xs}
                            >
                                <Flex alignItems="flex-start">
                                    <Badge size="small" variation="info">
                                        こぐま
                                    </Badge>
                                    <Badge size="small" variation="success">
                                        2023.08.09 21:32
                                    </Badge>
                                </Flex>
                                <Text as="span">
                                    ちょっとしたお土産には、ビッグサイズの果物の形のお饅頭か、夏場や甘党でない人にはカレー味の煎餅が定番です
                                </Text>
                                <Flex 
                                    direction="row" 
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    <Button variation="default" size="small" >返信</Button>
                                    <Icon
                                        ariaLabel="Favorite"
                                        viewBox={{ width: 24, height: 24 }}
                                        pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
                                        3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    />
                                    3
                                </Flex>
                            </Flex>
                            
                        </Card>
                    </Flex>
                </Card>
            </View>
        </>
    )
}

export default PostComponent
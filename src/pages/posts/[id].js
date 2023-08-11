import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router'
import { DataStore, SortDirection } from '@aws-amplify/datastore';
import { Post, PostList } from '../../models';
import { useState, useEffect, use } from 'react';
import { Card, View, Flex, useTheme, Button, TextAreaField, Badge, Heading, Text, Icon } from '@aws-amplify/ui-react';
import Header from "../Header"
import Markdown from 'react-markdown'
import { Comment, User, Like, LikeComment } from '../../models';
import { useRef } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const PostComponent = () => {
    const [post, setPost] = useState("")
    const [post_list, setPostList] = useState([])
    const [id, setId] = useState("")
    const [my_comment, setMyComment] = useState("")
    const [comment_list, setCommentList] = useState([])
    //const [user, setUser] = useState([])
    const commentRef = useRef(null); // 記事に対するコメント入力要素のrefを作成
    const [like_id, setLikeId] = useState("")   // 記事に対するいいねの有無
    const [like_my_comment, setLikeMyComment] = useState([])    // 自分が各コメントにLikeしたか
    const [like_comment_counts, setLikeCommentCounts] = useState([]) // コメントidごとのいいね件数
    const [comment_user, setCommentUser] = useState([]) // コメントidごとのユーザーid
    
    // パスパラメータからidを取得
    const router = useRouter()
    const param_id = router.query.id
    const { tokens } = useTheme()

    const { user, signOut } = useAuthenticator((context) => [
        context.user,
        context.signOut,
    ])

    // 初期ロード時の処理
    useEffect(() => {
        doInit()
    }, [])

    // 初期処理
    async function doInit() {
        console.log("aaa")
    }

    return (
        <>
            <Header />
            <View
                backgroundColor={tokens.colors.background.secondary}
                padding={tokens.space.medium}
            >
                <Card>
                    <Flex direction="column" alignItems="center" className="ProseMirror note-common-styles__textnote-body">
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
                        
                        <Flex justifyContent="center">
                        {
                            user && like_id ?
                            <Button 
                                variation="default" 
                                size="Large" 
                                isFullWidth={true}
                                style={{ width: '180px', marginTop: '20px', borderColor: 'red' }}
                                onClick={() => onLikeClick()}
                            >
                            <>
                                <Icon
                                    ariaLabel="Favorite"
                                    viewBox={{ width: 24, height: 24 }}
                                    pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
                                    3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="red"
                                />
                                &nbsp;いいねを解除
                            </>
                            </Button>
                            :
                            ''
                        }
                        {
                            user && !like_id ?
                            <Button 
                                variation="default" 
                                size="Large" 
                                isFullWidth={true}
                                style={{ width: '180px', marginTop: '20px', borderColor: 'red' }}
                                onClick={() => onLikeClick()}
                            >
                            <>
                                <Icon
                                    ariaLabel="Favorite"
                                    viewBox={{ width: 24, height: 24 }}
                                    pathData="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0
                                    3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="lightgray"
                                />
                                &nbsp;いいね
                            </>
                            </Button>
                            :
                            ''
                        }
                        {
                            !user ?
                                <Button 
                                variation="default" 
                                size="Large" 
                                isFullWidth={true}
                                style={{ width: '400px', marginTop: '20px', borderColor: 'red' }}
                                //onClick={() => onLikeClick()}
                                isDisabled={true}
                            >「いいね」するにはログインしてください</Button>
                            :
                            ''
                        }
                        </Flex>

                        <h3>この記事にコメントする</h3>
                        <TextAreaField 
                            ref={(commentRef)}
                            rows="5"
                            style={{ outline: 'none', lineHeight: '1.5', width: "640px" }}
                            placeholder='コメント記入後、「コメントする」ボタンを押すとすぐに公開されます。'
                            onChange={(e) => setMyComment(e.target.value)}
                        />
                        <Flex justifyContent="center" style={{ marginBottom: '40px' }}>
                            {
                                user?
                                <Button 
                                    variation="primary"
                                    size="Large" 
                                    isFullWidth={true}
                                    style={{  width: '200px', marginTop: '20px', backgroundColor: 'red' }}
                                    onClick={() => onCommentClick()}
                                >コメントする</Button>
                                :
                                <Button 
                                    variation="primary"
                                    size="Large" 
                                    isFullWidth={true}
                                    style={{  width: '400px', marginTop: '20px' }}
                                    onClick={() => onCommentClick()}
                                    isDisabled={true}
                                >コメントするにはログインしてください</Button>
                            }
                            
                        </Flex>
                        
                    </Flex>
                </Card>
            </View>
        </>
    )
}

export default PostComponent
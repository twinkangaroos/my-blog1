import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Post } from '../models';
import { Inter } from 'next/font/google'
import { View, Flex, useTheme, Card, Badge, Heading } from '@aws-amplify/ui-react';
const inter = Inter({ subsets: ['latin'] });
import Header from "./Header"
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

const Home = () => {
    const [posts, setPosts] = useState([])
    const { tokens } = useTheme()

    const { user, route } = useAuthenticator((context) => [
        context.user,
        context.route,
    ]);

    // 初期処理
    useEffect(() => {
        fetchPosts();
        async function fetchPosts() {
            const postData = await DataStore.query(Post, Predicates.ALL, {
                sort: (s) => s.createdAt(SortDirection.DESCENDING),
            })
            setPosts(postData);
        }
        // real time functionality
        DataStore.observe(Post).subscribe(() => {
            fetchPosts();
        })
    }, [])

    // 日付を成形する関数
    const extractDateAndTimeChars = (dateString) => {
        if (dateString) {
            return dateString.substring(0, 10) + " " + dateString.substring(11, 19)
        }
        return ""
    }

    return (
        <>
            <Header />
            <Authenticator hideSignUp={true} signUpAttributes={['email', 'nickname']}>
                {({ signOut, user }) => (
                    <>
                        <View
                            backgroundColor={tokens.colors.background.secondary}
                            padding={tokens.space.medium}
                        >
                            <Flex>
                                <h2>記事一覧</h2>
                            </Flex>
                            <Flex direction="column" style={{ width: '100%' }} gap="0.2rem">
                                {
                                    posts.map(post => (
                                        <Card key={post.id}>
                                            <Flex direction="row" alignItems="flex-start">
                                                {/*
                                                <Image
                                                    alt="Road to milford sound"
                                                    src="/image/road-to-milford-new-zealand-800w.jpg"
                                                    width="80px"
                                                />
                                                */}
                                                <Flex
                                                    direction="column"
                                                    alignItems="flex-start"
                                                    gap={tokens.space.xs}
                                                >
                                                    <Flex>
                                                        <Badge variation="info">
                                                            {extractDateAndTimeChars(post.updatedAt)}
                                                        </Badge>
                                                    </Flex>
                                                    <Heading level={4} style={{ marginLeft: '10px', lineHeight: '40px' }}>
                                                        <Link key={post.id} href={`/posts/${post.id}`}>{post.title}</Link>
                                                    </Heading>
                                                </Flex>
                                            </Flex>
                                        </Card>
                                    ))
                                }
                            </Flex>
                        </View>
                    </>
                )}
            </Authenticator>
        </>
    )
}

export default Home
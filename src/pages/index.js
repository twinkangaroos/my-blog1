import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react';
import Link from 'next/link';
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Post } from '../models';
import { Inter } from 'next/font/google'
import { View, Flex, useTheme } from '@aws-amplify/ui-react';
const inter = Inter({ subsets: ['latin'] });
import Header from "./Header"
import { useAuthenticator } from '@aws-amplify/ui-react';

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
            sort:(s) => s.createdAt(SortDirection.DESCENDING),
        })
        setPosts(postData);
        }
        // real time functionality
        DataStore.observe(Post).subscribe(()  => {
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
            <View
                    backgroundColor={tokens.colors.background.secondary}
                    padding={tokens.space.medium}
            >
                <Flex>
                    <h2>記事一覧</h2>
                </Flex>
                <Flex direction="column">
                {
                    posts.map(post => (
                        <Flex direction="column" key={post.id}>
                            <Flex><Link key={post.id} href={`/posts/${post.id}`}>{post.title}</Link></Flex>
                            <Flex style={{ color: 'gray', fontSize: '12px' }}>{extractDateAndTimeChars(post.updatedAt)}</Flex>
                        </Flex>
                        ))
                }
                </Flex>
            </View>
        </>
    )
}

export default Home
import { withSSRContext } from 'aws-amplify';
import { Post } from '../../models';
import { useRouter } from 'next/router';
import Markdown from 'react-markdown';

export default function PostComponent({ post }) {
    const router = useRouter()
    const markdown = '# Hello, this is a Markdown text';
    const htmlString = "<h2>このエリアはh2で囲まれています</h2>"
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <Markdown>{markdown}</Markdown>
            <Markdown>{post.content}</Markdown>
            <div dangerouslySetInnerHTML={{ __html: htmlString }} />
        </div>
    )
}

// （URLの生成と登録する時に使う）
//export async function getStaticPaths(req) {
//    const { DataStore } = withSSRContext(req);
//    const posts = await DataStore.query(Post);
//    const paths = posts.map(post => ({ params: { id: post.id } }));
//    // { params: { id: post.id }}
//    return {
//        paths,
//        fallback: true,
//    }
//}

// 静的サイト生成（データを取り込む時に使う）
//export async function getStaticProps(req) {
//    const { DataStore } = withSSRContext(req);
//    const { params } = req;
//    const { id } = params;
//    const post = await DataStore.query(Post, id)
//    return {
//        props: {
//            post: JSON.parse(JSON.stringify(post))
//        },
//        revalidate: 100
//    }
//}
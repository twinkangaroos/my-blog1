import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react';
import Link from 'next/link';
import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../models';
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });
import Header from "./Header"

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
    async function fetchPosts() {
      const postData = await DataStore.query(Post);
      setPosts(postData);
    }
    DataStore.observe(Post).subscribe(()  => {
      fetchPosts();
    });
  }, [])
  return (
    <>
      <Header />
      <h2>お知らせ一覧</h2>
      {
        posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
        ))
      }
    </>
  )
}

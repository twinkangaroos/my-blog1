import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react';
import Link from 'next/link';
import { DataStore } from '@aws-amplify/datastore';
import { Post } from '../models';

import Image from 'next/image'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

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
    <div className={styles.container}>
      <h1>投稿リスト</h1>
      {
        posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
        ))
      }
    </div>
  )
}

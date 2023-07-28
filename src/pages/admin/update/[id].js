import { useRouter } from 'next/router'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore';
import { Post } from '../../../models';
import { useState, useEffect } from 'react';

const PostDetail = () => {
    const [post, setPost] = useState([])

    // パスパラメータからidを取得
    const router = useRouter()
    const param_id = router.query.id
    console.log(param_id)



    return (
        <>
            aaa
        </>
    )
}

export default PostDetail
import React from 'react';
import { Heading, Flex, Link, Button } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router'

const Header = () => {
    const { route, user, signOut } = useAuthenticator((context) => [
        context.route,
        context.user,
        context.signOut,
    ])

    const router = useRouter()

    // ログイン画面に遷移
    const gotoLogin = () => {
        router.push(`/login`)
    }

    // 現在のURLを取得
    const currentURL = router.asPath;
    
    return (
    <>
        <Flex direction="row" gap="1rem">
            <Heading level={5}><Link href="/">Twin kangaroos</Link></Heading>
            {/* ログイン済みの場合 */}
            {route === 'authenticated' && (
                <Flex alignItems="baseline">
                    <Flex style={{fontSize: '12px'}}>{user.attributes.nickname} がログイン中...</Flex> 
                    <Button variation="link" onClick={signOut} size="small" style={{fontSize: '12px'}}>
                        ログアウト
                    </Button>
                </Flex>
            )}
            {/* ログイン画面でない場合 */}
            {route !== 'authenticated' && currentURL !== '/login' && (
                <Button
                    variation="link"
                    onClick={() => gotoLogin()}
                    size="small"
                >
                    ログイン
                </Button>
            )}
      </Flex>
    </>
  );
}

export default Header;

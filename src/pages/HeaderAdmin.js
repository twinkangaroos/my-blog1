import React from 'react';
import { Heading, Flex, Link, Button } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const HeaderAdmin = () => {
  const { route, user, signOut } = useAuthenticator((context) => [
    context.route,
    context.user,
    context.signOut,
  ])

  return (
    <>
      <Flex direction="row" gap="1rem" alignItems="center">
        <Heading level={5}><Link href="/">Twin kangaroos</Link></Heading>
        {
          route === 'authenticated' ?
          <Flex alignItems="baseline">
              <Flex style={{fontSize: '12px'}}>ようこそ、{user.attributes.nickname} さん！</Flex> 
              <Button variation="default" onClick={signOut} size="small" style={{fontSize: '12px'}}>
                  ログアウト
              </Button>
          </Flex>
          :
          ''
        }
      </Flex>
    </>
  );
}

export default HeaderAdmin;

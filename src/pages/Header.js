import React from 'react';
import { Heading, Flex, Link, Button } from '@aws-amplify/ui-react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Header = () => {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ])

  return (
    <>
      <Flex direction="row" gap="1rem">
        <Heading level={5}><Link href="/">Twin kangaroos</Link></Heading>
      </Flex>
    </>
  );
}

export default Header;

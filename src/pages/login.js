import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import Header from "./Header"
import { useRouter } from 'next/router'
import { Loader } from '@aws-amplify/ui-react';

const Login = () => {

    const { user, route } = useAuthenticator((context) => [
        context.user,
        context.route,
    ]);

    // ルーターを使用してログイン済みならトップにリダイレクト
    const router = useRouter()
    if (route === 'authenticated') {
        router.push(`/`)
    }

    return (
        <>
            <Header />
            <Authenticator hideSignUp={true} signUpAttributes={['email', 'nickname']}>
            {({ signOut, user }) => ( 
                <>
                    <Loader />
                </>
            )}
            </Authenticator>
        </>
    )
}
export default Login

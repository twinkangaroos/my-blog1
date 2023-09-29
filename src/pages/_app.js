import '@/styles/globals.css'
import '@aws-amplify/ui-react/styles.css';

import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure({...awsconfig, ssr: true});

import { I18n } from 'aws-amplify'
import { Authenticator, translations } from '@aws-amplify/ui-react';

// 独自CSS
import '../css/stylesheet.css'; 

// https://ui.docs.amplify.aws/react/connected-components/authenticator/customization#internationalization-i18n
I18n.putVocabularies(translations);
I18n.setLanguage('ja');

// https://github.com/aws-amplify/amplify-ui/blob/main/packages/ui/src/i18n/dictionaries/authenticator/en.ts
I18n.putVocabularies({
  ja: {
    'Sign in': 'ログインする',
    'Sign In': 'ログイン',
    'Sign Up': '会員登録する',
    'Create Account': '会員登録',
    'Email': 'メールアドレス',
    'Enter your Email': 'メールアドレスを入力してください',
    'Enter your Password': 'パスワードを入力してください',
    'Password': 'パスワード',
    'Please confirm your Password': '確認用パスワードを入力してください',
    'Nickname': 'ニックネーム',
    'Enter your Nickname': 'ニックネームを入力してください',
    'Phone Number': '電話番号',
    'Enter your Birthdate': '生年月日を入力してください',
    'Profile': 'プロフィール',
    'Add your Profile': 'プロフィールを追加してください',
    'Birthdate': '生年月日',
    'Your passwords must match': 'パスワードを合致させてください',
    //'Enter Information:': '確認コードの入力:',
    'Invalid verification code provided, please try again.': '確認コードに誤りがあるため、再度お試しください'
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Authenticator.Provider>
      <Component {...pageProps} />
    </Authenticator.Provider>
  )
}

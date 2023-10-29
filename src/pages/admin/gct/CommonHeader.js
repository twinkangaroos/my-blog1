import { Image } from '@aws-amplify/ui-react';

const CommonHeader = () => {
    return (
        <>
            <header id="header">
                <div className="wrapper">
                    <p className="header-logos">
                        <img src="/gc-t.jp/wp-content/themes/gctrenew2017/images/header.png" alt="" id="img_header_logo" />
                    </p>
                </div>

                <label className="hamburger hamburger--squeeze js-hamburger" htmlFor="hamburger-check">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </label>
                <div id="searchbox" className="sp-hidden">
                    <form role="search" method="get" id="searchform" className="searchform" action="https://gc-t.jp/">
                        <input type="text" defaultValue="" name="s" id="s" placeholder="サイト内検索" />
                        <input type="submit" id="searchsubmit" defaultValue="検索" />
                    </form>
                </div>

                <div id="header-menu-box">
                    <nav id="toc">
                        <h1>MENU</h1>
                        <div id="navi-wrapper">
                            <div id="searchbox" className="sp-only">
                                <form role="search" method="get" id="searchform" className="searchform" action="https://gc-t.jp/">
                                    <input defaultValue="" name="s" id="s" placeholder="サイト内検索" type="text" />
                                    <input id="searchsubmit" defaultValue="検索" type="submit" />
                                </form>
                            </div>
                            <div>
                                <ul id="navi">
                                    <li>
                                        <span className="navi-toggle">TOEFL&reg;<br className="sp-none" />の概要</span>
                                        <ul className="navi-sub">
                                            <li><span className="navi-toggle sp-only">TOEFL&reg;について</span>
                                                <ul className="navi-sub2">
                                                    <li><a href="https://gc-t.jp/about_test/toefl/" className="navi-link">TOEFL&reg;について</a></li>
                                                    <li><a href="https://gc-t.jp/about_test/introduction_video/" className="navi-link">TOEFL&reg;紹介動画</a></li>
                                                    <li><a href="https://gc-t.jp/about_test/special_interview/" className="navi-link">ETSスペシャルインタビュー</a></li>
                                                    <li><a href="https://gc-t.jp/group/reports_for_educators/" className="navi-link">教育関係者向けレポート</a></li>
                                                </ul>
                                            </li>

                                            <li><span className="navi-toggle">TOEFL Primary&reg;</span>
                                                <ul className="navi-sub2">
                                                    <li><a href="https://gc-t.jp/about_test/primary/" className="navi-link">TOEFL
                                                            Primary&reg; Step 1・Step 2 とは</a></li>
                                                    <li><a href="https://gc-t.jp/about_test/primary_test/"
                                                            className="navi-link sp-indent">テスト内容</a></li>
                                                    <li><a href="https://gc-t.jp/about_test/primary_sample/"
                                                            className="navi-link sp-indent">サンプルテスト</a></li>
                                                    <li><a href="https://gc-t.jp/about_test/primary_result/"
                                                            className="navi-link sp-indent">テスト結果</a></li>
                                                    
                                                    <li><a href="https://gc-t.jp/about_test/primary_voice/"
                                                            className="navi-link sp-indent">ユーザーの声</a></li><br className="sp-none" />
                                                    <li className="exceptional speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/primary_speaking_description/"
                                                            className="navi-link">TOEFL Primary&reg; Speakingとは</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/primary_speaking_test/"
                                                            className="navi-link sp-indent">テスト内容</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/primary_speaking_sample/"
                                                            className="navi-link sp-indent">サンプル（動画・音声）</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/primary_speaking_rubric/"
                                                            className="navi-link sp-indent">Rubric（評価基準）・スコアレベル</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/primary_speaking_result/"
                                                            className="navi-link sp-indent">テスト結果</a></li>
                                                </ul>
                                            </li>
                                            <li><span className="navi-toggle">TOEFL Junior&reg;</span>
                                                <ul className="navi-sub2">
                                                    <li><a href="https://gc-t.jp/about_test/junior/" className="navi-link">TOEFL
                                                            Junior&reg; Standardとは</a></li>
                                                    <li><a href="https://gc-t.jp/about_test/junior_test/"
                                                            className="navi-link sp-indent">テスト内容</a></li>
                                                    <li><a href="https://gc-t.jp/about_test/junior_sample/"
                                                            className="navi-link sp-indent">サンプルテスト</a></li>
                                                    <li><a href="https://gc-t.jp/about_test/junior_result/"
                                                            className="navi-link sp-indent">テスト結果</a></li>
                                                    
                                                    <li><a href="https://gc-t.jp/about_test/junior_voice/"
                                                            className="navi-link sp-indent">ユーザーの声</a></li><br className="sp-none" />
                                                    <li className="exceptional speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/junior_speaking_description/"
                                                            className="navi-link">TOEFL Junior&reg; Speakingとは</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/junior_speaking_test/"
                                                            className="navi-link sp-indent">テスト内容</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/junior_speaking_sample/"
                                                            className="navi-link sp-indent">サンプル（画像・音声）</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/junior_speaking_rubric/"
                                                            className="navi-link sp-indent">Rubric（評価基準）・スコア</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/about_test/junior_speaking_result/"
                                                            className="navi-link sp-indent">テスト結果</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="navi-toggle">受験者<br className="sp-none" />の方へ</span>
                                        <ul className="navi-sub">
                                            <li>
                                                <span className="navi-toggle">個人で受験される方</span>
                                                <ul className="navi-sub2">
                                                    <li className="speaking_blue"><a href="https://gc-t.jp/test/personal/"
                                                            className="navi-link">個人で受験される方（Listening &amp; Reading）</a></li>
                                                    <li className="speaking_blue"><a href="https://gc-t.jp/test/personal_speaking/"
                                                            className="navi-link">個人で受験される方（Speaking）</a></li>
                                                    <br className="sp-none" />
                                                    <li className="exceptional"><a href="https://gc-t.jp/test/primary_list/"
                                                            className="navi-link">TOEFL Primary&reg; Step 1・Step 2 テスト日程とお申し込み</a>
                                                    </li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/test/primary_speaking_list/"
                                                            className="navi-link">TOEFL Primary&reg; Speaking テスト日程とお申し込み</a></li>
                                                    <br className="sp-none" />
                                                    <li className="exceptional"><a href="https://gc-t.jp/test/junior_list/"
                                                            className="navi-link">TOEFL Junior&reg; Standardテスト日程とお申し込み</a></li>
                                                    <li className="speaking_blue"><a
                                                            href="https://gc-t.jp/test/junior_speaking_list/"
                                                            className="navi-link">TOEFL Junior&reg; Speaking テスト日程とお申し込み</a></li>
                                                    <br className="sp-none" />
                                                </ul>
                                            </li>
                                            <li><span className="navi-toggle">団体で受験される方</span>
                                                <ul className="navi-sub2">
                                                    <li><a href="https://gc-t.jp/test/group/"
                                                            className="navi-link">団体で受験される方（Listening &amp; Reading）</a></li>
                                                    <li className="speaking_blue"><a href="https://gc-t.jp/test/speaking_group/"
                                                            className="navi-link">団体で受験される方（Speaking）</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="navi-toggle">学習<br className="sp-none" />サポート</span>
                                        <ul className="navi-sub">
                                            <li><a href="https://gc-t.jp/support/materials/" className="navi-link">問題集</a></li>
                                            <li><a href="https://gc-t.jp/support/online_learning/" className="navi-link">オンライン学習</a></li>
                                            <li><a href="https://gc-t.jp/support/lexile/" className="navi-link">Lexile&reg;指数</a></li>
                                            <li><a href="https://gc-t.jp/support/high-scores/" className="navi-link">ハイスコア受験者情報</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="navi-toggle">入試活用<br className="sp-none" />海外情報</span>
                                        <ul className="navi-sub">
                                            <li><a href="https://gc-t.jp/use_score/utilization_of_score/"
                                                    className="navi-link">スコアの活用</a></li>
                                            <li><a href="https://gc-t.jp/world/over_sea/" className="navi-link">世界での広がり</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="navi-toggle">学校・団体<br className="sp-none" />の方へ</span>
                                        <ul className="navi-sub">
                                            <li><a href="https://gc-t.jp/group/introduction/" className="navi-link">導入のメリット</a></li>
                                            <li><a href="https://gc-t.jp/group/administered/"
                                                    className="navi-link">団体実施について（Listening &amp; Reading）</a></li>
                                            <li><a href="https://gc-t.jp/group/cbt_administered/"
                                                    className="navi-link">団体実施について（Listening &amp; Reading CBT）</a></li>
                                            <li><a href="https://gc-t.jp/group/speaking_administered/"
                                                    className="navi-link">団体実施について（Speaking）</a></li>
                                            <li><a href="https://gc-t.jp/group/reports_for_educators/"
                                                    className="navi-link">教育関係者向けレポート</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span className="navi-toggle oneline">活用事例</span>
                                        <ul className="navi-sub">
                                            <li><a href="https://gc-t.jp/group/case_example/" className="navi-link">活用事例</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div id="misc-wrapper">
                            <div>
                                <div id="misc">
                                    <ul>
                                        <li className="sp-hidden"><a href="javasscript:void(0);" className="search"
                                                id="lnk_searchbox_toggle"><Image
                                                src="/gc-t.jp/wp-content/themes/gctrenew2017/images/icon/search.png" /></a>
                                        </li>
                                        <li className="sp-only"><a href="https://gc-t.jp/news/" className="navi-link">ニュース</a></li>
                                        <li><a href="https://gc-t.jp/inquiry/" className="navi-link">お問い合わせ</a></li>
                                        <li className="sp-only"><a href="https://gc-t.jp/company/" className="navi-link">会社情報</a></li>
                                        <li><a href="https://gc-t.jp/faq/" className="navi-link">よくある質問</a></li>
                                        <li className="sp-hidden"><a href="https://gc-t.jp/news/" className="navi-link">ニュース</a></li>
                                        <li><a href="https://gc-t.jp/en/" className="navi-link">English</a></li>
                                        <li className="sp-only"><a href="https://gc-t.jp/privacy/" className="navi-link">プライバシーポリシー</a></li>
                                        <li className="sp-only"><a href="https://gc-t.jp/policy/" className="navi-link">サイトポリシー</a></li>
                                    </ul>
                                    <div className="login-link"><a href="https://gc-t.jp/member/" className="navi-link">ログイン</a></div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <div id="main-image">
                <div id="breadcrumbs-wrapper">
                    <div className="wrapper">
                        <ul id="breadcrumbs">
                            <li><a href="https://gc-t.jp/">HOME</a></li>
                            <li><a href="https://gc-t.jp/news/category/case">導入事例</a></li>
                            <li>「英語学習ミニセミナー＆オンライン座談会」実施レポート</li>
                        </ul>
                    </div>
                </div>
                <Image src="/gc-t.jp/wp-content/uploads/2017/09/news_main-1.jpg" />
            </div>
        </>
    )
}

export default CommonHeader
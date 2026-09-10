/**
 * サイト全体で使う定数。UI 文言ではないので i18n JSON には置かない。
 */
export const site = {
  name: 'tzug',

  /**
   * 全面に敷く背景写真。public/ 配下は「サイトのルート直下」に出るので、
   * ここに書くのはファイル名だけ（'background.jpg'）。
   * 'public/...' や '../public/...' と書くと存在しない URL になる。
   * null なら --bg-dark 一色。ぼかし・彩度・オーバーレイの強さは
   * src/styles/tokens.css の --bg-* で調整する。
   */
  backgroundImage: 'background.jpg',

  /** フッターの外部リンク */
  github: 'https://github.com/tzug1729',
  qiita: 'https://qiita.com/tzug1729',

  /**
   * メールアドレス。HTML には連結済みの文字列を書かず、
   * ユーザー名とドメインを別要素に分けて CSS で "@" を挿し込む。
   */
  mail: {
    school: { user: 'rh24098s', domain: 'st.omu.ac.jp' },
    personal: { user: 'hrenju.works', domain: 'gmail.com' },
  },
} as const;

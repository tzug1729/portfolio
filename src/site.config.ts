/**
 * サイト全体で使う定数。UI 文言ではないので i18n JSON には置かない。
 */
export const site = {
  name: 'tzug',

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

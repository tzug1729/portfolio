import sys
import time
import pandas as pd
import numpy as np
import random as r
%reset - f
# カンマ区切りの「文字列」でデータが与えられているものとします。
# ======初期設定======
# ===ガチャ関数===
def gacha(times):
  assert times > 0
  global gem, cycle, total_score, count  # グローバル変数であることを宣言
  if times > gem // cost:
    print("まぁ！ジェムが足りませんでしたので最大回数回させていただきますわ！")
    times = gem // cost
  c = r.choices(item_names, weights=item_p, k=times)
  for i in range(len(item_names)):
    item_counts[i] = c.count(item_names[i])
  print(f"|====={times}連の結果====|")  # レア度順に色付けは出力時にスペースをとるのでまだやらない
  for i in range(len(item_names)):
    if item_counts[i] == 0:
      pass
    else:
      print(f" {item_names[i]} ... {item_counts[i]}個")
  gem -= cost * times
  cycle += 1
  total_score += item_counts
  count += times
# ===最終結果関数===
def result():  # 引数なしもできる
  print(f"\n|===最終結果===|{RESET}")
  print(f" ガチャを回した回数 : {count}連")
  print(f" 消費ジェム : {gem_original - gem}ジェム")
  print(f" 残りのジェム : {gem}ジェム\n")
  print("==獲得アイテム==")
  result_df = pd.DataFrame({  # dfの作成　Numpy配列はただのデータの塊だからmergeできない
      'item_name': item_names,  # 列の作成
      'item_p': item_p,
      'total_score': total_score
  })
  # 獲得数が0のものは除外し、レアリティ(item_pの昇順)でソートし、その後に獲得数(total_scoreの昇順)でソート
  result_df = result_df[result_df['total_score'] > 0].sort_values(
      by=['item_p', 'total_score'], ascending=[True, True])
  for index, row in result_df.iterrows():
    if row['item_p'] == 20:
      print(CYAN)
      print(" ★★")
    elif row['item_p'] == 10:
      print(GREEN)
      print(" ★★★")
    elif row['item_p'] <= 5 and row['item_p'] > 2:
      print(YELLOW)
      print(" ★★★★")
    elif row['item_p'] == 2:
      print(RED)
      print(" ★★★★★")
    elif row['item_p'] == 1:
      print(RED)
      print(" ★★★★★★★")
    else:
      print(" ★", sep=" ")
    print(f" {row['item_name']} ... {row['total_score']}個{DEFAULT}{RESET}")
  print("\nまたお会いしましょう！")
# ===定数・変数===
BLACK = '\033[30m'
RED = '\033[31m'
GREEN = '\033[32m'
YELLOW = '\033[33m'
BLUE = '\033[34m'
MAGENTA = '\033[35m'
CYAN = '\033[36m'
DEFAULT = '\033[39m'
BOLD = '\033[1m'
LINE = '\033[4m'
BG_BLACK = '\033[40m'
BG_WHITE = '\033[47m'
RESET = '\033[0m'

gem = 100000  # @param {type:"slider", min:0, max:100000, step:10}
gem_original = gem
cost = 20  # @param {type:"slider", min:20, max:5000, step:20}
times = 0
cycle = 1  # 何セット回しているか
count = 0
yn = "y"

# ======処理======
if gem // cost > 0:
  # DQ10 お出かけ超便利ツール冒険者の広場アプリから
  times = int(input(
      f"冒険者の広場へようこそ！何回ガチャを回しますか？\n 1回 : {cost}ジェム \n 所持 : {gem}ジェム \n 最大 : {gem // cost}連 \n"))
elif gem // cost == 0:
  print("ジェムが足りませんわ！")

if times == 0 and gem >= cost:
  print("トルネコ「ははーん　さては　おきゃくさーん　わたしとはなしたいのですか？」")
elif times < 0:
  print("トルネコ「おや　おきゃくさん！　もしかして　「ロトのつるぎ」をさがしに　きましたか？」")
  time.sleep(1)
  print("トルネコ？「ざんねんながら　ヒルタンろうじんが　もっていってしまいましたよ」")
  time.sleep(2)
  print("トルネコ...？「あはは　あのかたには　あたまがあがらなくって　ただであげちゃいました！」")
  time.sleep(3)
  print("？？？「あれ　おきゃ縺上＆繝ｼん　どうし縺んですか　そんな　縺代￡繧薙↑かおを　して」")
  time.sleep(3)
  print("縺ｨ繧九?縺「このみ縺壹〒繧のんで　あ縺溘∪繧さま縺励※くだ縺いね」")
  time.sleep(5)
  for i in range(100):
    print(f"{RED}おきのどくですが\nぼうけんのしょ{i + 1}ばんは\nきえてしまいました{DEFAULT}")
  time.sleep(2)
  print(f"\n{RED}おきのどくですが\nすべてが\nきえてしまいました{DEFAULT}")
  sys.exit()

# ===リスト変換===
# ▼▼▼ ここから(変更不可) ▼▼▼
item_names_str = 'ひのきのぼう,こんぼう,どうのつるぎ,せいなるナイフ,くさりがま,とげのむち,まどうしのつえ,てつのやり,どくばり,てつのつめ,はがねのつるぎ,てつのオノ,あまぐものつえ,いかづちのつえ,さざなみのつえ,さばきのつえ,おおばさみ,ゆうわくのけん,りりょくのつえ,おおかなづち,はやぶさのけん,ゾンビキラー,ドラゴンキラー,くさなぎのけん,ガイアのつるぎ,ふぶきのつるぎ,いなづまのけん,まじんのオノ,らいじんのけん,もろはのつるぎ,はかいのつるぎ,おうごんのつめ,おうじゃのけん'
item_p_str = '50,50,50,40,40,35,30,30,25,20,20,20,10,10,10,10,10,10,10,10,5,5,5,4,3,3,2,2,2,2,2,2,1'
# ▲▲▲ ここまで(変更不可)▲▲▲
item_names = np.array(item_names_str.split(","))
item_p = np.array(list(map(int, item_p_str.split(","))))

total_score = np.array([0] * len(item_names))
item_counts = np.array([0] * len(item_names))  # 0埋め
# ===何度もガチャを回す===
while yn[0] == ("y" or yn[0] == "Y" or yn[0] == "ｙ" or yn[0] == "Y" or yn[0] == "う") and gem >= cost and times > 0:
  if cycle == 1:
    gacha(times)
  else:
    yn = input("もう一度回しますか？ y/n : ")
    if yn[0] == "y" or yn[0] == "Y" or yn[0] == "ｙ" or yn[0] == "Y" or yn[0] == "う":
      times = int(input(
          f"何回ガチャを回しますか？\n 1回 : {cost}ジェム \n 所持 : {gem}ジェム \n 最大 : {gem // cost}連 \n"))
      if times > 0:
        gacha(times)
      else:
        print("トルネコ「あはは　おきゃくさーん　じょうだんは　よしてくださいよぉ」")
    else:
      result()
      yn = "n"  # whileから抜け出すために

if gem < cost and cycle > 1:
  result()

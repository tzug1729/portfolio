# 演習6
# 感情レベルに応じたキャンディジェネレーター(高いほど美味しそうなやつができる)
import ColabTurtle.Turtle as t  # asの後ろが略称
from datetime import date
import math
import random
import time
%reset - f

# ====定数変数====
RED = '\033[31m'
GREEN = '\033[32m'
YELLOW = '\033[33m'
CYAN = '\033[36m'
RESET = '\033[0m'
ALL = '\033[0m'
BOLD = '\033[1m'
BG_RED = '\033[41m'

EMO = "感情レベル"
LMAX = 0.5 + 100  # 四捨五入の関係で+0.5
QUESTION = f"ズバリ，あなたの今の{EMO}は!?(0～{int(LMAX)}) : "
WIN = 400

msg1 = "こんなもので遊んでる場合じゃないね"
msg2 = "こんなもので遊ぶより幸せなことがあるはずだよ"
count = 0
times = 0
emotion = 0
y = False
n = False
happy = False

# =====input=====

level = 0  # @param{type:"slider",max:100}
if level >= LMAX // 2:
  yn = input(f"{EMO}:{level},あなたは今アゲアゲですね！？ y/n : ")
elif level < LMAX // 2:
  yn = input(f"{EMO}:{level},あなたは今しょんぼりですね？ y/n : ")

if yn[0] == "y" or yn[0] == "ｙ" or yn[0] == "い" or yn[0] == "う":  # yupとかyeahとかに対応
  y = True
elif yn[0] == "n" or yn[0] == "ｎ" or yn[0] == "の":  # noとかnopeとかに対応
  n = True
else:
  print(f"{RED}ふざけてるの？{EMO}:測定不能{RESET}")
# =====nだったら聞き返す=====
if n == True:
  level = float(input(QUESTION))
while level < 0 or level >= LMAX:
  if (count < 3 or count > 3) and count < 7:
    if level < 0 and count < 3:
      print(RED + msg1)
      msg1 = "こんなもので遊んでる場合じゃないね"
    elif level < 0 and count > 3:
      print(RED + msg1)
      if msg1 == msg2:
        msg2 == "ボクと遊ぶより幸せなことがあるはずだよ"
      msg1 = "ボクと遊んでる場合じゃないよね"
    elif level > LMAX and count < 3:
      print(YELLOW + msg2)
      msg2 = "こんなもので遊ぶより幸せなことがあるはずだよ"
    elif level > LMAX and count > 3:
      print(RED + msg2)
      if msg2 == msg1:
        msg1 = "ボクと遊んでる場合じゃないよね"
      msg2 = "ボクと遊ぶより幸せなことがあるはずだよ"
    count += 1
    level = float(input(RESET + QUESTION))
  elif count == 3:
    msg1 = "なに？ボクであそんでるの？"
    msg2 = msg1
    count += 1
  elif count >= 7 and count <= 10:
    msg1 = f"0～{int(LMAX)}って言ってるでしょ？"
    msg2 = msg1
    print(RED + msg1)
    level = float(input(f"{RESET}{QUESTION}"))
    time.sleep(1)  # 1秒間待機
    count += 1
  elif count > 10 and count < 15:
    msg1 = "..."
    msg2 = msg1
    print(RED + msg1)
    level = float(input(RESET))
    time.sleep(count - 10)
    count += 1
  elif count == 15:
    level = -999999999999999999999999
    # 9が25個
    print(f"{RED}{str(level)}")
    time.sleep(3)
    print(f"{RED}縺ゅ↑縺溘�諢滓ュ繝ｬ繝吶Ν縺ｯ繝ｼ�呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ呻ｼ吶〒縺吶°��")
    q = input("y/n : ")
    if q[0] != "y" and q[0] != "n" and q[0] != "ｙ" and q[0] != "ｎ":
      print("ホンットに救いようがないね！！！")
    time.sleep(1)
    for i in range(50):
      print("HA" * 70)
    break

if level >= 0 and level <= LMAX:
  if level + 0.5 >= int(level + 1):  # 四捨五入
    level = int(level + 1)
  else:
    level = int(level)  # floatにしたら小ネタ挟めるのでfloatでやってた

  if count == 0 and (y == True or n == True):  # &で書くとyn=kの時とかにunsupportedと出る
    print(f"{EMO}:{level}")
  elif count > 0 and count < 15:
    print(f"{RED}{count}回，か．{RESET}{EMO}:{level}")
  elif count == 15:
    print(f"{RED}ちぇっ，にげられた．しっぱいだ．{RESET}")
else:
  print(f"繧ｨ繝ｩ繝ｼ�∫ｷ頑･莠区�逋ｺ逕滂ｼ∵─諠�Ξ繝吶Ν貂ｬ螳壻ｸ崎��∫峩縺｡縺ｫ髮｢繧後ｈ��-1!!!!!!!!{RESET}")
LMAX = int(LMAX)

if level < 0:
  emotion = -1
elif level >= 0 and level < LMAX // 2:
  emotion = 0
elif level >= LMAX // 2 and level <= LMAX:
  emotion = 1
# 祝日
TODAY = "2025-06-05"  # @param {type:"date"}
CELEBRATE = "2008-06-02"  # @param {type:"date"}
today = date.fromisoformat(TODAY)  # dateオブジェクトに変換して計算を容易に
celebrate = date.fromisoformat(CELEBRATE)

year_diff = today.year - celebrate.year  # 年の差を計算
if today == celebrate:
  if emotion == -1:
    print(f"{RED}今日はナンともないただの一日だよ{RESET}")
  elif emotion != -1:
    print(f"良いことがありましたか？！GOOD！")
    emotion = 1
    happy = True
if today.month == celebrate.month and today.day == celebrate.day:
  if year_diff > 0:
    if emotion == -1:
      print(f"{RED}祝うべき日に何してんの？{RESET}")
    elif emotion != -1:
      print(f"{YELLOW}{year_diff}周年{RESET}を迎えていますね！おめでとうございます！歓喜！")
      if emotion == 0:
        print("今日でパーッといっちゃいましょう！")
      emotion = 1
      happy = True
  elif year_diff < 0 and emotion != -1:
    print(f"{-1 * year_diff}年後が楽しみですね！")
    emotion = 1
# ====国民の祝日====
if emotion != -1:
  if today.month == 1 and today.day == 1:
    print(f"今日は{YELLOW}元日{RESET}ですね！HAPPY NEW YEAR！")
    emotion = 1
    happy = True
  elif today.month == 1 and today.day == 1:
    print(f"今日は{YELLOW}建国記念の日{RESET}ですね！")
    emotion = 1
    happy = True
  elif today.month == 4 and today.day == 29:
    print(f"今日は{YELLOW}昭和の日{RESET}ですね！")
    emotion = 1
    happy = True
  elif today.month == 5 and today.day == 3:
    print(f"今日は{YELLOW}憲法記念日{RESET}ですね！")
    emotion = 1
    happy = True
  elif today.month == 5 and today.day == 4:
    print(f"今日は{YELLOW}みどりの日{RESET}ですね！他の色の日はないのかな？")
    emotion = 1
    happy = True
  elif today.month == 5 and today.day == 5:
    print(f"今日は{YELLOW}子どもの日{RESET}ですね！")
    emotion = 1
    happy = True
  elif today.month == 8 and today.day == 11:
    print(f"今日は{YELLOW}山の日{RESET}ですね！この日は2016年から追加されたらしいですよ，休日が増えてシアワセ！")
    emotion = 1
    happy = True
  elif today.month == 11 and today.day == 3:
    print(f"今日は{YELLOW}文化の日{RESET}ですね！文化の日ってジツは明治天皇の誕生日ってこと，知ってました？")
    emotion = 1
    happy = True
  elif today.month == 11 and today.day == 23:
    print(f"今日は{YELLOW}勤労感謝の日{RESET}ですね！いつもご苦労様です")
    emotion = 1
    happy = True

if happy == True:
  level += 50 - count * 5

# 運試し四字熟語
if emotion != -1:
  x1 = random.choice(['古', '一', '森', '完', '大', '百', '百', '七'])
  x2 = random.choice(['今', '切', '羅', '全', '器', '発', '花', '七'])
  x3 = random.choice(['東', '合', '万', '無', '万', '百', '繚', '七'])
  x4 = random.choice(['西', '切', '象', '欠', '成', '中', '乱', '七'])
  # x1,x2,x3,x4 = ("七","七","七","七") #検証時これで試す
  word = x1 + " " + x2 + " " + x3 + " " + x4

  if x1 == x2 == x3 == x4:
    for i in range(50):
      print(f"{RED}{word * 20}{RESET}")
    emotion = -1
  # 古今東西
  elif x1 == "古" and x2 == "今" and x3 == "東" and x4 == "西":
    print("カウンセリング　やーれやれ", end=" ")
    print(f"{word} ピースピース")  # YOASOBI UNDEAD
  # 一切合切
  elif x1 == "一" and x2 == "切" and x3 == "合" and x4 == "切":
    print(f"{RED}{word}凡庸な あなたじゃわからない　かもね！{RESET}")  # Ado うっせえわ
  # 森羅万象
  elif x1 == "森" and x2 == "羅" and x3 == "万" and x4 == "象":
    print(f"{word} ピースピース！")  # YOASOBI UNDEAD
  # 完全無欠
  elif x1 == "完" and x2 == "全" and x3 == "無" and x4 == "欠":
    print(f"{YELLOW}{word}{RESET}の大集結！")  # 妖怪ウォッチ　ゴーケツ族
  # 大器晩成
  elif x1 == "大" and x2 == "器" and x3 == "万" and x4 == "成":
    print("すぐに結果が付いて来なくとも", end=" ")
    print(f"{word}型なんだから まあ気長に頑張りなさい")  # アンジュルム　大器晩成
  # 百発百中
  elif x1 == "百" and x2 == "発" and x3 == "百" and x4 == "中":
    print(f"{CYAN}世界で一つの宝石を", end=" ")
    print(f"{word}ねらいます{RESET}")  # ピンクレディー　百発百中
  # 百花繚乱
  elif x1 == "百" and x2 == "花" and x3 == "繚" and x4 == "乱":
    print(f"{GREEN}ゆらゆらり はらはらり 色とりどり 乱れ咲き{RESET}")  # 幾田りら 百花繚乱
  # その他
  else:
    print(f"今回の四字熟語ガチャ : [{BOLD}{word}{ALL}] 残念！またチャレンジ！")  # そろうのは1/4096の確率
# [============描画============]
# ====初期設定====
# 定数変数
TIME = 10.2  # lengthの上限
INCREASE = 0.04  # lengthの上げ幅
SMOOTH = 5  # 低いほど滑らか
ORIGIN = 45
RADIUS = 12  # 円のでかさ
STICK = 75  # 持ち手の太さ

paint = 12  # 下地の太さ
length = 0
radius = RADIUS
r = 0
g = 0
b = 0
lucky = False
# 背景
t.initializeTurtle(initial_speed=13, initial_window_size=(400, 400))  # 横縦の順番
if emotion == -1:
  t.bgcolor(255, 0, 0)  # RGB指定
elif emotion == 0:
  t.bgcolor(50 + count * 7, 50, 255 - count * 10)  # countが増えるごとに色が怪しくなる
elif emotion == 1:
  t.bgcolor(255 - count * 6, 255 - count * 8, 0)
# ペンの状態
t.shape(shape='circle')
t.hideturtle()  # ペン先を非表示

# ====本体=====
# ====不吉の象徴砂嵐====
if emotion == -1:
  t.color(255, 255, 255)
  t.width(1)
  t.up()
  t.goto(0, 0)
  t.down()
  t.goto(WIN, 0)
  for i in range(WIN * 2 + 1):
    # メルセンヌツイスタよりrand関数のほうが手軽なので(セキュリティレベルにガチガチにする必要ないし)
    black = random.randrange(0, 350)
    if black > 255:
      black = 0  # 黒の当選確率を調整

    t.color(black, black, black)
    t.up()
    t.goto(0, i // 2)
    t.down()
    t.goto(WIN, i // 2)
# ====キャンディ====
 # ====スティック====
elif emotion != -1:
  t.up()
  t.goto(WIN / 2 + ORIGIN, WIN / 2 - ORIGIN)
  t.down()
  t.width(STICK)
  t.color(255, 210, 170)  # 木の色
  t.goto(WIN / 2 + ORIGIN, 350)
  # ====ハートを描く====
  t.width(2)
  if happy == True:
    t.color(255, 0, 0)
    t.up()
    t.goto(75, 300)
    t.down()
    t.face(270)
    for j in range(16):
      t.forward(8)
      t.right(15)
    t.face(270)
    t.goto(75, 370)
    t.up()
    t.goto(75, 300)
    t.down()
    for j in range(16):
      t.forward(8)
      t.left(15)
    t.goto(75, 370)
# ====くじ====
  lottery = random.randrange(-100, 200)
  if lottery <= level - 1 - count * 5:  # countが増えるごとに当選確率が下がる
    lucky = True

  if lucky == True:  # 〇
    t.up()
    t.goto(WIN / 2 + ORIGIN, WIN / 2 - ORIGIN)
    t.down()
    t.color(255, 0, 0)
    t.face(180)

    for i in range(100):
      t.left(SMOOTH)
      t.forward(1)

  elif lucky == False:  # ×
    t.up()
    t.goto(WIN / 2 + ORIGIN - 20, WIN / 2 - ORIGIN)
    t.down()
    t.color(0, 0, 255)

    t.goto(WIN / 2 + ORIGIN + 20, WIN / 2 - ORIGIN + 20)
    t.up()
    t.goto(WIN / 2 + ORIGIN + 20, WIN / 2 - ORIGIN)
    t.down()
    t.goto(WIN / 2 + ORIGIN - 20, WIN / 2 - ORIGIN + 20)

  # ====下塗り====
  t.up()
  t.goto(380, 155)
  t.down()
  t.face(270)
  for i in range(RADIUS + 2):
    if i > 1:
      t.face(270)  # 絶対角度
      t.up()
      t.goto(380 - (paint * (i - 1)), 155)
      t.down()
      radius -= 1
    for j in range(math.ceil(2 * ((380 - (paint)) - 245) * 3.15 / 13 * 1.3)):
      if r + level > 255:
        r = 0
      elif g + level > 255:
        g = 0
      elif b + level > 255:
        b = 0
      elif 200 - level * 2 - b < 0:
        b = 0
      if emotion == 0:
        t.color(
            max(0, min(200, int(r))),  # r を 0〜200 に制限
            max(0, min(200, int(g))),  # g を 0〜200 に制限
            max(0, min(200, int(b + level)))  # b + level を 0〜200 に制限
        )
        g += level
        b += 1
      elif emotion == 1:
        t.color(
            max(0, min(200, int(r + level))),  # r + level を 0〜200 に制限
            max(0, min(200, int(g))),  # g を 0〜200 に制限
            max(0, min(200, int(200 - level * 2 - b)))  # b を 0〜200 に制限
        )
        r += level - 49
        g += level // 20
        b += 1
      t.width(paint)
      t.left(SMOOTH)
      t.forward(radius)
  # ====くるくる====
  length = 0
  t.width(4)
  t.up()
  t.goto(WIN / 2 + ORIGIN, WIN / 2 - ORIGIN)
  t.down()
  t.color(255, 255, 255)
  while length < TIME:
    t.left(SMOOTH)
    t.forward(length)
    length += INCREASE

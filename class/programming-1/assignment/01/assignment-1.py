#設問5の答え
# この元問題文の解説→https://youtu.be/ogdzbe4fg64?si=IiEFNZbhESNdz2_f これでこの問題知りました

%reset -f
import math

# 方程式の係数を入力
try:
    a = int(input("a = : "))
    b = int(input("b = : "))
    c = int(input("c = : "))
except ValueError:
    print("整数を入力してください。")
    exit() # エラー時はプログラムを終了

# 係数の範囲チェック (元のコードに合わせた範囲)
if abs(a) > 1e9 or abs(b) > 1e9 or abs(c) > 1e9: #absは絶対値
    print("係数の絶対値は 10^9 以下にしてください。")
    exit()

# 方程式を見やすい形式で表示する関数の作成(defで作れる)
def format_equation(a, b, c):
    if a == 0 and b == 0 and c == 0:
        return "0 = 0"

    terms = [] #方程式の係数を格納

    # x^2 の項
    if a != 0:
        if abs(a) == 1:
            a_str = "" if a > 0 else "-" #aを空文字列にする
        else:
            a_str = str(a)
        terms.append(f"{a_str}x^2")

    # x の項
    if b != 0:
        if abs(b) == 1:
            b_str = "" if b > 0 else "-"
        else:
            b_str = str(b)

        if not terms: # a=0のときtermsがない
             terms.append(f"{b_str}x" if b > 0 else f"-{b_str}x") # 符号を適切につける
        else: # 2番目以降の項の場合
            sign = "+" if b > 0 else "-"
            terms.append(f"{sign} {b_str}x")

    # 定数項
    if c != 0:
        if not terms: # a=b=0のときtermsがない
            terms.append(str(c))
        else: #b=0のときは考えなくていい
            sign = "+" if c > 0 else "-"
            terms.append(f"{sign} {abs(c)}")

    # 全体の結合と "= 0" の追加
    return " ".join(terms) + " = 0"
    #↑これ自体がformat_equation

print(f"入力された方程式 : {format_equation(a, b, c)}")

# 共通因数を見つけて方程式を簡単にする
# 係数の絶対値の最大公約数を計算
common_divisor = math.gcd(math.gcd(abs(a), abs(b)), abs(c))

# a=b=c=0 の場合は common_divisor が 0 になるので、特別扱い
if common_divisor == 0:
     print("xはすべての整数．")
else:
    # 共通因数が1より大きい場合、方程式を簡単にする
    if common_divisor > 1:
        print(f"共通因数 : {common_divisor}")
        a //= common_divisor
        b //= common_divisor
        c //= common_divisor
        print(f"簡単にした方程式 : {format_equation(a, b, c)}")

    # === 整数解の計算 ===

    solutions = [] # 整数解を格納するリスト

    # a = 0 の場合： 1次方程式または定数方程式
    if a == 0:
        if b != 0: # bx + c = 0
            # -c が b で割り切れるかチェック
            if c % b == 0:
                x1 = -c // b
                solutions.append(x1)
        # elif c != 0: # a=0, b=0, c!=0 の場合 c = 0 は解なし (solutionsは空のまま)
        # else: # a=0, b=0, c=0 の場合 0 = 0 はすべての整数が解 (これは common_divisor == 0 で処理済み)
        pass # a=0, b=0, c!=0の場合はsolutionsが空のままになるので、後続の処理で「整数解を持たない」と表示される

    # a != 0 の場合 (2次方程式)
    else:
        discriminant = b**2 - 4 * a * c # 判別式

        if discriminant >= 0:
            sqrt_discriminant = math.sqrt(discriminant)

            # 判別式の平方根が整数に近いかチェック (浮動小数点誤差を考慮)
            # abs(sqrt_discriminant - round(sqrt_discriminant)) < 1e-9 で整数とみなす
            if abs(sqrt_discriminant - round(sqrt_discriminant)) < 1e-9:
                # 平方根が整数とみなせる場合、解の公式で解候補を計算
                sqrt_D_int = round(sqrt_discriminant)
                numerator1 = -b + sqrt_D_int
                numerator2 = -b - sqrt_D_int
                denominator = 2 * a

                # 解1の候補が整数かチェック
                if numerator1 % denominator == 0:
                    x1 = numerator1 // denominator
                    solutions.append(x1)

                # 解2の候補が整数かチェック
                # 解1と同じ場合は追加しないように注意
                if numerator2 % denominator == 0:
                     x2 = numerator2 // denominator
                     if x2 not in solutions: # 重解の場合に重複しないように
                         solutions.append(x2)


    # === 見つかった整数解の結果を表示 ===
    if solutions:
        solutions.sort() # 解を小さい順に並べる
        if len(solutions) == 1:
            print(f"求める整数解xは : {solutions[0]} である。")
        else:
            print(f"求める整数解xは : {solutions[0]} および {solutions[1]} である。")
    elif a == 0 and b == 0 and c != 0: # a=0, b=0, c!=0 の場合 (例: 5 = 0)
         print("この方程式は整数解を持たない．")
    elif a != 0 and discriminant < 0: # 2次方程式で判別式が負の場合
        print("この方程式は整数解を持たない．")
    elif a!=0 and discriminant >= 0 and abs(sqrt_discriminant - round(sqrt_discriminant)) >= 1e-9: # 2次方程式で判別式が非負だが平方根が整数でない場合
        print("この方程式は整数解を持たない．")
    elif a!=0 and discriminant >= 0 and abs(sqrt_discriminant - round(sqrt_discriminant)) < 1e-9 and not solutions: # 2次方程式で平方根は整数だが、解が割り切れない場合
         print("この方程式は整数解を持たない．")
    elif a==0 and b!=0 and not solutions: # 1次方程式で割り切れなかった場合
         print("この方程式は整数解を持たない．")
    else: # その他の解が見つからなかったケース
        print("この方程式は整数解を持たない．")
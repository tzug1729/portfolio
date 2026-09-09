# @title ↙ここを押してLet's start！
from IPython.display import display, clear_output
import ipywidgets as widgets
import IPython.display
import sys
import random as r
import numpy as np
import time

# ===色===
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

CAPACITY = 12  # 定員

# キーボードの分割定義
keyboard = [['1', 'q', 'a', 'z'], ['2', 'w', 's', 'x'], ['3', 'e', 'd', 'c'], ['4', 'r', 'f', 'v'], ['5', 't', 'g', 'b'], ['6', 'y', 'h', 'n'], [
    '7', 'u', 'j', 'm'], ['8', 'i', 'k', ','], ['9', 'o', 'l', '.'], ['0', 'p', ';', '/'], ['-', '@', ':', '\\'], ['^', '[', ']', '']]


# --- 各ゲームの関数定義 ---

def flush_cal(playHuman_name):
  total_gained_points = 0  # このラウンドで獲得する総ポイント
  second = 1.0

  for i in range(6):
    get_point = 0
    output = []
    cd = 3
    for k in range(cd + 1):
      IPython.display.clear_output(wait=True)
      if cd - k > 0:
        print(f"{cd - k}")
        time.sleep(1)
      else:
        print("GO!!")
        time.sleep(1)

    IPython.display.clear_output(wait=True)

    output_numbers = []  # このラウンドで表示される数字のリスト
    num_terms_to_display = r.randint(3, 7)

    for term_index in range(num_terms_to_display):
      max_digit = min(3 + i // 2, 5)
      random_number = r.randint(1, 10**max_digit - 1)

      if term_index > 0:
        while output_numbers[-1] == random_number:
          random_number = r.randint(1, 10**max_digit - 1)

      output_numbers.append(random_number)
      print(f"\r{random_number}", end="", flush=True)
      time.sleep(max(second, 0.06))

    print()
    actual_sum = sum(output_numbers)

    second -= 0.05 * ((i + 1)**2)
    second = max(second, 0.1)

    IPython.display.clear_output()
    time.sleep(0.5)

    user_answer = ""
    while True:
      user_answer = input("出来ましたか？答えを入力してください(空白は不要) : ").strip()
      if user_answer == "":
        print("何も入力されていません。和を整数で入力してください。")
        continue
      try:
        answer = int(user_answer)
        break
      except ValueError:
        print("無効な入力です。整数を入力してください。")

    get_point = 0
    if actual_sum != 0:
      ratio = round((answer / actual_sum) * 100)
    else:
      ratio = 0

    if answer == actual_sum:
      print("大正解！！！！！！！")
      get_point = 1000 * (i + 1)
    elif ratio >= 90 and ratio <= 110:
      print("惜しい！")
      get_point = 750 * (i + 1)
    elif ratio >= 80 and ratio <= 120:
      print("もう少し！")
      get_point = 500 * (i + 1)
    else:
      print("残念...")
      get_point = 0

    total_gained_points += get_point

    print(f"正解の和: {actual_sum}")
    print(f"あなたの答え: {answer}")
    print(f"このラウンドで獲得したスコア: {get_point}点")
    time.sleep(2)

  print(f"\nラウンド終了！合計獲得スコア: {total_gained_points}点")
  return total_gained_points

def flush_result(player_data_list):
  if not player_data_list:
    print("プレイデータがありません。")
    return

  sorted_players = sorted(
      player_data_list, key=lambda x: x['score'], reverse=True)

  if sorted_players[0]['score'] > 0:
    print("\n--- 最終結果 ---")
    print(f"優勝は {sorted_players[0]['name']} さんです！")
    print(f"スコア: {sorted_players[0]['score']}点")
    for p in sorted_players[1:]:
      if p['score'] == sorted_players[0]['score']:
        print(f"同点優勝: {p['name']} さん！")
      else:
        break
  else:
    print("\n--- 最終結果 ---")
    print("誰もスコアを獲得できませんでした。")

def eidetic(playHuman_name):
  total_gained_points = 0
  second = 1.0
  letter = ["さ", "し", "す", "せ", "そ", "ざ", "じ", "ず", "ぜ", "ぞ", "ぢ", "づ"]

  for i in range(6):
    output = []
    cd = 3
    for k in range(cd + 1):
      IPython.display.clear_output(wait=True)
      if cd - k > 0:
        print(f"{cd - k}")
        time.sleep(1)
      else:
        print("GO!!")
        time.sleep(1)

    IPython.display.clear_output(wait=True)

    num_chars_to_display_in_round = r.randint(5, len(letter))

    for _ in range(num_chars_to_display_in_round):
      IPython.display.clear_output()
      time.sleep(0.01)
      r.shuffle(letter)
      space = "　" * r.randint(0, 8)
      random_char = letter[r.randint(0, len(letter) - 1)]
      output.append(random_char)
      print(f"\r{space}{random_char}", end="", flush=True)

      time.sleep(max(second, 0.06))

    print()
    second -= 0.05 * ((i + 1)**2)
    second = max(second, 0.1)

    IPython.display.clear_output()
    time.sleep(0.5)

    answer = str(input("覚えられましたか？答えを入力してください(空白は不要) : "))

    correct_letter = 0
    min_len = min(len(answer), len(output))

    for idx in range(min_len):
      if answer[idx] == output[idx]:
        correct_letter += 1

    accuracy = 0.0
    if len(output) > 0:
      accuracy = round((correct_letter / len(output)) * 100)
    else:
      accuracy = 0

    get_point = accuracy * 10 * (i + 10)
    if correct_letter == len(output):
      print("満点ボーナス！！獲得スコア3倍！！！")
      get_point *= 3
    total_gained_points += get_point

    print(f"正答率: {accuracy:.2f}%")
    print(f"このラウンドで獲得したスコア: {get_point}点")
    time.sleep(2)

  print(f"\nラウンド終了！合計獲得スコア: {total_gained_points}点")
  return total_gained_points

def eidetic_result(player_data_list):
  if not player_data_list:
    print("プレイデータがありません。")
    return

  sorted_players = sorted(
      player_data_list, key=lambda x: x['score'], reverse=True)

  if sorted_players[0]['score'] > 0:
    print("\n--- 最終結果 ---")
    print(f"優勝は {sorted_players[0]['name']} さんです！")
    print(f"スコア: {sorted_players[0]['score']}点")
    for p in sorted_players[1:]:
      if p['score'] == sorted_players[0]['score']:
        print(f"同点優勝: {p['name']} さん！")
      else:
        break
  else:
    print("\n--- 最終結果 ---")
    print("誰もスコアを獲得できませんでした。")

# --- キーボード早押し対決 ---
def keyboard_rush(player_data_list):
  print("\n--- キーボード早押し対決を開始します！ ---")
  time.sleep(1)

  # 各プレイヤーにキーボードの割り当てを提示
  player_assignments = {}  # 押すべき文字群
  all_keys = [key for sublist in keyboard for key in sublist]
  inputs = []

  num_players = len(player_data_list)
  keys_per_player = len(all_keys) // num_players

  print("\n--- キーボード担当範囲 ---")
  for i, p_data in enumerate(player_data_list):
    start_idx = i * keys_per_player
    if i == num_players - 1:
      assigned_keys = all_keys[start_idx:]
    else:
      assigned_keys = all_keys[start_idx: start_idx + keys_per_player]

    player_assignments[p_data['name']] = assigned_keys
    print(f"{p_data['name']} さんの担当キー: {', '.join(sorted(assigned_keys))}")
  countDown = 3
  COUNTDOWN = countDown
  text = f"...{countDown}..."
  delay = 1 / len(text)  # 1文字ずつ表示する間隔（秒）

  for i in range(countDown + 1):
    text = f"...{countDown}..."
    delay = 1 / len(text)  # 1文字ずつ表示する間隔（秒）
    if i == COUNTDOWN:
      sys.stdout.write('\r' + ' ' * len(text) + ' ' * 5)
      sys.stdout.flush()
      go_text = "\nGO!\n"
      sys.stdout.write(go_text)
      sys.stdout.flush()
      time.sleep(0.5)
    else:
      for j in range(len(text) + 1):  # +1は、文字列が完全に表示された状態を作るため
        # \r で行の先頭に戻り、現在の進捗を表示
        sys.stdout.write('\r' + text[:j])
        sys.stdout.flush()  # バッファをフラッシュして即座に表示
        time.sleep(delay)
      countDown -= 1
  # ループ開始時刻を記録
  start_time = time.time()

  # 5秒間ループを回す
  while True:
      # 現在の時刻を取得
    current_time = time.time()

    # 経過時間が5秒以上かチェック
    if current_time - start_time >= 5:
      break  # 5秒以上経ったらループを抜ける

    # ここに繰り返したい処理を書く
    input_letter = input()
    if input_letter:  # input_letterが空文字列でないかチェック
      inputs.append(input_letter[0])

  # スコア計算
  for i in range(len(inputs)):
    first_char = inputs[i]

    # 入力された文字がどのプレイヤーの担当キーか判定
    for p_data in player_data_list:
      if first_char in player_assignments[p_data['name']]:
        p_data['score'] += 1
        break

  print("\n--- 現在の合計スコア ---")
  for p_data in player_data_list:
    print(f"{p_data['name']}: {p_data['score']} ポイント")

  # 続けるかどうかの確認
  while True:
    continue_game_input = input(
        "\nもう一度キーボード早打ち対決をしますか？ (y/n): ").strip().lower()

    # 入力が空文字列の場合は再入力を要求
    if not continue_game_input:
      print("何も入力されていません。'y'または'n'を入力してください。")
      continue  # ループの先頭に戻る

    # 入力があれば、最初の文字をチェックしてループを抜ける
    if continue_game_input[0] == "n":
      print("ゲームを終了します。")
    else:
      # 'n'以外の場合はゲームを続行
      # ('y'と入力された場合や、'yes'など'y'で始まる場合を含む)
      keyboard_rush(player_data_list)

    break  # ゲームを終了するか続行するかが決まったので、ループを抜ける

# === メイン処理 ===
if __name__ == "__main__":
  result = False

  while True:
    playerNumber_str = input("何人で遊びますか？ : ").strip()
    if playerNumber_str == "":
      print("何も入力されていません。人数を整数で入力してください。")
      continue

    try:
      playerNumber = int(playerNumber_str)
      if 1 < playerNumber <= CAPACITY:
        print(f"{playerNumber}人ですね！")
        break
      elif playerNumber > CAPACITY:
        print("お友達が多すぎます！12人以下でお願いします。")
      else:
        print("お友達を呼んできてください(イマジナリーでも可)")
    except ValueError:
      print("無効な入力です。整数を入力してください。")

  player = []
  playerData = []

  while True:
    game_input = input(
        "遊ぶゲームを入力してください(瞬間記憶ゲーム:1 フラッシュ暗算:2 キーボード早押し対決:3) : ").strip()
    if game_input == "1" or game_input.lower().startswith("し"):
      game = "瞬間記憶ゲーム"
      break
    elif game_input == "2" or game_input.lower().startswith("ふ"):
      game = "フラッシュ暗算"
      break
    elif game_input == "3" or game_input.lower().startswith("き"):
      game = "キーボード早押し対決"
      break
    elif game_input == "":
      print("何も入力されていません。'1'または'2'または'3'または'4'を入力してください。")
    else:
      print("無効な入力です。'1'または'2'または'3'または'4'を入力してください。")

  for i in range(playerNumber):
    while True:
      name = str(input(f"{i + 1}人目のプレイヤー名を決めてください！: ")).strip()

      if name == "":
        print("名前は空にできません。もう一度入力してください。")
        continue

      sameName = False
      for p_data in playerData:
        if name == p_data["name"]:
          sameName = True
          break

      if sameName:
        print("その名前はすでに使われています。別の名前を入力してください。")
        continue

      break

    player.append(name)
    playerData.append({"name": name, "score": 0})

    # if game == "瞬間記憶ゲーム" or game == "フラッシュ暗算" or game == "キーボード早押し対決":

  print(f"\n遊ぶゲーム => {game}")

  # if game == "ジジ抜き":
  #     jiji_nuki(playerData)
  if game == "瞬間記憶ゲーム":
    played = []
    print("\n--- プレイヤーの初期スコア ---")
    for p_data in playerData:
      print(f"{p_data['name']}: スコア {p_data['score']}")

    print("\n瞬間記憶ゲームを開始します！")
    time.sleep(1)

    while True:
      available_player_names = [
          p_data["name"] for p_data in playerData if p_data["name"] not in played]

      if not available_player_names:
        print("\nすべてのプレイヤーがプレイしました！最終結果を表示します。")
        eidetic_result(playerData)
        break

      playHuman_input = str(input(
          f"\n誰がプレイしますか？ (名前を入力 / '戦績'で表示 / '終了'でゲーム終了)\n 残りのプレイヤー => {' と '.join(available_player_names)} : ")).strip()

      if playHuman_input == "戦績":
        print("\n--- 現在の戦績 ---")
        for p_data in playerData:
          print(f"{p_data['name']}: スコア {p_data['score']}")
        continue

      elif playHuman_input == "終了":
        print("ゲームを終了します。")
        break
      elif playHuman_input == "":
        print("何も入力されていません。名前を入力してください。")
        continue

      found_player = False
      current_player_data = None

      if playHuman_input in available_player_names:
        for p_data in playerData:
          if playHuman_input == p_data["name"]:
            print(f"{playHuman_input}さんがプレイします！")
            found_player = True
            current_player_data = p_data
            break

      if not found_player:
        if playHuman_input in played:
          print("そのプレイヤーはもうすでに遊んでいます。他の人を入力してください。")
        else:
          print("そのプレイヤーは見つかりませんでした。もう一度入力してください。")
        continue
      else:
        played.append(playHuman_input)
        gained_points = eidetic(playHuman_input)

        current_player_data["score"] += gained_points
        print(
            f"\n{current_player_data['name']}さんの現在の合計スコア: {current_player_data['score']}点")
        continue

  elif game == "フラッシュ暗算":
    played = []

    print("\n--- プレイヤーの初期スコア ---")
    for p_data in playerData:
      print(f"{p_data['name']}: スコア {p_data['score']}")

    print("\nフラッシュ暗算を開始します！")
    time.sleep(1)

    while True:
      available_player_names = [
          p_data["name"] for p_data in playerData if p_data["name"] not in played]

      if not available_player_names:
        print("\nすべてのプレイヤーがプレイしました！最終結果を表示します。")
        flush_result(playerData)
        break

      playHuman_input = str(input(
          f"\n誰がプレイしますか？ (名前を入力 / '戦績'で表示 / '終了'でゲーム終了)\n 残りのプレイヤー => {' と '.join(available_player_names)} : ")).strip()

      if playHuman_input == "戦績":
        print("\n--- 現在の戦績 ---")
        for p_data in playerData:
          print(f"{p_data['name']}: スコア {p_data['score']}")
        continue

      elif playHuman_input == "終了":
        print("ゲームを終了します。")
        break
      elif playHuman_input == "":
        print("何も入力されていません。名前を入力してください。")
        continue

      found_player = False
      current_player_data = None

      if playHuman_input in available_player_names:
        for p_data in playerData:
          if playHuman_input == p_data["name"]:
            print(f"{playHuman_input}さんがプレイします！")
            found_player = True
            current_player_data = p_data
            break

      if not found_player:
        if playHuman_input in played:
          print("そのプレイヤーはもうすでに遊んでいます。他の人を入力してください。")
        else:
          print("そのプレイヤーは見つかりませんでした。もう一度入力してください。")
        continue
      else:
        played.append(playHuman_input)
        gained_points = flush_cal(playHuman_input)

        current_player_data["score"] += gained_points
        print(
            f"\n{current_player_data['name']}さんの現在の合計スコア: {current_player_data['score']}点")
        continue

  elif game == "キーボード早押し対決":
    keyboard_rush(playerData)

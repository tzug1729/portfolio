const assignmentsData = [
    // ===== 課題1: 数学解答 =====
    {
        id: 'assignment-1',
        number: 1,
        title: {
            ja: 'pythonを用いた数学解答',
            en: 'Mathematical Problem Solving with Python'
        },
        description: {
            ja: '条件分岐・例外処理・配列等について学べました。',
            en: 'Learned about conditionals, exception handling, arrays, and more.'
        },
        // 日本語タグ
        tags: ['Python', '配列操作'],
        // 英語タグ（フィルター用）
        tagsEn: ['Python', 'Array Operations'],
        date: '2025/04/30',
        colabLink: 'https://colab.research.google.com/drive/1gKPFu2A_OY4BLfTLFnxHTvf2Ig-M-4xy?usp=sharing',
        images: [
            {
                src: 'assignment/01/photos/question.png',
                caption: {
                    ja: '問題文(設問5のみ抜粋)',
                    en: 'Problem Statement (Excerpt of Question 5)'
                }
            },
            {
                src: 'assignment/01/photos/answer.png',
                caption: {
                    ja: '出力例',
                    en: 'Example Output'
                }
            }
        ],
        codeFilePath: 'assignment/01/assignment-1.py',
        sections: [
            {
                icon: 'fa-cogs',
                title: {
                    ja: '使用技術',
                    en: 'Technologies Used'
                },
                content: {
                    ja: 'Python 3.x、Numpy、Matplotlibを使用しました。',
                    en: 'Used Python 3.x, Numpy, and Matplotlib.'
                }
            }
        ]
    },
    
    // ===== 課題2: タートルグラフィックス =====
    {
        id: 'assignment-2',
        number: 2,
        title: {
            ja: 'タートルグラフィックスで図形描画',
            en: 'Described Shapes with Turtle Graphics'
        },
        description: {
            ja: 'タートルグラフィックスを使って様々な図形を描画しました。',
            en: 'Drew various shapes using Turtle Graphics.'
        },
        tags: ['Python', 'Turtle Graphics', '可視化'],
        tagsEn: ['Python', 'Turtle Graphics', 'Visualization'],
        date: '2025/05/14',
        colabLink: 'https://colab.research.google.com/drive/1sTbTR-mPJlvHiVnhGi1Tlz3rsQTuUBWd?usp=sharing',
        images: [
            {
                src: 'assignment/02/photos/candy.png',
                caption: {
                    ja: '実行結果',
                    en: 'Execution Result'
                }
            }
        ],
        codeFilePath: 'assignment/02/assignment-2.py',
        sections: []
    },
    
    // ===== 課題4: ガチャシミュレーション =====
    {
        id: 'assignment-4',
        number: 4,
        title: {
            ja: '乱数の利用によるガチャ',
            en: 'Gacha Simulation Using Random Numbers'
        },
        description: {
            ja: 'Pythonの乱数機能を使ったドラクエ風ガチャシミュレーション。',
            en: 'Gacha simulation using Python random functions.'
        },
        tags: ['Python', 'Random', 'Numpy'],
        tagsEn: ['Python', 'Random', 'Numpy'],
        date: '2025/06/25',
        colabLink: 'https://colab.research.google.com/drive/1wM2VRFl7teGG2rD1T7hoP9QZoHlF4Qvj?usp=sharing',
        images: [
            {
                src: 'assignment/04/photos/result.png',
                caption: {
                    ja: '実行結果',
                    en: 'Execution Result'
                }
            },
            {
                src: 'assignment/04/photos/demo_gacha.gif',
                caption: {
                    ja: '「ガチャ」プレイ動画',
                    en: '"Gacha" Gameplay Video'
                }
            },
            {
                src: 'assignment/04/photos/demo_toruneko.gif',
                caption: {
                    ja: 'ガチャ...?',
                    en: 'Gacha...?'
                }
            }
        ],
        codeFilePath: 'assignment/04/assignment-4.py',
        sections: []
    },
    
    // ===== 課題5: 機械学習入門（修正：単一ファイルに変更）=====
    {
        id: 'assignment-5',
        number: 5,
        title: {
            ja: '自由課題',
            en: 'Free Assignment'
        },
        description: {
            ja: '自由課題として，複数のゲームが遊べるpythonプログラムを作成しました．',
            en: 'As a free assignment, I created a Python program that allows you to play multiple games.'
        },
        tags: ['Python', 'Numpy'],
        tagsEn: ['Python', 'Numpy'],
        date: '2025/05/20',
        colabLink: 'https://colab.research.google.com/drive/1SqunrjrVl_XLKbrvY3-q5zhPI50zVjYk?hl=ja',
        images: [
            {
                src: 'assignment/05/photos/memorize.gif',
                caption: {
                    ja: '「瞬間記憶ゲーム」プレイ動画',
                    en: '"Instant Memory Game" Gameplay Video'
                }
            },
            {
                src: 'assignment/05/photos/flash.gif',
                caption: {
                    ja: '「フラッシュ暗算」プレイ動画',
                    en: '"Flash Mental Arithmetic" Gameplay Video'
                }
            },
            {
                src: 'assignment/05/photos/keyboard.gif',
                caption: {
                    ja: '「キーボード早押し対決」プレイ動画',
                    en: '"Keyboard Fast-Press Showdown" Gameplay Video'
                }
            }
        ],
        // 単一ファイルパス
        codeFilePath: 'assignment/05/assignment-5.py',
        sections: [
            {
                icon: 'fa-cogs',
                title: {
                    ja: '使用技術',
                    en: 'Technologies Used'
                },
                content: {
                    ja: 'Pythonと，ユーザー設定にNumpyを使用しました．',
                    en: 'Used Python and Numpy for user settings.'
                }
            },
            {
                icon: 'fa-lightbulb',
                title: {
                    ja: '工夫した点',
                    en: 'Innovations'
                },
                content: {
                    ja: '老若男女楽しめるように，難易度はだんだん難しくなるようにしました．ユーザー設定や得点計算を簡単にするためにNumpyを用いました．キーボード早押しゲームでは，どのようにすれば格闘ゲームのような対戦が可能になるかを工夫しました．',
                    en: 'Compared and verified multiple algorithms to select the optimal model.'
                }
            }
        ]
    }
];

// ===== 将来の拡張用テンプレート =====
/*
複数ファイル対応が必要になった場合は、以下のように codeFiles 配列を追加:

{
    id: 'assignment-6',
    number: 6,
    title: { ja: '課題名', en: 'Assignment Name' },
    description: { ja: '説明', en: 'Description' },
    tags: ['Tag1', 'Tag2'],
    tagsEn: ['Tag1', 'Tag2'],
    date: '2025/XX/XX',
    colabLink: '#',
    images: [],
    codeFiles: [
        {
            name: 'main.py',
            path: 'assignment/06/main.py',
            language: 'python'
        },
        {
            name: 'utils.py',
            path: 'assignment/06/utils.py',
            language: 'python'
        }
    ],
    sections: []
}
*/
// ギフトデータ
const GIFTS = [
  // スイーツ
  {
    id: 1,
    name: "プレミアムチョコレートセット",
    description: "ベルギー産カカオを使用した手作りトリュフチョコレートの詰め合わせ。ダーク、ミルク、ホワイトの3種類が楽しめます。大切な方への贈り物に最適です。",
    price: 3800,
    category: "sweets",
    categoryLabel: "スイーツ",
    emoji: "\ud83c\udf6b"
  },
  {
    id: 2,
    name: "季節のフルーツタルト",
    description: "旬のフルーツをふんだんに使った手作りタルト。サクサクのタルト生地にカスタードクリームと新鮮なフルーツを贅沢に盛り付けました。",
    price: 4200,
    category: "sweets",
    categoryLabel: "スイーツ",
    emoji: "\ud83c\udf70"
  },
  {
    id: 3,
    name: "抹茶スイーツコレクション",
    description: "京都の老舗茶園から仕入れた上質な抹茶を使用したスイーツセット。抹茶大福、抹茶プリン、抹茶クッキーの詰め合わせ。",
    price: 3200,
    category: "sweets",
    categoryLabel: "スイーツ",
    emoji: "\ud83c\udf75"
  },
  {
    id: 4,
    name: "焼き菓子ギフトボックス",
    description: "バターの香り豊かなマドレーヌ、フィナンシェ、ガレットブルトンヌなど、厳選された焼き菓子のアソートメント。",
    price: 2800,
    category: "sweets",
    categoryLabel: "スイーツ",
    emoji: "\ud83c\udf6a"
  },

  // ドリンク
  {
    id: 5,
    name: "スペシャルティコーヒーセット",
    description: "世界各地の厳選されたコーヒー豆を自家焙煎。エチオピア、コロンビア、グアテマラの3種セット。豊かな風味をお楽しみください。",
    price: 3500,
    category: "drink",
    categoryLabel: "ドリンク",
    emoji: "\u2615"
  },
  {
    id: 6,
    name: "クラフトビール飲み比べセット",
    description: "日本全国の人気ブルワリーから厳選したクラフトビール6本セット。IPA、ペールエール、スタウトなど多彩なスタイルが楽しめます。",
    price: 4800,
    category: "drink",
    categoryLabel: "ドリンク",
    emoji: "\ud83c\udf7a"
  },
  {
    id: 7,
    name: "オーガニック日本茶セット",
    description: "有機栽培された上質な日本茶のセット。煎茶、玉露、ほうじ茶の3種類。茶器に映える美しい色合いと深い味わいを楽しめます。",
    price: 4500,
    category: "drink",
    categoryLabel: "ドリンク",
    emoji: "\ud83c\udf3f"
  },
  {
    id: 8,
    name: "フルーツジュースギフト",
    description: "国産果物を100%使用した無添加ストレートジュースの詰め合わせ。りんご、みかん、ぶどうの3本セット。",
    price: 3000,
    category: "drink",
    categoryLabel: "ドリンク",
    emoji: "\ud83e\uddc3"
  },

  // 雑貨
  {
    id: 9,
    name: "アロマキャンドルセット",
    description: "天然エッセンシャルオイルを使用した手作りソイキャンドル。ラベンダー、ベルガモット、サンダルウッドの3個セット。リラックスタイムに。",
    price: 3600,
    category: "goods",
    categoryLabel: "雑貨",
    emoji: "\ud83d\udd6f\ufe0f"
  },
  {
    id: 10,
    name: "今治タオルセット",
    description: "最高品質の今治タオル。柔らかく吸水性に優れたバスタオルとフェイスタオルのセット。毎日の暮らしを豊かにする贈り物。",
    price: 5000,
    category: "goods",
    categoryLabel: "雑貨",
    emoji: "\ud83d\udec1"
  },
  {
    id: 11,
    name: "手作り陶器マグカップ",
    description: "職人が一つひとつ丁寧に作った陶器のマグカップ。温かみのある風合いと手に馴染む形状。ペアセットでお届けします。",
    price: 4200,
    category: "goods",
    categoryLabel: "雑貨",
    emoji: "\u2615"
  },
  {
    id: 12,
    name: "ボタニカルフレグランス",
    description: "天然植物由来の成分で作られたルームフレグランス。上品な香りがお部屋を満たし、心地よい空間を演出します。",
    price: 3800,
    category: "goods",
    categoryLabel: "雑貨",
    emoji: "\ud83c\udf3a"
  },

  // 体験
  {
    id: 13,
    name: "スパ＆リラクゼーション体験",
    description: "高級スパでのリラクゼーション体験チケット。アロママッサージ、フェイシャルケア、岩盤浴がセットになったプレミアムコース。",
    price: 15000,
    category: "experience",
    categoryLabel: "体験",
    emoji: "\ud83d\udec0"
  },
  {
    id: 14,
    name: "料理教室体験ギフト",
    description: "プロのシェフから学ぶ料理教室の体験チケット。和食、イタリアン、フレンチから選べるレッスン。食材と道具はすべて用意されます。",
    price: 8000,
    category: "experience",
    categoryLabel: "体験",
    emoji: "\ud83d\udc68\u200d\ud83c\udf73"
  },
  {
    id: 15,
    name: "陶芸体験チケット",
    description: "手びねりで自分だけの器を作る陶芸体験。講師が丁寧に指導するので初心者でも安心。作品は焼成後にお届けします。",
    price: 6500,
    category: "experience",
    categoryLabel: "体験",
    emoji: "\ud83c\udfef"
  },
  {
    id: 16,
    name: "ヘリコプター遊覧飛行",
    description: "都市の夜景を空から楽しむヘリコプター遊覧飛行。約20分間のフライトで忘れられない思い出を。2名様まで搭乗可能。",
    price: 25000,
    category: "experience",
    categoryLabel: "体験",
    emoji: "\ud83d\ude81"
  },

  // ファッション
  {
    id: 17,
    name: "カシミアストール",
    description: "最高級カシミア100%の大判ストール。軽くて暖かく、上品な光沢が魅力。カラーはベージュ、グレー、ネイビーから選べます。",
    price: 12000,
    category: "fashion",
    categoryLabel: "ファッション",
    emoji: "\ud83e\udde3"
  },
  {
    id: 18,
    name: "レザーウォレット",
    description: "イタリア製の上質なレザーを使用したコンパクト財布。職人が手作業で仕上げた逸品。カード収納も充実しています。",
    price: 18000,
    category: "fashion",
    categoryLabel: "ファッション",
    emoji: "\ud83d\udc5b"
  },
  {
    id: 19,
    name: "シルクスカーフ",
    description: "美しいフラワープリントのシルクスカーフ。首元やバッグのアクセントに。上品な光沢と滑らかな手触りが特徴です。",
    price: 8500,
    category: "fashion",
    categoryLabel: "ファッション",
    emoji: "\ud83c\udfa8"
  },
  {
    id: 20,
    name: "オーガニックコットンパジャマ",
    description: "肌にやさしいオーガニックコットン100%のパジャマセット。着心地の良さにこだわった上質な睡眠時間をプレゼント。",
    price: 9800,
    category: "fashion",
    categoryLabel: "ファッション",
    emoji: "\ud83d\udc55"
  }
];

// カテゴリラベルマッピング
const CATEGORY_LABELS = {
  all: "すべて",
  sweets: "スイーツ",
  drink: "ドリンク",
  goods: "雑貨",
  experience: "体験",
  fashion: "ファッション"
};

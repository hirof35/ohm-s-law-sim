# ⚡ 高度オームの法則 & 電力シミュレーター (Ohm's Law & Power Simulator)

TypeScriptで構築された、直感的かつ高精度な電気回路シミュレーターWebアプリケーションです。
単なる数値計算にとどまらず、オームの法則の整合性検証（バリデーション）、消費電力（W）のリアルタイム算出、および電流値に同期して流速が変化するグラフィカルな電子アニメーションUIを搭載しています。
<img width="565" height="590" alt="スクリーンショット 2026-05-30 094336" src="https://github.com/user-attachments/assets/6711b92e-b49d-4a5d-ae5f-b565640c355a" />

## 🚀 主な機能・特徴

* **リアルタイム双方向シミュレーション**
  * 電圧 (V)、電流 (I)、抵抗 (R) のうち、任意の2つの数値を入力すると、残りの1つの値を自動予測して瞬時に算出します。
* **物理的整合性の自動検証 (Validation)**
  * 3つの入力フォームすべてに数値が入力された場合、オームの法則 ($V = I \times R$) が物理的に成立しているかを自動判定します。矛盾がある場合は警告と正しい計算値をフィードバックします。
* **消費電力 (P) の自動算出**
  * 回路の状態からリアルタイムに消費電力 ($P = V \times I$) を計算し、オレンジ色の独立パネルへ動的に出力します。
* **動的グラフィカル回路図 (Visual UI)**
  * HTML5/CSS3のアニメーション技術を利用し、配線上を流れる「電子の粒」を可視化。電流の強さ（A）に比例して、電子の移動速度が滑らかに可変します。
* **堅牢なフロントエンド設計**
  * TypeScriptによる厳格な型定義と、DOMライフサイクル（`DOMContentLoaded`）を意識した安全なイベントバインド構造を採用し、オブジェクトの参照エラー（Null Pointer）を徹底的に排除しています。

## 🛠️ 技術スタック

* **Language:** TypeScript (ES2022 / ESモジュール形式)
* **Frontend:** HTML5, CSS3 (Flexbox, CSS Animation, requestAnimationFrame)
* **Build Tool:** tsc (TypeScript Compiler)

## 📦 開発環境での動かし方

### 1. リポジトリのクローン
```bash
git clone [https://github.com/あなたのユーザー名/ohms-law-simulator.git](https://github.com/あなたのユーザー名/ohms-law-simulator.git)
cd ohms-law-simulator
2. TypeScriptのコンパイル
TypeScriptファイルをJavaScriptにコンパイルします。

Bash
tsc
※継続して開発する場合は tsc -w でウォッチモードを起動させておくと便利です。

3. ローカルサーバーでの起動
ブラウザのセキュリティ方針（CORSポリシー）に準拠するため、Webサーバー経由で起動します。
VS Codeの拡張機能 Live Server を使用するか、以下のコマンド等でローカルサーバーを立ち上げてアクセスしてください。

Node.js環境の場合:

Bash
npx http-server .
📜 ライセンス
This project is licensed under the MIT License.

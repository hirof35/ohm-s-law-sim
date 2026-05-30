"use strict";
// main.ts
// アニメーション制御用グローバル変数
let animationId = null;
let electronProgress = 0;
/**
 * 画面が完全にロードされたら初期化処理を行う
 */
window.addEventListener('DOMContentLoaded', () => {
    // 1. DOM要素を安全に取得
    const vInput = document.getElementById('voltage');
    const iInput = document.getElementById('current');
    const rInput = document.getElementById('resistance');
    const outV = document.getElementById('out-v');
    const outI = document.getElementById('out-i');
    const outR = document.getElementById('out-r');
    const outP = document.getElementById('out-p');
    const msgBox = document.getElementById('msgBox');
    const guiV = document.getElementById('gui-v');
    const guiI = document.getElementById('gui-i');
    const guiR = document.getElementById('gui-r');
    const electron = document.getElementById('electron-dot');
    // 要素が1つでも取得できなかった場合は処理を中断（安全策）
    if (!vInput || !iInput || !rInput || !outV || !outI || !outR || !outP || !msgBox || !guiV || !guiI || !guiR || !electron) {
        console.error("必要なHTML要素が見つかりません。id属性を確認してください。");
        return;
    }
    /**
     * 計算・シミュレーション主処理
     */
    function calculate() {
        const v = vInput.value !== '' ? parseFloat(vInput.value) : null;
        const i = iInput.value !== '' ? parseFloat(iInput.value) : null;
        const r = rInput.value !== '' ? parseFloat(rInput.value) : null;
        // 2つ未満しか入力がない場合はリセット
        if ([v, i, r].filter(val => val !== null).length < 2) {
            resetOutputs();
            stopElectronAnimation();
            return;
        }
        let finalV = 0, finalI = 0, finalR = 0;
        let message = "";
        // パターン1: 2点入力から残りをシミュレート
        if (v === null && i !== null && r !== null) {
            finalV = i * r;
            finalI = i;
            finalR = r;
            vInput.placeholder = `予測: ${finalV.toFixed(2)}`;
            message = "💡 電圧と電力を自動計算しました";
        }
        else if (i === null && v !== null && r !== null && r > 0) {
            finalV = v;
            finalI = v / r;
            finalR = r;
            iInput.placeholder = `予測: ${finalI.toFixed(4)}`;
            message = "💡 電流と電力を自動計算しました";
        }
        else if (r === null && v !== null && i !== null && i !== 0) {
            finalV = v;
            finalI = i;
            finalR = v / i;
            rInput.placeholder = `予測: ${finalR.toFixed(2)}`;
            message = "💡 抵抗と電力を自動計算しました";
        }
        // パターン2: 3点入力の整合性チェック
        else if (v !== null && i !== null && r !== null) {
            finalV = v;
            finalI = i;
            finalR = r;
            const expectedV = i * r;
            const isCorrect = Math.abs(v - expectedV) < 0.01;
            if (isCorrect) {
                message = "✅ オームの法則が成立しています";
            }
            else {
                message = `❌ 矛盾（計算上の電圧は ${expectedV.toFixed(2)} V になります）`;
            }
        }
        // 消費電力 P = V * I
        const finalP = finalV * finalI;
        // UI表示更新
        updateUI(finalV, finalI, finalR, finalP, message);
        // 電子アニメーション速度制御
        if (finalI > 0) {
            startElectronAnimation(finalI);
        }
        else {
            stopElectronAnimation();
        }
    }
    function updateUI(v, i, r, p, msg) {
        outV.textContent = v.toFixed(2);
        outI.textContent = i.toFixed(4);
        outR.textContent = r.toFixed(2);
        outP.textContent = p.toFixed(2);
        msgBox.textContent = msg;
        guiV.textContent = `${v.toFixed(1)} V`;
        guiI.textContent = `${i.toFixed(3)} A`;
        guiR.textContent = `${r.toFixed(1)} Ω`;
    }
    function resetOutputs() {
        vInput.placeholder = "例: 5";
        iInput.placeholder = "例: 0.02";
        rInput.placeholder = "例: 250";
        outV.textContent = "--";
        outI.textContent = "--";
        outR.textContent = "--";
        outP.textContent = "--";
        guiV.textContent = "-- V";
        guiI.textContent = "-- A";
        guiR.textContent = "-- Ω";
        msgBox.textContent = "";
    }
    function startElectronAnimation(current) {
        stopElectronAnimation();
        electron.style.display = 'block';
        const speedFactor = Math.min(current * 2, 5);
        function animate() {
            electronProgress = (electronProgress + speedFactor) % 100;
            let x = 0, y = 0;
            // 四角い配線の周回軌道
            if (electronProgress < 25) {
                x = 50 + (electronProgress / 25) * 390;
                y = 30;
            }
            else if (electronProgress < 50) {
                x = 440;
                y = 30 + ((electronProgress - 25) / 25) * 96;
            }
            else if (electronProgress < 75) {
                x = 440 - ((electronProgress - 50) / 25) * 390;
                y = 130;
            }
            else {
                x = 50;
                y = 130 - ((electronProgress - 75) / 25) * 96;
            }
            electron.style.left = `${x}px`;
            electron.style.top = `${y}px`;
            animationId = requestAnimationFrame(animate);
        }
        animate();
    }
    function stopElectronAnimation() {
        if (animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        electron.style.display = 'none';
    }
    // 各入力フォームへのイベント監視を安全にバインド
    [vInput, iInput, rInput].forEach(input => {
        input.addEventListener('input', calculate);
    });
});

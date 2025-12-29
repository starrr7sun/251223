let stopSheet;
let rollSheet;
let stopAnimation = [];
let rollAnimation = [];
let jumpSheet;
let jumpAnimation = [];
let lightningSheet;
let lightningAnimation = [];
let boomSheet;
let boomAnimation = [];
let stopSheet2;
let stopAnimation2 = [];
let questionSheet;
let questionAnimation = [];

let drinkSheet;
let drinkAnimation = [];
let character3Sheet;
let walkSheet2;
let walkAnimation2 = [];
let character3Animation = [];
let character4Sheet;
let character4Animation = [];
let character5Sheet;
let character5Animation = [];

let keroroSound;
let bgImg;
let bgX = 0;


const stopFrameCount = 15;
const stopFrameWidth = 745 / 15;

const rollFrameCount = 10;
const rollFrameWidth = 705 / 10; // 70.5
const rollFrameHeight = 53;

const jumpFrameCount = 12;
const jumpFrameWidth = 679 / 12; // 56.58...
const jumpFrameHeight = 52;

const lightningFrameCount = 12;
const lightningFrameWidth = 883 / 12; // 73.58...
const lightningFrameHeight = 152;

const boomFrameCount = 8;
const boomFrameWidth = 715 / 8; // 89.375
const boomFrameHeight = 105;

const stopFrameCount2 = 12;
const stopFrameWidth2 = 607 / 12; // 50.58...
const stopFrameHeight2 = 62;

const walkFrameCount2 = 16;
const walkFrameWidth2 = 795 / 16; // 49.6875
const walkFrameHeight2 = 63;

const drinkFrameCount = 5;
const drinkFrameWidth = 225 / 5; // 45
const drinkFrameHeight = 42;

const questionFrameCount = 6;
const questionFrameWidth = 283 / 6; // 47.16...
const questionFrameHeight = 46;

const character3FrameCount = 9;
const character3FrameWidth = 472 / 9; // 52.44...
const character3FrameHeight = 63;

const character4FrameCount = 9;
const character4FrameWidth = 616 / 9; // 68.44...
const character4FrameHeight = 55;

const character5FrameCount = 6;
const character5FrameWidth = 229 / 6; // 38.16...
const character5FrameHeight = 35;

let gameState = 'START'; // 遊戲狀態：START 或 PLAYING
let startButton;
let restartButton;
let menuButton, muteButton, volumeSlider;
let isMenuOpen = false;

let correctAnswersCount = 0;
let isQuestionActive = false; // 是否有正在進行的問題
let isAnswerCorrect = false;  // 上一次回答是否正確
let questionOrder = [];       // 題目順序
let totalQs = 0;              // 總題數
const defaultQuestions = [
  { q: "ENHYPEN 是透過哪個韓國選秀節目最終選拔出來的七人男子團體？", a: "I-LAND", correct: "答對了！很棒！", wrong: "再想想看喔！", hint: "不是喔" },
  { q: "請問 ENHYPEN 總共有幾位成員？", a: "7", correct: "沒錯！", wrong: "不對喔", hint: "五位以上" },
  { q: "ENHYPEN 的隊長是哪一位成員？", a: "梁禎元", correct: "答對了！", wrong: "不對喔", hint: "貓咪相" },
  { q: "ENHYPEN 的粉絲名稱是什麼？", a: "ENGENE", correct: "答對了！", wrong: "不對喔", hint: "跟引擎有關" },
  { q: "ENHYPEN 的大哥是誰？", a: "李羲承", correct: "沒錯！", wrong: "再猜猜", hint: "Heeseung" },
  { q: "哪位成員曾是花式滑冰選手？", a: "朴成訓", correct: "答對了！冰王子！", wrong: "不對喔", hint: "Sunghoon" },
  { q: "ENHYPEN 的忙內（年紀最小）是誰？", a: "NI-KI", correct: "沒錯！", wrong: "不對喔", hint: "來自日本" },
  { q: "成員 JAY 的代表動物是什麼？", a: "老鷹", correct: "答對了！", wrong: "不對喔", hint: "或是黑貓" },
  { q: "成員 SUNOO 的代表表情符號通常是什麼？", a: "狐狸", correct: "沒錯！", wrong: "再猜猜", hint: "很可愛的動物" },
  { q: "ENHYPEN 的出道日期是哪一年？", a: "2020", correct: "答對了！", wrong: "不對喔", hint: "疫情開始那年" }
];
let confetti = [];

let currentFrame = 0;
let jumpFrame = 0;
let lightningFrame = 0;
let boomFrame = 0;

// 角色1的動畫狀態變數
let activeAnimation;
let currentAnimationLength;

// 角色2的狀態變數
let currentFrame2 = 0;
let drinkFrame2 = 0;
let currentFrame3 = 0;
let currentFrame4 = 0;
let currentFrame5 = 0;
let isChar2FacingLeft = false;
let hasChar2Triggered = false;
let activeNPC = 0;
const triggerDistance = 100; // 觸發動畫的距離
let char2DialogueText = "";
let questionsTable; // p5.Table 用來存題庫
let currentQuestionIndex = -1;
let currentQuestion = "";
let currentAnswer = "";
let currentCorrectFeedback = "";
let currentWrongFeedback = "";
let currentHint = "";
let questionInterval = 5000; // 每題顯示時間 (毫秒)
let lastQuestionTime = 0;

// 將文字依寬度換行，支援中文連續字元，maxLines 為可選的最大行數
function wrapTextToLines(txt, maxWidth, maxLines) {
  if (!txt) return [];
  let lines = [];
  let current = '';
  for (let i = 0; i < txt.length; i++) {
    current += txt.charAt(i);
    if (textWidth(current) > maxWidth) {
      // 當加入當前字後超過寬度，將前一個狀態推入行，並從當前字開始新行
      let line = current.slice(0, -1);
      if (line.length === 0) {
        // 單個字就超過，強制放入
        line = current;
        current = '';
      } else {
        current = txt.charAt(i);
      }
      lines.push(line);
      if (maxLines && lines.length >= maxLines) break;
    }
  }
  if (current.length > 0 && (!maxLines || lines.length < maxLines)) {
    lines.push(current);
  }
  // 如果超過最大行數，截斷並加入省略號
  if (maxLines && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
  }
  if (maxLines && lines.length === maxLines) {
    let last = lines[lines.length - 1];
    // 確保最後一行加上省略號後仍可放下
    while (textWidth(last + '...') > maxWidth && last.length > 0) {
      last = last.slice(0, -1);
    }
    lines[lines.length - 1] = last + (last.length > 0 ? '...' : '');
  }
  return lines;
}

// 對話與輸入系統的變數
let nameInput;
let playerName = "";
let dialogueState = 0; // 0: 無對話, 1: 正在詢問, 2: 已回答(顯示回饋)
let feedbackTimer = 0;
let feedbackDuration = 2000; // 顯示回饋時間(ms)

let characterX, characterY;
let character2X, character2Y, character2OffsetX;
let character3X, character3Y, character4X, character4Y, character4OffsetX, character5X, character5Y, character5OffsetX;
let originalY;
const characterSpeed = 3;
let isFacingLeft = false; // 追蹤角色方向
let isJumping = false;
let velocityY = 0;
const gravity = 0.6;
const jumpPower = -15;
let isLightning = false;
let isBooming = false;

function preload() {
  // 預先載入圖片精靈檔案
  // 載入題庫 CSV (有 header: question,answer,correct,wrong,hint)
  questionsTable = loadTable('questions.csv', 'csv', 'header');
  bgImg = loadImage('background.png');
  stopSheet = loadImage('1/stop/stop.png');
  rollSheet = loadImage('1/roll/roll.png');
  jumpSheet = loadImage('1/jump/jump.png');
  lightningSheet = loadImage('1/lightning/lightning.png');
  boomSheet = loadImage('1/boom/boom.png');
  stopSheet2 = loadImage('2/stop/stop.png');
  walkSheet2 = loadImage('2/walk/walk.png');
  drinkSheet = loadImage('2/drink/drink.png');
  questionSheet = loadImage('2/question/question.png');
  character3Sheet = loadImage('3/jump/jump.png');
  character4Sheet = loadImage('4/fly/fly.png');
  character5Sheet = loadImage('5/stop/stop.png');
  keroroSound = loadSound('keroro.mp3');
}

function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);

  // 初始化角色位置於畫布中央
  characterX = width / 2;
  characterY = height * 0.85; // 調整垂直位置至草地上
  bgX = width / 2;
  character2OffsetX = -150; // 將新角色放在左邊
  character2Y = height * 0.85; // 調整垂直位置至草地上
  character3X = width / 2 + 250; // 將新角色放在右邊
  character3Y = height * 0.85; // 調整垂直位置至草地上
  character4OffsetX = -300; // 在角色1左邊
  character4Y = height * 0.65; // 飛在空中
  character5OffsetX = -450; // 在角色1更左邊
  character5Y = height * 0.85; // 調整垂直位置至草地上
  originalY = characterY;

  // 從 'stop.png' 圖片精靈中擷取每一個影格
  for (let i = 0; i < stopFrameCount; i++) {
    const x = Math.round(i * stopFrameWidth);
    const nextX = Math.round((i + 1) * stopFrameWidth);
    const w = nextX - x; // 51px
    let frame = stopSheet.get(x, 0, w, 51);
    stopAnimation.push(frame);
  }

  // --- 為 roll 動畫建立乾淨的圖片精靈 ---
  const cleanRollFrameWidth = 70;
  const cleanRollSheetWidth = cleanRollFrameWidth * rollFrameCount;
  let cleanRollSheet = createGraphics(cleanRollSheetWidth, rollFrameHeight);
  for (let i = 0; i < rollFrameCount; i++) {
    const sourceX = Math.floor(i * rollFrameWidth);
    const sourceW = Math.floor((i + 1) * rollFrameWidth) - sourceX;
    cleanRollSheet.image(rollSheet, i * cleanRollFrameWidth, 0, cleanRollFrameWidth, rollFrameHeight, sourceX, 0, sourceW, rollFrameHeight);
  }
  for (let i = 0; i < rollFrameCount; i++) {
    let frame = cleanRollSheet.get(i * cleanRollFrameWidth, 0, cleanRollFrameWidth, rollFrameHeight);
    rollAnimation.push(frame);
  }

  // --- 為 jump 動畫建立乾淨的圖片精靈 ---
  const cleanJumpFrameWidth = 56;
  const cleanJumpSheetWidth = cleanJumpFrameWidth * jumpFrameCount;
  let cleanJumpSheet = createGraphics(cleanJumpSheetWidth, jumpFrameHeight);
  for (let i = 0; i < jumpFrameCount; i++) {
    const sourceX = Math.floor(i * jumpFrameWidth);
    const sourceW = Math.floor((i + 1) * jumpFrameWidth) - sourceX;
    cleanJumpSheet.image(jumpSheet, i * cleanJumpFrameWidth, 0, cleanJumpFrameWidth, jumpFrameHeight, sourceX, 0, sourceW, jumpFrameHeight);
  }
  for (let i = 0; i < jumpFrameCount; i++) {
    let frame = cleanJumpSheet.get(i * cleanJumpFrameWidth, 0, cleanJumpFrameWidth, jumpFrameHeight);
    jumpAnimation.push(frame);
  }

  // --- 為 lightning 動畫建立乾淨的圖片精靈 ---
  const cleanLightningFrameWidth = 73;
  const cleanLightningSheetWidth = cleanLightningFrameWidth * lightningFrameCount;
  let cleanLightningSheet = createGraphics(cleanLightningSheetWidth, lightningFrameHeight);
  for (let i = 0; i < lightningFrameCount; i++) {
    const sourceX = Math.floor(i * lightningFrameWidth);
    const sourceW = Math.floor((i + 1) * lightningFrameWidth) - sourceX;
    cleanLightningSheet.image(lightningSheet, i * cleanLightningFrameWidth, 0, cleanLightningFrameWidth, lightningFrameHeight, sourceX, 0, sourceW, lightningFrameHeight);
  }
  for (let i = 0; i < lightningFrameCount; i++) {
    let frame = cleanLightningSheet.get(i * cleanLightningFrameWidth, 0, cleanLightningFrameWidth, lightningFrameHeight);
    lightningAnimation.push(frame);
  }

  // --- 為 boom 動畫建立乾淨的圖片精靈 ---
  const cleanBoomFrameWidth = 89;
  const cleanBoomSheetWidth = cleanBoomFrameWidth * boomFrameCount;
  let cleanBoomSheet = createGraphics(cleanBoomSheetWidth, boomFrameHeight);
  for (let i = 0; i < boomFrameCount; i++) {
    const sourceX = Math.floor(i * boomFrameWidth);
    const sourceW = Math.floor((i + 1) * boomFrameWidth) - sourceX;
    cleanBoomSheet.image(boomSheet, i * cleanBoomFrameWidth, 0, cleanBoomFrameWidth, boomFrameHeight, sourceX, 0, sourceW, boomFrameHeight);
  }
  for (let i = 0; i < boomFrameCount; i++) {
    let frame = cleanBoomSheet.get(i * cleanBoomFrameWidth, 0, cleanBoomFrameWidth, boomFrameHeight);
    boomAnimation.push(frame);
  }

  // --- 為 stop2 動畫建立乾淨的圖片精靈 ---
  const cleanStop2FrameWidth = 50;
  const cleanStop2SheetWidth = cleanStop2FrameWidth * stopFrameCount2;
  let cleanStop2Sheet = createGraphics(cleanStop2SheetWidth, stopFrameHeight2);
  for (let i = 0; i < stopFrameCount2; i++) {
    const sourceX = Math.floor(i * stopFrameWidth2);
    const sourceW = Math.floor((i + 1) * stopFrameWidth2) - sourceX;
    cleanStop2Sheet.image(stopSheet2, i * cleanStop2FrameWidth, 0, cleanStop2FrameWidth, stopFrameHeight2, sourceX, 0, sourceW, stopFrameHeight2);
  }
  for (let i = 0; i < stopFrameCount2; i++) {
    let frame = cleanStop2Sheet.get(i * cleanStop2FrameWidth, 0, cleanStop2FrameWidth, stopFrameHeight2);
    stopAnimation2.push(frame);
  }

  // --- 為 question 動畫建立乾淨的圖片精靈 ---
  const cleanQuestionFrameWidth = 47;
  const cleanQuestionSheetWidth = cleanQuestionFrameWidth * questionFrameCount;
  let cleanQuestionSheet = createGraphics(cleanQuestionSheetWidth, questionFrameHeight);
  for (let i = 0; i < questionFrameCount; i++) {
    const sourceX = Math.floor(i * questionFrameWidth);
    const sourceW = Math.floor((i + 1) * questionFrameWidth) - sourceX;
    cleanQuestionSheet.image(questionSheet, i * cleanQuestionFrameWidth, 0, cleanQuestionFrameWidth, questionFrameHeight, sourceX, 0, sourceW, questionFrameHeight);
  }
  for (let i = 0; i < questionFrameCount; i++) {
    let frame = cleanQuestionSheet.get(i * cleanQuestionFrameWidth, 0, cleanQuestionFrameWidth, questionFrameHeight);
    questionAnimation.push(frame);
  }

  // --- 為 character 3 動畫建立乾淨的圖片精靈 ---
  const cleanChar3FrameWidth = 52;
  const cleanChar3SheetWidth = cleanChar3FrameWidth * character3FrameCount;
  let cleanChar3Sheet = createGraphics(cleanChar3SheetWidth, character3FrameHeight);
  for (let i = 0; i < character3FrameCount; i++) {
    const sourceX = Math.floor(i * character3FrameWidth);
    const sourceW = Math.floor((i + 1) * character3FrameWidth) - sourceX;
    cleanChar3Sheet.image(character3Sheet, i * cleanChar3FrameWidth, 0, cleanChar3FrameWidth, character3FrameHeight, sourceX, 0, sourceW, character3FrameHeight);
  }
  for (let i = 0; i < character3FrameCount; i++) {
    let frame = cleanChar3Sheet.get(i * cleanChar3FrameWidth, 0, cleanChar3FrameWidth, character3FrameHeight);
    character3Animation.push(frame);
  }

  // --- 為 walk2 動畫建立乾淨的圖片精靈 ---
  const cleanWalk2FrameWidth = 49;
  const cleanWalk2SheetWidth = cleanWalk2FrameWidth * walkFrameCount2;
  let cleanWalk2Sheet = createGraphics(cleanWalk2SheetWidth, walkFrameHeight2);
  for (let i = 0; i < walkFrameCount2; i++) {
    const sourceX = Math.floor(i * walkFrameWidth2);
    const sourceW = Math.floor((i + 1) * walkFrameWidth2) - sourceX;
    cleanWalk2Sheet.image(walkSheet2, i * cleanWalk2FrameWidth, 0, cleanWalk2FrameWidth, walkFrameHeight2, sourceX, 0, sourceW, walkFrameHeight2);
  }
  for (let i = 0; i < walkFrameCount2; i++) {
    let frame = cleanWalk2Sheet.get(i * cleanWalk2FrameWidth, 0, cleanWalk2FrameWidth, walkFrameHeight2);
    walkAnimation2.push(frame);
  }

  // --- 為 drink 動畫建立乾淨的圖片精靈 ---
  const cleanDrinkFrameWidth = 45;
  const cleanDrinkSheetWidth = cleanDrinkFrameWidth * drinkFrameCount;
  let cleanDrinkSheet = createGraphics(cleanDrinkSheetWidth, drinkFrameHeight);
  for (let i = 0; i < drinkFrameCount; i++) {
    const sourceX = Math.floor(i * drinkFrameWidth);
    const sourceW = Math.floor((i + 1) * drinkFrameWidth) - sourceX;
    cleanDrinkSheet.image(drinkSheet, i * cleanDrinkFrameWidth, 0, cleanDrinkFrameWidth, drinkFrameHeight, sourceX, 0, sourceW, drinkFrameHeight);
  }
  for (let i = 0; i < drinkFrameCount; i++) {
    let frame = cleanDrinkSheet.get(i * cleanDrinkFrameWidth, 0, cleanDrinkFrameWidth, drinkFrameHeight);
    drinkAnimation.push(frame);
  }

  // --- 為 character 4 動畫建立乾淨的圖片精靈 ---
  const cleanChar4FrameWidth = 68;
  const cleanChar4SheetWidth = cleanChar4FrameWidth * character4FrameCount;
  let cleanChar4Sheet = createGraphics(cleanChar4SheetWidth, character4FrameHeight);
  for (let i = 0; i < character4FrameCount; i++) {
    const sourceX = Math.floor(i * character4FrameWidth);
    const sourceW = Math.floor((i + 1) * character4FrameWidth) - sourceX;
    cleanChar4Sheet.image(character4Sheet, i * cleanChar4FrameWidth, 0, cleanChar4FrameWidth, character4FrameHeight, sourceX, 0, sourceW, character4FrameHeight);
  }
  for (let i = 0; i < character4FrameCount; i++) {
    let frame = cleanChar4Sheet.get(i * cleanChar4FrameWidth, 0, cleanChar4FrameWidth, character4FrameHeight);
    character4Animation.push(frame);
  }

  // --- 為 character 5 動畫建立乾淨的圖片精靈 ---
  const cleanChar5FrameWidth = 38;
  const cleanChar5SheetWidth = cleanChar5FrameWidth * character5FrameCount;
  let cleanChar5Sheet = createGraphics(cleanChar5SheetWidth, character5FrameHeight);
  for (let i = 0; i < character5FrameCount; i++) {
    const sourceX = Math.floor(i * character5FrameWidth);
    const sourceW = Math.floor((i + 1) * character5FrameWidth) - sourceX;
    cleanChar5Sheet.image(character5Sheet, i * cleanChar5FrameWidth, 0, cleanChar5FrameWidth, character5FrameHeight, sourceX, 0, sourceW, character5FrameHeight);
  }
  for (let i = 0; i < character5FrameCount; i++) {
    let frame = cleanChar5Sheet.get(i * cleanChar5FrameWidth, 0, cleanChar5FrameWidth, character5FrameHeight);
    character5Animation.push(frame);
  }


  // 將圖片的繪製模式設定為中心對齊
  imageMode(CENTER);

  // 建立文字輸入框並初始隱藏
  nameInput = createInput('');
  nameInput.hide();
  nameInput.style('font-size', '16px');
  nameInput.style('background-color', 'transparent');
  nameInput.style('border', 'none');
  nameInput.style('text-align', 'center');
  nameInput.style('outline', 'none'); // 移除點擊時的藍色外框

  // 建立開始按鈕
  startButton = createButton('開始遊戲');
  startButton.position(width / 2 - 100, height / 2 + 40);
  startButton.size(200, 60);
  startButton.style('font-size', '30px');
  startButton.style('background-color', '#ffffff');
  startButton.style('border', '2px solid #000000');
  startButton.style('border-radius', '20px');
  startButton.style('cursor', 'pointer');
  startButton.mousePressed(startGame);
  startButton.mouseOver(() => startButton.style('background-color', '#e0e0e0'));
  startButton.mouseOut(() => startButton.style('background-color', '#ffffff'));

  // 建立重新開始按鈕
  restartButton = createButton('重新開始');
  restartButton.position(width / 2 - 100, height / 2 + 120);
  restartButton.size(200, 60);
  restartButton.style('font-size', '30px');
  restartButton.style('background-color', '#ffffff');
  restartButton.style('border', '2px solid #000000');
  restartButton.style('border-radius', '20px');
  restartButton.style('cursor', 'pointer');
  restartButton.mousePressed(resetGame);
  restartButton.mouseOver(() => restartButton.style('background-color', '#e0e0e0'));
  restartButton.mouseOut(() => restartButton.style('background-color', '#ffffff'));
  restartButton.hide();

  // 選單按鈕
  menuButton = createButton('☰');
  menuButton.position(width - 70, 20);
  menuButton.size(50, 50);
  menuButton.style('font-size', '24px');
  menuButton.style('background-color', '#ffffff');
  menuButton.style('border', '2px solid #000000');
  menuButton.style('border-radius', '15px');
  menuButton.style('cursor', 'pointer');
  menuButton.style('z-index', '1001');
  menuButton.mousePressed(toggleMenu);
  menuButton.mouseOver(() => menuButton.style('background-color', '#e0e0e0'));
  menuButton.mouseOut(() => menuButton.style('background-color', '#ffffff'));

  // 靜音按鈕
  muteButton = createButton('🔊');
  muteButton.position(width - 70, 80);
  muteButton.size(50, 50);
  muteButton.style('font-size', '24px');
  muteButton.style('background-color', '#ffffff');
  muteButton.style('border', '2px solid #000000');
  muteButton.style('border-radius', '15px');
  muteButton.style('cursor', 'pointer');
  muteButton.style('z-index', '1001');
  muteButton.mousePressed(toggleMute);
  muteButton.mouseOver(() => muteButton.style('background-color', '#e0e0e0'));
  muteButton.mouseOut(() => muteButton.style('background-color', '#ffffff'));
  muteButton.hide();

  // 音量滑桿
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(width - 220, 140);
  volumeSlider.size(200, 20);
  volumeSlider.style('cursor', 'pointer');
  volumeSlider.style('z-index', '1001');
  volumeSlider.hide();
}

function startGame() {
  gameState = 'PLAYING';
  startButton.hide();
  correctAnswersCount = 0;
  isQuestionActive = false;
  keroroSound.loop();
  
  // 初始化並洗牌題目順序
  questionOrder = [];
  let useCSV = questionsTable && questionsTable.getRowCount() > 0;
  // 計算題庫總共有多少題
  let poolSize = useCSV ? questionsTable.getRowCount() : defaultQuestions.length;
  for (let i = 0; i < poolSize; i++) {
    questionOrder.push(i);
  }
  shuffle(questionOrder, true);
  
  // 設定本局遊戲只問 3 題 (如果題庫少於 3 題，則以題庫數量為準)
  totalQs = min(3, poolSize);
  if (totalQs < 1) totalQs = 1; // 確保至少有一題
}

function resetGame() {
  gameState = 'START';
  restartButton.hide();
  startButton.show();
  correctAnswersCount = 0;
  isQuestionActive = false;
  currentHint = "";
  confetti = [];
  keroroSound.stop();
  
  // 重置位置與狀態
  characterX = width / 2;
  characterY = originalY;
  bgX = width / 2;
  character2OffsetX = -150;
  character4OffsetX = -300;
  character5OffsetX = -450;
  dialogueState = 0;
  hasChar2Triggered = false;
  activeNPC = 0;
  nameInput.hide();
}

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    muteButton.show();
    volumeSlider.show();
    menuButton.html('✕');
  } else {
    muteButton.hide();
    volumeSlider.hide();
    menuButton.html('☰');
  }
}

function toggleMute() {
  if (volumeSlider.value() > 0) {
    volumeSlider.value(0);
    muteButton.html('🔇');
  } else {
    volumeSlider.value(0.5);
    muteButton.html('🔊');
  }
}

function drawMenuInterface() {
  if (isMenuOpen) {
    push();
    resetMatrix(); // 確保繪製在最上層且不受變形影響
    fill(255, 255, 255, 230);
    stroke(0);
    strokeWeight(2);
    rectMode(CORNER);
    rect(width - 240, 10, 230, 160, 20);
    
    fill(0);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text("音量調整", width - 220, 115);
    pop();

    let vol = volumeSlider.value();
    keroroSound.setVolume(vol);
    if (vol > 0) muteButton.html('🔊');
    else muteButton.html('🔇');
  }
}

function draw() {
  // 如果是開始畫面，繪製標題與背景，不執行遊戲邏輯
  if (gameState === 'START') {
    background('#90e0ef');
    if (bgImg.width > 0 && bgImg.height > 0) {
      let scale = height / bgImg.height;
      let scaledW = bgImg.width * scale;
      image(bgImg, width / 2, height / 2, scaledW, height);
    }
    drawMenuInterface();
    return;
  }

  if (gameState === 'WIN') {
    background('#caf0f8');
    
    // --- 旋轉光芒背景特效 ---
    push();
    translate(width / 2, height / 2);
    rotate(frameCount * 0.01);
    noStroke();
    fill(255, 255, 255, 100); // 半透明白色
    let r = max(width, height) * 1.5;
    for (let i = 0; i < 6; i++) {
      triangle(0, 0, r * cos(0), r * sin(0), r * cos(PI / 6), r * sin(PI / 6));
      rotate(PI / 3);
    }
    pop();

    // --- 彩帶特效 ---
    if (frameCount % 2 === 0) {
      confetti.push({
        x: random(width),
        y: -10,
        vx: random(-2, 2),
        vy: random(3, 7),
        size: random(8, 16),
        color: color(random(255), random(255), random(255)),
        angle: random(TWO_PI),
        spin: random(-0.1, 0.1)
      });
    }

    for (let i = confetti.length - 1; i >= 0; i--) {
      let p = confetti[i];
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;

      push();
      translate(p.x, p.y);
      rotate(p.angle);
      fill(p.color);
      noStroke();
      rectMode(CENTER);
      rect(0, 0, p.size, p.size);
      pop();

      if (p.y > height) {
        confetti.splice(i, 1);
      }
    }

    push();
    translate(width / 2, height / 2);
    let scaleFactor = 1 + 0.1 * sin(frameCount * 0.1);
    scale(scaleFactor);
    textAlign(CENTER, CENTER);
    textSize(80);
    fill('#0077b6');
    stroke(255);
    strokeWeight(4);
    text("通關", 0, -40);
    pop();
    
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    noStroke();
    text("你已成功回答 3 題", width / 2, height / 2 + 60);
    restartButton.show();
    drawMenuInterface();
    return;
  }

  // 設定背景顏色
  background('#90e0ef');

  if (bgImg.width > 0 && bgImg.height > 0) {
    let scale = height / bgImg.height;
    let scaledW = bgImg.width * scale;
    
    // 計算需要繪製的背景圖索引範圍，確保畫面被填滿
    let minN = Math.floor((-bgX - scaledW / 2) / scaledW);
    let maxN = Math.ceil((width - bgX + scaledW / 2) / scaledW);

    for (let n = minN; n <= maxN; n++) {
      let drawX = bgX + n * scaledW;
      image(bgImg, drawX, height / 2, scaledW, height);
    }
  }

  character4X = bgX + character4OffsetX;
  character5X = bgX + character5OffsetX;
  character2X = bgX + character2OffsetX;
  character3X = bgX + 250; // 讓角色3跟著背景移動

  // --- 角色4的邏輯 ---
  if (frameCount % 10 === 0) { // 動畫速度
    currentFrame4 = (currentFrame4 + 1) % character4FrameCount;
  }

  push();
  // 讓角色上下漂浮
  let bobbing = sin(frameCount * 0.05) * 10;
  translate(character4X, character4Y + bobbing);
  if (character4Animation[currentFrame4]) {
    image(character4Animation[currentFrame4], 0, 0);
  }
  pop();

  // --- 角色5的邏輯 ---
  if (frameCount % 12 === 0) {
    currentFrame5 = (currentFrame5 + 1) % character5FrameCount;
  }

  push();
  translate(character5X, character5Y);
  if (character5Animation[currentFrame5]) {
    image(character5Animation[currentFrame5], 0, 0);
  }
  pop();

  let animationDirection = 1; // 1 代表正向播放, -1 代表反向

  // 檢查是否要觸發一次性動畫
  if (keyIsDown(UP_ARROW) && !isJumping && !isLightning && !isBooming) {
    isJumping = true;
    velocityY = jumpPower;
    jumpFrame = 0;
  }
  if (keyIsDown(DOWN_ARROW) && !isLightning && !isJumping && !isBooming) {
    isLightning = true;
    velocityY = jumpPower / 2; // 使用較小的力道
    lightningFrame = 0;
  }
  if (keyIsDown(32) && !isBooming && !isJumping && !isLightning) { // 32 是空白鍵
    isBooming = true;
    boomFrame = 0;
  }

  if (isJumping) {
    activeAnimation = jumpAnimation;
    currentAnimationLength = jumpFrameCount;
    characterY += velocityY;
    velocityY += gravity;

    // 當角色掉回或低於原始位置時，將其固定在原始位置
    if (characterY > originalY) {
      characterY = originalY;
      velocityY = 0;
    }

    // 更新並播放跳躍動畫
    if (frameCount % 8 === 0) { // 用較快的速度播放跳躍動畫
      jumpFrame++;
    }
    // 確保 currentFrame 不會超過動畫的最大索引
    currentFrame = min(jumpFrame, currentAnimationLength - 1);

    // 動畫結束且回到地面
    if (jumpFrame >= jumpFrameCount) {
      isJumping = false;
      characterY = originalY; // 重設回地面
      currentFrame = 0; // 重置影格，以便下一個動畫從頭開始
    }
  } else if (isLightning) {
    activeAnimation = lightningAnimation;
    currentAnimationLength = lightningFrameCount;
    characterY += velocityY;
    velocityY += gravity;

    // 更新並播放 lightning 動畫
    if (frameCount % 8 === 0) {
      lightningFrame++;
    }
    // 更新 currentFrame 以便繪製正確的影格
    currentFrame = min(lightningFrame, currentAnimationLength - 1); // 確保索引不超過範圍

    // 動畫結束且回到地面
    if (lightningFrame >= lightningFrameCount) { // 檢查動畫是否播放完畢
      isLightning = false;
      characterY = originalY; // 重設回地面
      currentFrame = 0; // 重置影格，以便下一個動畫從頭開始
    }
  } else if (isBooming) {
    activeAnimation = boomAnimation;
    currentAnimationLength = boomFrameCount;

    // 更新並播放 boom 動畫
    if (frameCount % 8 === 0) {
      boomFrame++;
    }
    // 確保 currentFrame 不會超過動畫的最大索引
    currentFrame = min(boomFrame, currentAnimationLength - 1);

    // 動畫結束且回到地面
    if (boomFrame >= boomFrameCount) {
      isBooming = false;
      characterY = originalY; // 重設回地面
      currentFrame = 0; // 重置影格，以便下一個動畫從頭開始
    }
  } else {
    // 處理左右移動和站立
    if (keyIsDown(RIGHT_ARROW)) {
      activeAnimation = rollAnimation; // 向右滾動
      if (currentAnimationLength !== rollFrameCount) currentFrame = 0; // 從別的動畫切換來，就重置
      currentAnimationLength = rollFrameCount;
      bgX -= characterSpeed;
      isFacingLeft = false;
      animationDirection = 1;
    } else if (keyIsDown(LEFT_ARROW)) {
      activeAnimation = rollAnimation; // 向左滾動
      if (currentAnimationLength !== rollFrameCount) currentFrame = 0; // 從別的動畫切換來，就重置
      currentAnimationLength = rollFrameCount;
      bgX += characterSpeed;
      isFacingLeft = true;
      animationDirection = -1; // 反向播放滾動
    } else {
      activeAnimation = stopAnimation; // 根據最後方向站立
      if (currentAnimationLength !== stopFrameCount) currentFrame = 0; // 從別的動畫切換來，就重置
      currentAnimationLength = stopFrameCount;
    }

    if (frameCount % 12 === 0) {
      if (activeAnimation === rollAnimation) {
        currentFrame = (currentFrame + animationDirection + currentAnimationLength) % currentAnimationLength;
      } else {
        currentFrame = (currentFrame + 1) % currentAnimationLength; // 其他動畫一律正向播放
      }
    }
  }

  // 繪製角色
  push();
  translate(characterX, characterY);
  if (isFacingLeft) {
    scale(-1, 1); // 水平翻轉
  }
  image(activeAnimation[currentFrame], 0, 0);
  pop();

  // --- 角色1的對話框邏輯 ---
  if (dialogueState === 1) {
    push();
    translate(characterX, characterY);
    const boxWidth = 200;
    const boxHeight = 40;

    fill(255, 255, 255, 200); // 半透明白色背景
    stroke(0); // 黑色邊框
    rectMode(CENTER);
    rect(0, boxHeight, boxWidth, boxHeight, 10); // 在角色下方繪製圓角矩形

    // 將實際的輸入框定位到對話框內部
    nameInput.size(boxWidth - 20, boxHeight - 10);
    nameInput.position(characterX - nameInput.width / 2, characterY + boxHeight - nameInput.height / 2);
    
    // 新增提示文字
    textSize(12);
    text("(請按 Enter 送出)", 0, boxHeight + 25);
    pop();
  }

  // --- 角色2的邏輯 (新版) ---
  let char2Animation;
  let isChar2Walking = false;

  // 1. 處理移動輸入
  if (keyIsDown(68)) { // D key
    isChar2Walking = true;
    isChar2FacingLeft = false;
    character2OffsetX += characterSpeed;
    bgX -= characterSpeed;
    characterX -= characterSpeed; // 讓角色1隨著背景反向移動，保持在原地
  } else if (keyIsDown(65)) { // A key
    isChar2Walking = true;
    isChar2FacingLeft = true;
    character2OffsetX -= characterSpeed;
    bgX += characterSpeed;
    characterX += characterSpeed; // 讓角色1隨著背景反向移動，保持在原地
  }

  // 2. 決定動畫狀態
  if (isChar2Walking) {
    char2Animation = walkAnimation2;
    if (frameCount % 6 === 0) { // Faster animation for walking
      currentFrame2 = (currentFrame2 + 1) % walkFrameCount2;
    }
  } else if (dialogueState === 1 || dialogueState === 2) {
    // 靜止且在對話中 -> 播放 drink 動畫
    char2Animation = drinkAnimation;
    if (frameCount % 10 === 0) { // Slower animation for drinking
      drinkFrame2 = (drinkFrame2 + 1) % drinkFrameCount;
    }
    currentFrame2 = drinkFrame2;
  } else {
    // 靜止且不在對話中 -> 播放 stop 動畫
    char2Animation = stopAnimation2;
    if (frameCount % 12 === 0) {
      currentFrame2 = (currentFrame2 + 1) % stopFrameCount2;
    }
  }

  // 3. 決定靜止時的朝向
  if (!isChar2Walking) {
    isChar2FacingLeft = characterX < character2X;
  }

  // 4. 計算垂直震動偏移量 (僅在走路或站立時)
  let char2OffsetY = 0;
  if (isChar2Walking) {
    const walkOffsets = [0, -5, -10, -5, 0, -5, -10, -5, 0, -5, -10, -5, 0, -5, -10, -5];
    if (currentFrame2 < walkOffsets.length) char2OffsetY = walkOffsets[currentFrame2];
  } else if (dialogueState === 0) { // 僅在閒置時呼吸
    const stopOffsets = [0, 0, 0, -2, -4, -2, 0, 0, 0, -2, -4, -2];
    if (currentFrame2 < stopOffsets.length) char2OffsetY = stopOffsets[currentFrame2];
  }

  // 5. 繪製角色
  push();
  translate(character2X, character2Y + char2OffsetY);

  // --- 角色2的提示邏輯 ---
  let distance2 = dist(characterX, characterY, character2X, character2Y);
  if (distance2 < triggerDistance && currentHint && currentHint.length > 0 && gameState === 'PLAYING') {
    const boxWidth = 200;
    const padding = 8;
    const maxTextWidth = boxWidth - padding * 2;
    textSize(16);
    textAlign(LEFT, TOP);

    const hintText = "提示：" + currentHint;
    const maxLines = 4;
    const lines = wrapTextToLines(hintText, maxTextWidth, maxLines);
    const lineHeight = Math.ceil(textAscent() + textDescent());
    const boxHeight = Math.max(40, lines.length * lineHeight + padding * 2);
    const boxY = -boxHeight - 40; // 在角色上方

    fill(255, 255, 180, 220); // 淡黃色背景
    stroke(0);
    rectMode(CENTER);
    rect(0, boxY, boxWidth, boxHeight, 10);

    fill(0);
    noStroke();
    const startX = -maxTextWidth / 2;
    let y = boxY - boxHeight / 2 + padding;
    for (let i = 0; i < lines.length; i++) {
      textAlign(LEFT, TOP);
      text(lines[i], startX, y);
      y += lineHeight;
    }
  }

  push();
  if (isChar2FacingLeft) {
    scale(-1, 1); // 水平翻轉
  }
  if (char2Animation && char2Animation[currentFrame2]) {
    image(char2Animation[currentFrame2], 0, 0);
  }
  pop();
  pop();

  // --- 角色3的邏輯 ---
  if (frameCount % 8 === 0) { // 用較快的速度播放
    currentFrame3 = (currentFrame3 + 1) % character3FrameCount;
  }

  // --- 角色3、角色4與角色5的互動邏輯 ---
  let distance3 = dist(characterX, characterY, character3X, character3Y);
  let distance4 = dist(characterX, characterY, character4X, character4Y);
  let distance5 = dist(characterX, characterY, character5X, character5Y);

  // --- 對話狀態管理 ---
  if (dialogueState === 0) {
    // 決定目前的目標 NPC (依序：角色3 -> 角色4 -> 角色5 輪流)
    let targetNPC = 0;
    if (correctAnswersCount < totalQs) {
      let turn = correctAnswersCount % 3;
      if (turn === 0) targetNPC = 3;
      else if (turn === 1) targetNPC = 4;
      else if (turn === 2) targetNPC = 5;
    }

    let distanceToTarget = Infinity;
    if (targetNPC === 3) distanceToTarget = distance3;
    else if (targetNPC === 4) {
      // 角色4在空中，需跳躍且距離夠近才能觸發
      if (isJumping) {
        distanceToTarget = dist(characterX, characterY, character4X, character4Y);
      } else {
        distanceToTarget = Infinity;
      }
    }
    else if (targetNPC === 5) distanceToTarget = distance5;

    // 狀態0: 閒置中，檢查是否接近目標 NPC
    if (distanceToTarget < triggerDistance && !hasChar2Triggered && targetNPC !== 0) {
      hasChar2Triggered = true; // 標記已觸發
      activeNPC = targetNPC;
      dialogueState = 1; // 進入詢問狀態
      nameInput.value(''); // 清空輸入框
      nameInput.show(); // 顯示輸入框
      nameInput.elt.focus(); // 讓輸入框自動獲得焦點
      
      // --- 如果還沒有活動中的問題，才從 CSV 隨機選題 ---
      if (!isQuestionActive) {
        // 依序選題：從洗牌後的順序中取出，確保不重複且隨機
        currentQuestionIndex = 0;
        if (questionOrder.length > 0) {
          let idx = correctAnswersCount % questionOrder.length;
          currentQuestionIndex = questionOrder[idx];
        }

        let useCSV = questionsTable && questionsTable.getRowCount() > 0;
        if (useCSV) {
          let row = questionsTable.getRow(currentQuestionIndex);
          currentQuestion = row.get('題目') || row.get('question') || row.get('Question') || "";
          currentAnswer = row.get('答案') || row.get('answer') || row.get('Answer') || "";
          currentCorrectFeedback = row.get('答對回饋') || row.get('correct') || row.get('Correct') || "答對了";
          currentWrongFeedback = row.get('答錯回饋') || row.get('wrong') || row.get('Wrong') || "答錯了";
          currentHint = row.get('提示') || row.get('hint') || row.get('Hint') || "";

          // 如果讀取到的題目是空的（例如 CSV 格式問題），則使用預設題目作為備案
          if (currentQuestion === "") {
            let defIndex = currentQuestionIndex % defaultQuestions.length;
            let defQ = defaultQuestions[defIndex];
            currentQuestion = defQ.q;
            currentAnswer = defQ.a;
            currentCorrectFeedback = defQ.correct;
            currentWrongFeedback = defQ.wrong;
            currentHint = defQ.hint;
          }
        } else {
          let q = defaultQuestions[currentQuestionIndex];
          currentQuestion = q.q;
          currentAnswer = q.a;
          currentCorrectFeedback = q.correct;
          currentWrongFeedback = q.wrong;
          currentHint = q.hint;
        }
        isQuestionActive = true;
      }
      lastQuestionTime = millis();
    }
  } else {
    // 狀態1或2: 正在對話或顯示回饋，檢查是否因距離太遠而取消
    let isTooFar = true;
    if (activeNPC === 3) {
      isTooFar = distance3 >= triggerDistance;
    } else if (activeNPC === 4) {
      // 角色4在空中，改為檢查水平距離，確保角色1在正下方(地面)時對話框不會消失
      isTooFar = abs(characterX - character4X) >= triggerDistance;
    } else if (activeNPC === 5) {
      isTooFar = distance5 >= triggerDistance;
    }

    if (isTooFar) {
      // 離當前對話的NPC太遠，結束對話
      dialogueState = 0;
      nameInput.hide();
      hasChar2Triggered = false;
      activeNPC = 0;
      isQuestionActive = false; // 修正：若中途離開對話，需重置狀態以確保下次對話能更新題目
    } else if (dialogueState === 2 && millis() - feedbackTimer >= feedbackDuration) {
      if (correctAnswersCount >= totalQs) {
        gameState = 'WIN';
        nameInput.hide();
        return;
      }

      if (isAnswerCorrect) {
        // 答對了：結束對話，準備前往下一個 NPC
        dialogueState = 0;
        hasChar2Triggered = false;
        activeNPC = 0;
        nameInput.hide();
        isQuestionActive = false; // 重置問題狀態，以便下一個 NPC 產生新題目
        currentHint = ""; // 清除提示
      } else {
        // 答錯了：保持對話狀態，讓玩家重試
        dialogueState = 1;
        nameInput.value('');
        nameInput.show();
        nameInput.elt.focus();
      }
    }
  }

  // --- 設定對話框文字 ---
  if (dialogueState === 1) {
    if (currentQuestion && currentQuestion.length > 0) {
      char2DialogueText = `(第${correctAnswersCount + 1}題) ${currentQuestion}`;
    } else {
      char2DialogueText = "請問你叫甚麼名字";
    }
  }

  push();
  // 讓角色3隨著動畫影格上下移動
  let char3OffsetY = 0;
  const jumpOffsets = [0, 0, -20, -50, -70, -50, -20, 0, 0]; // 對應9張圖的跳躍高度
  if (currentFrame3 < jumpOffsets.length) {
    char3OffsetY = jumpOffsets[currentFrame3];
  }
  translate(character3X, character3Y + char3OffsetY);

  push(); // 新增 push 以隔離角色翻轉對對話框的影響
  // 讓角色3面對角色1
  if (characterX < character3X) { // 如果角色1在角色3的左邊
    scale(-1, 1); // 角色3就向左翻轉
  }
  if (character3Animation[currentFrame3]) {
    image(character3Animation[currentFrame3], 0, 0);
  }
  pop(); // 恢復狀態，確保後續對話框文字不被翻轉

  // 如果正在對話，則在角色3上方繪製對話框
  if ((dialogueState === 1 || dialogueState === 2) && activeNPC === 3) {
    const boxWidth = 220;
    const padding = 8;
    const maxTextWidth = boxWidth - padding * 2;
    textSize(16);
    textAlign(LEFT, TOP);

    const maxLines = 4;
    const lines = wrapTextToLines(char2DialogueText, maxTextWidth, maxLines);
    const lineHeight = Math.ceil(textAscent() + textDescent());
    const boxHeight = Math.max(40, lines.length * lineHeight + padding * 2);
    const boxY = -boxHeight - 40 - 20; // 稍微再高一點，因為角色3在跳

    fill(255, 255, 255, 200);
    stroke(0);
    rectMode(CENTER);
    rect(0, boxY, boxWidth, boxHeight, 10);

    fill(0);
    noStroke();
    const startX = -maxTextWidth / 2;
    let y = boxY - boxHeight / 2 + padding;
    for (let i = 0; i < lines.length; i++) {
      textAlign(LEFT, TOP);
      text(lines[i], startX, y);
      y += lineHeight;
    }
  }
  pop();

  // --- 角色4的對話框邏輯 ---
  if ((dialogueState === 1 || dialogueState === 2) && activeNPC === 4) {
    push();
    let bobbing = sin(frameCount * 0.05) * 10;
    translate(character4X, character4Y + bobbing);

    const boxWidth = 220;
    const padding = 8;
    const maxTextWidth = boxWidth - padding * 2;
    textSize(16);
    textAlign(LEFT, TOP);

    const maxLines = 4;
    const lines = wrapTextToLines(char2DialogueText, maxTextWidth, maxLines);
    const lineHeight = Math.ceil(textAscent() + textDescent());
    const boxHeight = Math.max(40, lines.length * lineHeight + padding * 2);
    const boxY = -boxHeight - 40; // 在角色上方

    fill(255, 255, 255, 200);
    stroke(0);
    rectMode(CENTER);
    rect(0, boxY, boxWidth, boxHeight, 10);

    fill(0);
    noStroke();
    const startX = -maxTextWidth / 2;
    let y = boxY - boxHeight / 2 + padding;
    for (let i = 0; i < lines.length; i++) {
      textAlign(LEFT, TOP);
      text(lines[i], startX, y);
      y += lineHeight;
    }
    pop();
  }

  // --- 角色5的對話框邏輯 ---
  if ((dialogueState === 1 || dialogueState === 2) && activeNPC === 5) {
    push();
    translate(character5X, character5Y);

    const boxWidth = 220;
    const padding = 8;
    const maxTextWidth = boxWidth - padding * 2;
    textSize(16);
    textAlign(LEFT, TOP);

    const maxLines = 4;
    const lines = wrapTextToLines(char2DialogueText, maxTextWidth, maxLines);
    const lineHeight = Math.ceil(textAscent() + textDescent());
    const boxHeight = Math.max(40, lines.length * lineHeight + padding * 2);
    const boxY = -boxHeight - 40; // 在角色上方

    fill(255, 255, 255, 200);
    stroke(0);
    rectMode(CENTER);
    rect(0, boxY, boxWidth, boxHeight, 10);

    fill(0);
    noStroke();
    const startX = -maxTextWidth / 2;
    let y = boxY - boxHeight / 2 + padding;
    for (let i = 0; i < lines.length; i++) {
      textAlign(LEFT, TOP);
      text(lines[i], startX, y);
      y += lineHeight;
    }
    pop();
  }
  drawMenuInterface();
}

function keyPressed() {
  if (keyCode === ENTER && dialogueState === 1) {
    // 使用者輸入答案，與 currentAnswer 比對
    let userAnswer = (nameInput.value() || '').toString().trim();
    nameInput.hide();
    // 標準化比對（忽略大小寫與空白）
    let normalizedUser = userAnswer.toLowerCase();
    let normalizedAnswer = (currentAnswer || '').toString().trim().toLowerCase();
    if (normalizedUser === normalizedAnswer && normalizedAnswer !== '') {
      char2DialogueText = currentCorrectFeedback || '答對了！';
      correctAnswersCount++;
      isAnswerCorrect = true;
    } else {
      char2DialogueText = currentWrongFeedback || '答錯了！';
      isAnswerCorrect = false;
    }
    dialogueState = 2; // 顯示回饋
    feedbackTimer = millis();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (startButton) {
    startButton.position(width / 2 - 100, height / 2 + 40);
  }
  if (restartButton) {
    restartButton.position(width / 2 - 100, height / 2 + 120);
  }
  if (menuButton) menuButton.position(width - 70, 20);
  if (muteButton) muteButton.position(width - 70, 80);
  if (volumeSlider) volumeSlider.position(width - 220, 140);
  originalY = height * 0.85;
  character2Y = height * 0.85;
  character3Y = height * 0.85;
  character4Y = height * 0.65;
  character5Y = height * 0.85;
  if (!isJumping && !isLightning && !isBooming) {
    characterY = originalY;
  }
}

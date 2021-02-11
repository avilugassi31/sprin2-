'use strict';
var gImgs = [];
var gMeme = { lines: [] };
var gNextId = 0;
var gCurrImage;
var gFontSize = 15;
var gLineHeights = { upperText: 20, bottomText: 70, middleText: 45 };
let gKeyWords = { politics: 1, dog: 1, cute: 3, baby: 0, kid: 0, actor: 5 };
var gCurrKeyWord = 'all';

var gNextText;
const KEY = 'savedMemes';
var gReadyMemes = loadReadyMemes() ? loadReadyMemes() : [];

function getImgs() {
  if (gCurrKeyWord === 'all') return gImgs;
  else {
    var imgsToDisplay = gImgs.filter(function (img) {
      return img.keyWords.includes(gCurrKeyWord);
    });
    return imgsToDisplay;
  }
}

function getGkeyWords() {
  return gKeyWords;
}

function createImg(urlIdx, desc) {
  return {
    id: gNextId++,
    url: `imgs/${urlIdx}.jpg`,
    keyWords: desc,
  };
}
createImages();
function createImages() {
  var createdImgs = [
    createImg(1, ['politics', 'stupid']),
    createImg(2, ['dog', 'cute']),
    createImg(3, ['dog', 'cute', 'baby']),
    createImg(4, ['cat', 'cute']),
    createImg(5, ['baby', 'epic']),
    createImg(6, ['epic', 'aliens', 'history channel']),
    createImg(7, ['baby', 'cute']),
    createImg(8, ['willi wonka', 'cynical']),
    createImg(9, ['baby', 'evil']),
    createImg(10, ['politics', 'awsome']),
    createImg(11, ['sports', 'gay']),
    createImg(12, ['israeli']),
    createImg(13, ['actor', 'awsome']),
    createImg(14, ['actor', 'awsome', 'cynical']),
    createImg(15, ['actor', 'awsome', 'cynical']),
    createImg(16, ['actor', 'cynical']),
    createImg(17, ['politics']),
    createImg(18, ['toy story', 'awsome']),
  ];
  createdImgs.forEach(function (img) {
    gImgs.push(img);
  });
}
function getCurrKeyWord() {
  return gCurrKeyWord;
}
function getImgById(imgId) {
  imgId = +imgId;
  var currImg = gImgs.find(function(img) {
    return img.id === imgId;
  });
  return currImg;
}

function setMeme(imgId) {
  var currImg = getImgById(imgId);
  gMeme.selectedImgId = currImg.id;
  gMeme.selectedLineIdx = 0;
  gMeme.lines = [];
}
function getGmeme() {
  return gMeme;
}
function getFontSize() {
  var currMeme = getGmeme();
  return currMeme.lines[currMeme.selectedLineIdx].fontSize;
}
function resetMeme(imgId) {
  setMeme(imgId);
  gLineHeights = { upperText: 20, bottomText: 70 };
}
function getReadyMemes() {
  return gReadyMemes;
}

// clear ,load and svae functions localstorage - not working properly:need to be fixed;
function saveMeme(readyMeme) {
  saveToStorage(KEY, readyMeme);
}
function loadReadyMemes() {
  return loadFromStorage(KEY);
}

function deleteMemeFromStorage(meme) {
  console.log(meme);
  var readyMemes = getReadyMemes();
  var relevantIdx = readyMemes.findIndex((readyMeme) => {
    return readyMeme === meme;
  });
  readyMemes.splice(relevantIdx, 1);
  saveMeme(readyMemes);
}

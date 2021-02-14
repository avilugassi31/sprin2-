'use strict';
var gImgs = [];
var gMeme = { lines: [] };
var gNextId = 0;
var gCurrImage;
var gFontSize = 15;
var gLineHeights = { upperText: 20, bottomText: 70 };
var gKeyWords = {
  politics: 'politics',
  dog: 'dog',
  cute: 'cute',
  baby: 'baby',
  kid: 'kid',
  actor: 'actor',
};
var gCurrKeyWord = 'all';

var gNextText;
const KEY = 'savedMemes';
var gReadyMemes = loadReadyMemes() ? loadReadyMemes() : []; // i take that short if from google.

// variables for selected value:
var gToyKeywords = [];
var gPoliticKeywords = [];
var gTvKeywords = [];
var gAnimalKeywords = [];
var gBabyKeywords = [];
var gOtherKeywords = [];

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
    createImg(1, ['politics']),
    createImg(2, ['animals']),
    createImg(3, ['animals']),
    createImg(4, ['animals']),
    createImg(5, ['baby']),
    createImg(6, ['tv']),
    createImg(7, ['baby']),
    createImg(8, ['tv']),
    createImg(9, ['baby']),
    createImg(10, ['politics']),
    createImg(11, ['other']),
    createImg(12, ['tv']),
    createImg(13, ['tv']),
    createImg(14, ['tv']),
    createImg(15, ['tv']),
    createImg(16, ['tv']),
    createImg(17, ['politics']),
    createImg(18, ['other']),
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
  var currImg = gImgs.find(function (img) {
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

function getGPolitics() {
  return gPoliticKeywords;
}
function getGtv() {
  return gTvKeywords;
}
function getGanimals() {
  return gAnimalKeywords;
}
function getGbaby() {
  return gBabyKeywords;
}
function getGother() {
  return gOtherKeywords;
}

// load and svae functions localstorage - not working properly:need to be fixed;
function saveMeme(readyMeme) {
  saveToStorage(KEY, readyMeme);
}
function loadReadyMemes() {
  return loadFromStorage(KEY);
}

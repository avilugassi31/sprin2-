'use strict';
var gCurrKeyWord;
var gCurrImg;
function init() {
  renderImgs();
  var elBody = document.querySelector('body');
  if (elBody.classList.contains('menu-open'))
    elBody.classList.remove('menu-open');
}
function renderImgs() {
  var elImgsCont = document.querySelector('.imgs-container');
  var imgs = getImgs();
  var strHtml1 = `<div class="templates ">`;
  var strHtml2 = imgs.map(function (img) {
    return `
        <a onclick="renderMemeGenerator(${img.id})">
        <img class="template-${img.id}" id=${img.id} src="${img.url}" alt="template-${img.id}
         onclick="renderMemeGenerator(this)"></a>
    `;
  });
  var strHtml = strHtml1 + strHtml2.join('') + `</div>`;
  elImgsCont.innerHTML = strHtml;
}
// function getImagesByKeyword() {
//    gCurrKeyWord = getGkeyWords();
//    console.log('gCurrKeyWord:', gCurrKeyWord)
//  if (gCurrKeyWord === 'politics') {
//    return
//  }

// }

function renderMemeGenerator(imgId) {
  var currImgDetails = getImgById(imgId);
  var currImg = document.querySelector(`.template-${currImgDetails.id}`);
  setMeme(imgId);
  var elImgsCont = document.querySelector('.imgs-container');
  elImgsCont.innerHTML = '';
  elImgsCont.innerHTML = ` <div class="generator-page" >

    <div class ="canvas-container">
 

    <canvas id="meme-canvas" width= "400" height="400" style="outline: 3px dashed aqua"></canvas>
    </div>

    <section class ="meme-edit-tools flex column align-items">

    <label for="meme-text"></label>
    <input type="text" id="meme-text" class="-input" placeholder="enter meme text:" oninput="updateMemeTemplate(event)" >
    <label for="font-size"></label>
    <div class="btns-container">
    <div class="basic-btns flex space-between">
    <input type="image" class="font-input" src="icons/7.png" onclick="switchLines()">
    <input type="image" class="font-input" src="icons/8.png" onclick="deleteText(${imgId})" >
    <input type="image" class="font-input" src="icons/9.png"onclick="addTextLine(event)" >
    </div>
    <label for="font-size"></label>
    <div class="secondery-btns flex space-between">
    <input type="image" class="font-input" src="icons/1.png" onclick="changeFontSize(event,false)">
    <input type="image" class="font-input" src="icons/2.png" onclick="changeFontSize(event,true)">
    <input type="image" class="font-input" src="icons/4.svg" onclick=" changeTextPosition(${true})">
    <input type="image" class="font-input" src="icons/5.svg" onclick=" changeTextPosition(${false})">
    <div class= color-pick>
    <input type="color" class="font-input color-picker" onchange="changeTextColor()">
    </div>
    </div>
    <div class="text-alignment">
    <label for="cars">Choose a font:</label>
  <select name="fonts" id="fonts" ">
    <option value="Cursive">Cursive</option>
    <option value="Impact">Impact</option>
     <option value="Monospace">Monospace</option>
      <option value="Arial">Arial</option>
    
    
  </select>
    </div>
    <div class="meme-done-btns">
    <a href="#" onclick="downloadCanvas(this)" download="my-meme.jpg">
    <button class="meme-done-btn">Download</button>
    </a>  
    <button class="meme-done-btn" onclick="onSaveMeme()">Save</button> 
    <button class="meme-done-btn" type="submit">Share</button>
    <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" />
    <form action="" method="POST" enctype="multipart/form-data" onsubmit="uploadImg(this, event)">
      <input name="img" id="imgData" type="hidden" />
       
      <div class="share-container"></div>
    </form>
    
    </div>
    </div>
    
    </section>
</div>
`;

  drawImg(currImg);
  gCurrImage = currImg;
}
function renderReadyMemes() {
  var elBody = document.querySelector('body');
  if (elBody.classList.contains('menu-open'))
    elBody.classList.remove('menu-open'); // based on css visability - can be hidden as well
  var readyMemes = getReadyMemes();
  var elImgsCont = document.querySelector('.imgs-container');
  elImgsCont.innerHTML = '';
  var strHtml1 = `
    <div class ="ready-memes templates">`;
  var strHtml2 = readyMemes.map(function (meme) {
    return `
        <div class="readyMeme">
        <a herf = "" onclick ="openReadyMeme('${meme}')" >
        <img src="${meme}"  >
        </div></a>
    `;
  });
  elImgsCont.innerHTML = strHtml1 + strHtml2.join('') + `</div> </div> `;
}

function drawImg(image) {
  var canvas = document.querySelector('#meme-canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  ctx.fill();
}

function updateMemeTemplate(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  var currMeme = getGmeme();
  if (currMeme.selectedLineIdx === 2) return;
  var elText = document.querySelector('#meme-text').value;

  if (currMeme.lines[currMeme.selectedLineIdx] === undefined) {
    currMeme.lines.push({
      text: elText,
      fontSize: gFontSize,
    });
  } else {
    currMeme.lines[currMeme.selectedLineIdx].text = elText;
  }
  renderUpdatedMeme(true);
}
function myFunction() {
  var keywords = getGkeyWords();
  console.log('keywords:', keywords);
  var input = document.getElementById('myInput').value;
  if (input === keywords.value) {
    console.log('hello');
  }
}

function setTextDetails(lineIdx) {
  var currMeme = getGmeme();
  var canvas = document.querySelector('#meme-canvas');
  var ctx = canvas.getContext('2d');
  currMeme.selectedLineIdx = lineIdx;
  var elChangedFont = document.querySelector('#fonts').value;
  console.log('elChangedFont:', elChangedFont);
  var fontSize =
    canvas.width / currMeme.lines[currMeme.selectedLineIdx].fontSize + 20;
  var textColor = currMeme.lines[currMeme.selectedLineIdx].color;
  // basedon stav inClass Code
  ctx.font = fontSize + 'px ' + elChangedFont;
  ctx.fillStyle = textColor ? textColor : 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = fontSize / 15;
  ctx.textBaseLine = 'top';
  ctx.textAlign = 'center';
}
function printMemeText(lineidx) {
  var currMeme = getGmeme();
  var canvas = document.querySelector('#meme-canvas');
  var ctx = canvas.getContext('2d');
  var sizeHelper = canvas.width / 15;
  var lineHeight;
  currMeme.selectedLineIdx = lineidx;
  //  the IF For how to fill the text and the color inside :
  if (currMeme.selectedLineIdx === 1) {
    currMeme.lines[currMeme.selectedLineIdx].lineHeight =
      gLineHeights.bottomText;
    lineHeight = currMeme.lines[currMeme.selectedLineIdx].lineHeight;
    ctx.fillText(
      currMeme.lines[currMeme.selectedLineIdx].text,
      canvas.width / 2,
      canvas.height - lineHeight,
      canvas.width
    );
    ctx.strokeText(
      currMeme.lines[currMeme.selectedLineIdx].text,
      canvas.width / 2,
      canvas.height - lineHeight,
      canvas.width
    );
  }
  if (currMeme.selectedLineIdx === 0) {
    currMeme.lines[currMeme.selectedLineIdx].lineHeight =
      gLineHeights.upperText;
    lineHeight = currMeme.lines[currMeme.selectedLineIdx].lineHeight;
    ctx.fillText(
      currMeme.lines[currMeme.selectedLineIdx].text,
      canvas.width / 2,
      sizeHelper + lineHeight,
      canvas.width
    );
    ctx.strokeText(
      currMeme.lines[currMeme.selectedLineIdx].text,
      canvas.width / 2,
      sizeHelper + lineHeight,
      canvas.width
    );
  }
}
function renderUpdatedMeme(renderBothLines = false) {
  // i got that way of default boolean from MDN:
  var currMeme = getGmeme();
  var canvas = document.querySelector('#meme-canvas');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImg(gCurrImage);
  if (currMeme.selectedLineIdx === 0) {
    setTextDetails(0);
    printMemeText(0);
    return;
  }
  if (currMeme.selectedLineIdx === 1) {
    if (renderBothLines) {
      setTextDetails(0);
      printMemeText(0);
    }

    setTextDetails(1);
    printMemeText(1);
    return;
  }
}

// function chngeFont(font) {
//   // console.log('font:', font);
//   var fontStyle = document.querySelector('select').value;
//   var currMeme = getGmeme();
//   var canvas = document.querySelector('#meme-canvas');
//   var ctx = canvas.getContext('2d');
//   font = fontStyle;
//   console.log('font:', font);
//   var fontSize =
//     canvas.width / currMeme.lines[currMeme.selectedLineIdx].fontSize;
//   if (font.value === 'Cursive') {
//     console.log('font:', font);
//     ctx.font = fontSize + 'px Cursive';
//   } else if (font.value === 'Monospace') {
//     ctx.font = fontSize + 'px Monospace';
//   }
//   renderUpdatedMeme(true);
// }
function changeFontSize(ev, value) {
  var currMeme = getGmeme();
  var canvas = document.querySelector('#meme-canvas');
  var ctx = canvas.getContext('2d');
  ev.stopPropagation();
  ev.preventDefault();
  var currFontSize = gMeme.lines[currMeme.selectedLineIdx].fontSize;
  if (value) {
    if (currFontSize < 25) currMeme.lines[currMeme.selectedLineIdx].fontSize++;
  } else if (currFontSize > 10)
    currMeme.lines[currMeme.selectedLineIdx].fontSize--;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImg(gCurrImage);
  renderUpdatedMeme(true); // render both lines of text inside canvas
}
function addTextLine(ev) {
  ev.preventDefault();
  var currMeme = getGmeme();
  if (currMeme.selectedLineIdx === 2) return;
  currMeme.selectedLineIdx++;
  document.querySelector('#meme-text').value = '';
}
function switchLines() {
  var currMeme = getGmeme();
  var canvas = document.querySelector('#meme-canvas');
  if (currMeme.selectedLineIdx > 1) return;
  var pivotValue = gLineHeights.upperText;
  gLineHeights.upperText = canvas.width - gLineHeights.bottomText - 30;
  gLineHeights.bottomText = canvas.width - pivotValue - 30;
  drawImg(gCurrImage);
  updateMemeTemplate(event);
}

function changeTextPosition(value) {
  var currMeme = getGmeme();
  if (currMeme.selectedLineIdx >= 2) return;

  var canvas = document.querySelector('#meme-canvas');
  var ctx = canvas.getContext('2d');
  if (currMeme.selectedLineIdx === 0) {
    if (value) gLineHeights.upperText -= 5;
    else gLineHeights.upperText += 5;
  }
  if (currMeme.selectedLineIdx === 1) {
    if (value) gLineHeights.bottomText += 5;
    else gLineHeights.bottomText -= 5;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImg(gCurrImage);
  renderUpdatedMeme(true);
}
function changeTextColor() {
  var currMeme = getGmeme();
  var newColor = document.querySelector('.color-picker').value;
  currMeme.lines[currMeme.selectedLineIdx].color = newColor;
  renderUpdatedMeme(true);
}
function deleteText(imgId) {
  resetMeme(imgId);
  drawImg(gCurrImage);
}
function downloadCanvas(elLink) {
  // based on Stav inClass code:
  console.log('elLink:', elLink);
  var canvas = document.querySelector('#meme-canvas');
  var imgContent = canvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

function onSaveMeme() {
  // not working properly need to be fixed if there is enough time;
  var canvas = document.querySelector('#meme-canvas');
  var readyMemes = getReadyMemes();
  readyMemes.push(canvas.toDataURL('img.png'));
  saveToStorage(KEY, readyMemes);
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}

function toggleScreen() {
  document.body.classList.remove('menu-open');
}

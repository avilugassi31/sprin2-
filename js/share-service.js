'use strict';

function loadImageFromInput(ev, onImageReady) {
  document.querySelector('.share-container').innerHTML = '';
  var reader = new FileReader();
  reader.onload = function (event) {
    var img = new Image();
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
    gImgs = img;
  };
  reader.readAsDataURL(ev.target.files[0]);
}
// Based on Stav inClass Code;
function uploadImg(elForm, ev) {
  ev.preventDefault();
  var gElCanvas = document.querySelector('#meme-canvas');
  console.log(gElCanvas);
  document.getElementById('imgData').value = gElCanvas.toDataURL('image/jpeg');
  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    console.log('uploadedImgUrl:', uploadedImgUrl);
    document.querySelector('.share-container').innerHTML = `
        <button><a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a></button>`;
  }
  doUploadImg(elForm, onSuccess);
}
function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then(function (res) {
      console.log(res);
      return res.text();
    })
    .then(onSuccess)
    .catch(function (err) {
      console.error(err);
    });
}
function onImgInput(ev) {
  loadImageFromInput(ev, renderImg);
}
function renderImg(img) {
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}



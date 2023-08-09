import './style.css'

let inputEl = document.getElementById('qr-input');
let canvasEl = document.getElementById('qr-canvas');
let downloadBtn = document.getElementById('download-btn');
let printBtn = document.getElementById('print-btn');
let titleEl = document.getElementById('title'); 

function updateQRCode() {
  if (inputEl.value.trim() === '') {
    canvasEl.width = 0;
    titleEl.textContent = '';
    downloadBtn.disabled = true;
    printBtn.disabled = true;
  } else {
    var qr = new QRious({
      element: canvasEl,
      value: inputEl.value,
      size: 100,
      level: 'H',
      background: '#fff',
      foreground: '#333'
    });
    titleEl.textContent = inputEl.value;
    downloadBtn.disabled = false;
    printBtn.disabled = false;
  }
}

inputEl.addEventListener('input', updateQRCode);

downloadBtn.addEventListener('click', function() {
  var canvas = document.createElement('canvas');
  canvas.width = canvasEl.width;
  canvas.height = canvasEl.height + 20; // incrementa al aumentar el texto
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText(inputEl.value, canvas.width/2, 15); // position the text above the QR code
  ctx.drawImage(canvasEl, 0, 20); // posicion del QR debajo del texto
  var link = document.createElement('a');
  link.download = inputEl.value + '.png';
  link.href = canvas.toDataURL();
  link.click();
});


printBtn.addEventListener('click', function() {
  var canvas = document.createElement('canvas');
  canvas.width = canvasEl.width;
  canvas.height = canvasEl.height + 20; // Se eincrementa al ir agregando mas texto 
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#333';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(inputEl.value, canvas.width/2, 15); // posicion del texto entre la imagen del codigo QR
  ctx.drawImage(canvasEl, 0, 20) // Posision de la imagen del QR debajo del texto de lo que contiene
  var printWindow = window.open();
  printWindow.document.write('<div><img src="' + canvas.toDataURL() + '" onload="window.print()"></div>');
  printWindow.document.close();
});

updateQRCode();
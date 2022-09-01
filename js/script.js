let imgBlobUrl;

const file = document.getElementById('file');
const img = document.getElementById('img-raw');
const compressTimes = document.getElementById('compress-times');
const defaultCompressTimes = compressTimes.value | 0;
const canvas = document.getElementById('canvas');
//const button = document.querySelector('button');
const boundingRect = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');
const canvas_w = boundingRect.width;
const canvas_h = boundingRect.height;


function matchImgSizeToCanvas(imgElem = img) {
    let w = imgElem.width;
    let h = imgElem.height;

    if (w > canvas_w || h > canvas_h) {
        let radio = Math.max(h / canvas_h, w / canvas_w);

        radio = Number(radio.toFixed(2));
        imgElem.width = parseInt(w / radio);
        imgElem.height = parseInt(h / radio);

    }

}


function run() {
    let ct = parseInt(compressTimes.value) || defaultCompressTimes;

    canvas.width = parseInt(canvas_w / ct);
    canvas.height = parseInt(canvas_h / ct);
    ctx.drawImage(img, 0, 0, parseInt(img.width / ct), parseInt(img.height / ct));
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas_w, canvas_h);
}

function reset() {
    img.removeAttribute('width');
    img.removeAttribute('height');

    cleanCanvas();
    matchImgSizeToCanvas(img);
    run();

}

file.addEventListener('change', function (e) {

    const picFile = this.files[0];

    window.URL.revokeObjectURL(imgBlobUrl);
    imgBlobUrl = window.URL.createObjectURL(picFile);

    img.onload = function init() {
        reset();
    }

    img.src = imgBlobUrl;

}, false);
//button.addEventListener('click', reset, false);
//compressTimes.addEventListener('change', reset, false);

compressTimes.addEventListener('input', reset);

const API_URL = 'https://picsum.photos/';
const BIG_SIZE = '600/400';
const SMALL_SIZE = '60';
const LEFT = 37;
const RIGHT = 39;
const IMAGES = [
  '?image=1080',
  '?image=1079',
  '?image=1069',
  '?image=1063',
  '?image=1050',
  '?image=1039'
];

const previews = $("#slider .slider-previews");

// draw previews
$.each(IMAGES, function (i, img) {
  previews.append(`<li><img src="${API_URL}${SMALL_SIZE}/${img}"
   alt="0" getimg="${img}"></li>`);
});

// preview click processing
$("li img").click(function () {
  let attr = $(this).attr('getimg');
  drawImage(attr);
});

// processing arrow keys left and right 
$(window).keyup(event, () => {
  let attr = nextImage(event.which);
  if (attr) {
    drawImage(attr);
  }
});

//removes the current border and draw border a new picture parent with the attribute passed
function drawBorder(attr) {
  $('.current').removeClass('current');
  $(`img[getimg="${attr}"]`).parent().addClass('current');
   
}
//finds a next or prevent picture from the current
function nextImage(key) {
  let currAttr = $('#slider .slider-current img').attr('getimg');

  let index = $.inArray(currAttr, IMAGES);
  if (key == LEFT) {
    index--;
  } else if (key == RIGHT) {
    index++;
  } else {
    return false;
  }

  if (index < 0) {
    return IMAGES[IMAGES.length - 1];
  }
  if (index >= IMAGES.length) {
    return IMAGES[0];
  }
  return IMAGES[index];
}

//draws a picture with the attribute passed
function drawImage(attr) {
  $('.slider-current img').attr('src', `${API_URL}${BIG_SIZE}/${attr}`);
  $('.slider-current img').attr('getimg', attr);
  drawBorder(attr);
}
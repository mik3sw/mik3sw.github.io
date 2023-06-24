window.addEventListener('scroll', function() {
  var sections = document.querySelectorAll('section');
  var navLinks = document.querySelectorAll('.navbar-item a');

  var currentSection = '';
  sections.forEach(function(section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - sectionHeight / 2) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(function(link) {
    link.classList.remove('selected');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('selected');
    }
  });
});






const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');


let initialScrollY = 0;
//initialScrollY = window.scrollY;


// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
    TweenMax.to($bigBall, .4, {
      x: e.pageX - 15,
      y: e.pageY - 15 - (window.scrollY - initialScrollY)
    });
  
    TweenMax.to($smallBall, .1, {
      x: e.pageX - 5,
      y: e.pageY - 7 - (window.scrollY - initialScrollY)
    });
  }
  

// Hover an element
function onMouseHover() {
  TweenMax.to($bigBall, .3, {
    scale: 4 });

}
function onMouseHoverOut() {
  TweenMax.to($bigBall, .3, {
    scale: 1 });

}


const $sectionCursor = document.querySelector('.works');
$sectionCursor.addEventListener('mousemove', onMouseMove);
  
  
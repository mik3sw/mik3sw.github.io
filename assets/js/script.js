//document.querySelector('.tumbler__wrapper').addEventListener('click', _ => document.body.classList.toggle('night-mode'));
AOS.init();




//document.body.classList.toggle('night-mode')
//document.getElementById("dark_toggle_1").style.display = "none";
//document.getElementById("dark_toggle_2").style.display = "flex";


document.getElementById('dark_toggle_1').addEventListener('click', () => {
    document.body.classList.toggle('night-mode')
    document.getElementById("dark_toggle_1").style.display = "none";
    document.getElementById("dark_toggle_2").style.display = "flex";
    document.getElementById("btn35").classList.add('button-35-dark');
    document.getElementById("btn35").classList.remove('button-35-light');

});


document.getElementById('dark_toggle_2').addEventListener('click', () => {
    document.body.classList.toggle('night-mode')
    document.getElementById("dark_toggle_2").style.display = "none";
    document.getElementById("dark_toggle_1").style.display = "flex";
    document.getElementById("btn35").classList.add('button-35-light');
    document.getElementById("btn35").classList.remove('button-35-dark');


});


const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Developer", "Freelancer", "Open sourcerer", "Linux user"];
const colorArray = ["#3a8bc9", "#e09a43", "#ff4b19", "#4ca33b"]
const typingDelay = 50;
const erasingDelay = 50;
const newTextDelay = 1500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    document.getElementById("tt").style.color = colorArray[textArrayIndex];
    document.getElementById("tt").classList.add("t"+(textArrayIndex+1));
    if(textArrayIndex===0){
      document.getElementById("tt").classList.remove("t4");
    }
    else{
      //console.log("provo a rimuovere: t"+textArrayIndex)
      document.getElementById("tt").classList.remove("t"+textArrayIndex);
    }
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

//document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
//  if(textArray.length) setTimeout(type, newTextDelay + 250);
//});
textArray1 = ["Developer"];
charIndex1 = 0
function type_start() {
    if (charIndex1 < textArray1[textArrayIndex].length) {
      //document.getElementById("tt1").style.color = "orange";
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray1[textArrayIndex].charAt(charIndex1);
      charIndex1++;
      setTimeout(type_start, typingDelay);
    } 
    else {
      cursorSpan.classList.remove("typing");
        //setTimeout(erase, newTextDelay);
    }
  }

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  type();
});





const barOuter = document.querySelector(".bar-outer");
const options = document.querySelectorAll(".bar-grey .option");
let current = 1;





options.forEach((option, i) => (option.index = i + 1));
options.forEach(option => option.addEventListener("click", function() {
    barOuter.className = "bar-outer";
    barOuter.classList.add("pos"+option.index);

    if (option.index > current) {
        barOuter.classList.add("right");
    } else if (option.index < current) {
        barOuter.classList.add("left");
    }
    current = option.index;
    currentm = option.index;

    if(current === 1){
      //document.getElementById("main-title").scrollIntoView({behavior: 'smooth'});
      //$(window).scrollTop({top: 0, behavior: 'smooth'});
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    if(current === 2){
      document.getElementById("skills").scrollIntoView({behavior: 'smooth'});
    }
    if(current === 3){
      document.getElementById("works").scrollIntoView({behavior: 'smooth'});
    }

}));





$(document).ready(function(){
  $(window).on('scroll', function(){
    if ($(window).scrollTop()) {
      $("header").addClass('bgc-dark');
    }else{
      $("header").removeClass('bgc-dark');
  }
  });
});



const circle = document.getElementById('circle');
const circleStyle = circle.style;

document.addEventListener('mousemove', e => {
  window.requestAnimationFrame(() => {
    circleStyle.top = `${ e.clientY - circle.offsetHeight/2 }px`;
    circleStyle.left = `${ e.clientX - circle.offsetWidth/2 }px`;
  });
});
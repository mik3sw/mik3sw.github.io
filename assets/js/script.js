document.body.classList.toggle("dark-mode");
document.getElementById("btn-light").style.display = "none";

let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}
let timeouts = [],
    intervals = [];

const magic = document.querySelector(".magic");

magic.onmouseenter = () => {
  let index = 1;
  
  for(const star of document.getElementsByClassName("magic-star")) {
    timeouts.push(setTimeout(() => {  
      animate(star);
      
      intervals.push(setInterval(() => animate(star), 1000));
    }, index++ * 300));
  };
}

magic.onmouseleave = onMouseLeave = () => {
  for(const t of timeouts) clearTimeout(t);  
  for(const i of intervals) clearInterval(i);
  
  timeouts = [];
  intervals = [];
}
/*
for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}*/

/* -- ↓↓↓ If you want the sparkle effect to only occur on hover, replace lines 16 and on with this code ↓↓↓ -- */

// let timeouts = [],
//     intervals = [];

// const magic = document.querySelector(".magic");

// magic.onmouseenter = () => {
//   let index = 1;
  
//   for(const star of document.getElementsByClassName("magic-star")) {
//     timeouts.push(setTimeout(() => {  
//       animate(star);
      
//       intervals.push(setInterval(() => animate(star), 1000));
//     }, index++ * 300));
//   };
// }

// magic.onmouseleave = onMouseLeave = () => {
//   for(const t of timeouts) clearTimeout(t);  
//   for(const i of intervals) clearInterval(i);
  
//   timeouts = [];
//   intervals = [];
// }


$(function(){
  $('button.dir').click(function(){
      const $self = $(this);
      $self.toggleClass('open');
      $self.find('i.fa:first').toggleClass('fa-caret-right fa-caret-down');
      $self.next().toggle(200);
  });
});



function showPrj(project){
  if(project=='OneClick'){
    document.getElementById('OneClick').style.display = "block"
    document.getElementById('SkinDetection').style.display = "none"
    document.getElementById('TgBot').style.display = "none"
  }
  if(project=='SkinDetection'){
    document.getElementById('OneClick').style.display = "none"
    document.getElementById('SkinDetection').style.display = "block"
    document.getElementById('TgBot').style.display = "none"
  }
  if(project=='TgBot'){
    document.getElementById('OneClick').style.display = "none"
    document.getElementById('SkinDetection').style.display = "none"
    document.getElementById('TgBot').style.display = "block"
  }
}

var isDark = true;
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

function darkModeToggle() {
  var element = document.body;
  if(isDark){
    audio.play();
    isDark = !isDark;
    document.getElementById("btn-light").style.display = "block";
    document.getElementById("btn-dark").style.display = "none";
    document.getElementById("cvbtn").style.color = "black";
    element.classList.remove("dark-mode");
    element.classList.toggle("light-mode");
    document.querySelector(':root').style.setProperty("--primary-color", "#8983ff");
    document.querySelector(':root').style.setProperty("--secondary-color", "#b270ec");
    document.getElementById("footer").style.backgroundColor = "#cecece";
    
    //document.querySelector(':root').style.setProperty("--link-color", "rgb(85, 85, 85)")
    
    
  }
  else{
    audio.play();
    isDark = !isDark;
    document.getElementById("btn-light").style.display = "none";
    document.getElementById("btn-dark").style.display = "block";
    document.getElementById("cvbtn").style.color = "white";
    element.classList.remove("light-mode");
    element.classList.toggle("dark-mode");
    document.querySelector(':root').style.setProperty("--primary-color", "#6C63FF");
    document.querySelector(':root').style.setProperty("--secondary-color", "#784BA0");
    document.getElementById("footer").style.backgroundColor = "#202020";
    //document.querySelector(':root').style.setProperty("--link-color", "rgb(150, 150, 150)")
  }
  
}
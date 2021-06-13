'use strict';
console.log('Initiation');

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
     console.log(event);

    const activeLinks = document.querySelectorAll('.titles a.active');
  
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  console.log('clickedElement:', clickedElement);

  const activeArticles = document.querySelectorAll('.posts article.active');
  
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

clickedElement.classList.add('active');

const articleSelector = clickedElement.getAttribute("href");
console.log("wartość articleSelector to: " + articleSelector);
  

const articleId = articleSelector.replace('#','');
console.log("wartość POPRAWIONA articleId to: " + articleId);

 
 
const targetArticle = document.querySelector(`[id='${articleId}']`);
targetArticle.classList.add('active');

  
  
    
}





const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}    



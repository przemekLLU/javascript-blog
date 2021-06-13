'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');
  
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
  
    const activeArticles = document.querySelectorAll('.posts article.active');
  
    for(let activeArticle of activeArticles){
         activeArticle.classList.remove('active');
    }

    clickedElement.classList.add('active');
    const articleSelector = clickedElement.getAttribute("href");
    const articleId = articleSelector.replace('#','');
    const targetArticle = document.querySelector(`[id='${articleId}']`);
    targetArticle.classList.add('active');   
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}    



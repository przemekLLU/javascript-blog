//'use strict';
// Module first, adding classes, opening articles
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');
  
    for(let activeLink of activeLinks){ // delete active
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

//SECOND MODULE

const optArticleSelector = '.post';
const  optTitleSelector = '.post-title';
const  optTitleListSelector = '.titles';

function generateTitleLinks(){
    const titleList = (document.querySelector(optTitleListSelector)).innerHTML = '';
    const articles = document.querySelectorAll('.post');
    let html = '';

    for(let article of articles){
        const articleId = article.getAttribute('id');
        const articleTitle = (article.querySelector(optTitleSelector)).innerHTML;
        const linkHTML = '<li><a href="#' + articleId+'"><span>' + articleTitle +'</span></a></li>';        
        html = html + linkHTML;
    } 
    let listInsertPoint = document.getElementById('linkTitleList');
    listInsertPoint.insertAdjacentHTML('afterbegin',html);
}
generateTitleLinks();

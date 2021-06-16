'use strict';

//SECOND MODULE

//const optArticleSelector = '.post';
const  optTitleSelector = '.post-title';
//const  optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
    //const titleList = (document.querySelector(optTitleListSelector)).innerHTML = '';
    const articles = document.querySelectorAll('.post');
    let html = '';

    for(let article of articles){
        const articleId = article.getAttribute('id');
        const articleTitle = (article.querySelector(optTitleSelector)).innerHTML;
        const linkHTML = '<li><a href="#' + articleId+'"><span>' + articleTitle +'</span></a></li>';        
        html = html + linkHTML;
    } 
    let listInsertPoint = document.getElementById('link-title-list');
    listInsertPoint.insertAdjacentHTML('afterbegin',html);
}
generateTitleLinks();


// FIRST MODULE, adding classes, opening articles
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
    const articleSelector = clickedElement.getAttribute('href');
    const articleId = articleSelector.replace('#','');
    const targetArticle = document.querySelector(`[id='${articleId}']`);
    targetArticle.classList.add('active');   
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}    


//THIRD MODULE generating tags

function generateTags(){
    const articles = document.querySelectorAll('.post');
    let html = '';

    for(let article of articles){
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray);
        
        for (let tag of articleTagsArray)
        {
            const tagHTML = '<li><a href="#tag-' + tag +'"><span>' + tag +'</span></a></li>';  
            html = html + tagHTML;
        }  
        
    } 
    console.log(html);
    let tagInsertPoint = document.getElementById('tag-list');
    tagInsertPoint.insertAdjacentHTML('beforeend',html);
  }
  generateTags();
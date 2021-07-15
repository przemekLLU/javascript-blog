'use strict';

//SECOND MODULE

const  optTitleSelector = '.post-title';
const optArticleSelector = '.post';
const optTagsListSelector = '.tags.list';
//const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
generateTitleLinks(); //END OF SECOND MODULE

//THIRD MODULE generating tags

function generateTags() {
    const articles = document.querySelectorAll('.post');
    let allTags = {};
    let allTagsHTML ='';
    
    for(let article of articles) {
        let html = '';
        let tagHTML ='';
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        for (let tag of articleTagsArray) {
            tagHTML = '<li><a class="tag-link active" href="#tag-' + tag +'"><span>' + tag +'</span></a></li>'+ ' ';
            html = html + tagHTML;
            // eslint-disable-next-line no-prototype-builtins
            if (!allTags.hasOwnProperty(tag))   {
                allTags[tag] =1;
            }   else    {
                allTags[tag]++;
            }
            allTagsHTML += tagHTML + ' (' + allTags[tag] + ')';
        }
        const tagsElement = article.querySelector('.list.list-horizontal');
        tagsElement.innerHTML = html;
    }    
    console.log('allTagsHTML', allTagsHTML);
    

    const tagList = document.querySelector('.tags');
    tagList.innerHTML = allTagsHTML;
    
}
generateTags();   //END OF THIRD MODULE

//BEGIN OF FOURTH MODULE

function generateAuthor()   {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
        let html ='';
        const articleAuthor = article.getAttribute('data-author');
        const articleAuthorToLowerCase = articleAuthor.toLowerCase();
        const linkAuthor = articleAuthorToLowerCase.replace(' ','-');
        html = '<li><a class="author-link" href="#' + linkAuthor +'"><span>' + articleAuthor +'</span></a></li>'+ ' ';
        const authorsElement = article.querySelector('.author-link');
        authorsElement.innerHTML = html;
    }
}
generateAuthor();


//END OF FOURTH MODULE

// FIRST MODULE, adding classes, opening articles
function titleClickHandler(event)   {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

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

function tagClickHandler(event) {
    event.preventDefault();         
    const clickedElement = this;    
    const href = clickedElement.getAttribute('href');
    const tag_class = href.slice(5);
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
        if (article.getAttribute('data-tags').includes(tag_class)) {
            article.classList.add('active')
        } else {
            article.classList.remove('active')
        }
    }
}

function addClickListenersToTags(){
    const allTagLinks = document.querySelectorAll('.tag-link');
    for(let link of allTagLinks) {
        link.addEventListener('click',tagClickHandler);
    }

}
addClickListenersToTags();

function addClickListenersToAuthors()   {
    const allAuthorLinks = document.querySelectorAll('.author-link');
    for (let link of allAuthorLinks)    {
        link.addEventListener('click',authorClickHandler);
    }
}
addClickListenersToAuthors();

function authorClickHandler(event)  {
    event.preventDefault();
    
    const clickedElement = this;
    const authorName = clickedElement.innerText;
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles)   {
        if (article.getAttribute('data-author').includes(authorName)) {
            article.classList.add('active');
        } else {
            article.classList.remove('active');
        }
    }
}

'use strict';


const optTitleSelector = '.post-title';
const optArticleSelector = '.post';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    //tutaj prawdopodobnie zmienić by sięwyświetlał tylko kliknięty artykuł
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

function calculateTagsParams(allTags, min, max)    {
        
    min = Object.values(allTags)[0];
    max = Object.values(allTags)[0];

    for(let key in allTags)
    {
        if (allTags[key] < min)  {
            min = allTags[key];
        }   else if (allTags[key] > max) {
            max = allTags[key];
        }
    }      
    console.log('MIN', min);
    console.log('MAX', max);
    let params = {
        min: min,
        max: max
    };
    console.log(params);
    return params;
}
/*
function calculateTagClass(count, params) {

}
*/
function generateTags() {
    const articles = document.querySelectorAll('.post');
    let allTags = {};
    let min;
    let max;

    
    for(let article of articles) {
        let articleTagsHtml ='';
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        
        for (let tag of articleTagsArray) {
            articleTagsHtml += generateArticleTags(tag);
            allTags = calculateTagsAmount(allTags, tag);
        }

        const tagsElement = article.querySelector('.list.list-horizontal');
        tagsElement.innerHTML = articleTagsHtml;
    }
     
    renderAllTags(allTags);
    calculateTagsParams(allTags, min, max);
    
}
generateTags(); 



function generateAuthor()   {
    const articles = document.querySelectorAll(optArticleSelector);
    //let allAuthorsArray;

    for (let article of articles) {
        let html ='';
        const articleAuthor = article.getAttribute('data-author');
        const articleAuthorToLowerCase = articleAuthor.toLowerCase();
        const linkAuthor = articleAuthorToLowerCase.replace(' ','-');
        html = '<li><a class="author-link" href="#' + linkAuthor +'"><span>' + articleAuthor +'</span></a></li>'+ ' ';
        const authorsElement = article.querySelector('.author-link');
        authorsElement.innerHTML = html;
        
        //if (allAuthorsArray.) //tu dorobić pętlę sprawdzającą czy siępowtarza autor~~!!!!!
    }
}
generateAuthor();

function renderAllTags(tags) {
    let allTagsHTML = '';
    //let tagLinkHTML = calculateTagClass;

    for(let key in tags) {
        allTagsHTML += '<li><a class="tag-link active" href="#tag-' + key +'"><span>' + key +' (' + tags[key] + ')'  +'</span></a></li>'+ ' ';
    }

    const tagList = document.querySelector('.tags');
    tagList.innerHTML = allTagsHTML;
}

function calculateTagsAmount(allTags, tag)    {
    if (!allTags.hasOwnProperty(tag))   {
        allTags[tag] =1;
    }   else    {
        allTags[tag]++;
    }
    
    return allTags;
}

function generateArticleTags(tag) {
    const tagHtmlLink = '<li><a class="tag-link active" href="#tag-' + tag +'"><span>' + tag +'</span></a></li>'+ ' ';

    return tagHtmlLink;
}

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    for(let activeArticle of activeArticles) {
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
    const tagClass = href.slice(5);
    const articles = document.querySelectorAll(optArticleSelector);

    let tagArticles = [];
    for (let article of articles) {
        if (article.getAttribute('data-tags').includes(tagClass)) {
            tagArticles.push(article);
            article.classList.add('active');
        } else {
            article.classList.remove('active');
        }
    }
    generateActiveArticles();
    
    let sliced = tagArticles.length > 1 ? tagArticles.slice(1, tagArticles.length) : [];
    for (let article of sliced) {
        if (article.getAttribute('data-tags').includes(tagClass)) {
            article.classList.remove('active');
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
    generateActiveArticles();
}

// eslint-disable-next-line no-unused-vars
function generateActiveArticles() { 

    const articles = document.querySelectorAll('.post.active');
    let activeArticlesHtml = '';

    for (let article of articles)   {
        if (article.getAttribute('class').includes('active')) {
            const articleId = article.getAttribute('id');
            const articleTitle = (article.querySelector(optTitleSelector)).innerHTML;
            const linkHTML = '<li><a href="#' + articleId+'"><span>' + articleTitle +'</span></a></li>';
            activeArticlesHtml += linkHTML;
        }
    }
    let listInsertPoint = document.getElementById('link-title-list');
    listInsertPoint.innerHTML = activeArticlesHtml;
}

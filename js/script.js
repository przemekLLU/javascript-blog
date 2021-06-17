'use strict';

//SECOND MODULE

const  optTitleSelector = '.post-title';
const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
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
generateTitleLinks(); //END OF SECOND MODULE

//THIRD MODULE generating tags

function generateTags(){
    let html = '';
    const articles = document.querySelectorAll('.post.active');
   
   
    for(let article of articles){
        const articleTags = article.getAttribute('data-tags');
        const articleTagsArray = articleTags.split(' ');
        //console.log(articleTagsArray);        

        for (let tag of articleTagsArray)
        {
            const tagHTML = '<li><a href="#tag-' + tag +'"><span>' + tag +'</span></a></li>';  
            html = html + tagHTML;
         }  
    } 
    let tagInsertPoint = document.getElementById('tag-list');
    tagInsertPoint.insertAdjacentHTML('beforeend',html);
  }
  generateTags();   //END OF THIRD MODULE


// FIRST MODULE, adding classes, opening articles
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
  
    for(let activeLink of activeLinks) { 
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
    generateTags();// NIE KASUJĄSIĘSTARE TAGI!!
}
const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}    

function tagClickHandler(event) {
    event.preventDefault();         /* prevent default action for this event */
    const clickedElement = this;    // make new constant named "clickedElement" and give it the value of "this" */
    const href = clickedElement.getAttribute('href');   // make a new constant "href" and read the attribute "href" of the clicked element
    const tag = href;  /* make a new constant "tag" and extract tag from the "href" constant */
    const tagLinks = document.querySelectorAll('.tag-links .active'); /* find all tag links with class active */
    //console.log('wyświetlanie TAG-LINKS',tagLinks);

    for(tag of tagLinks) { 
        tagLinks.remove('active');
    }

    //document.querySelector('a[href='${href}']');  //TUTAJ zostało zrobić porównanieXXXXXXXXXXXXXXXXXXXXXXXXX
    //$('a[href=',a_href)
  // find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */ 
}

function addClickListenersToTags(){
    /* find all links to tags */
    
    /* START LOOP: for each link */
  
      /* add tagClickHandler as event listener for that link */
  
    /* END LOOP: for each link */
  }
  
  addClickListenersToTags();

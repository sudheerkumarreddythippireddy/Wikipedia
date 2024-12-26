let searchInputEl=document.getElementById("searchInput");
let searchResultsEl=document.getElementById("searchResults");
let spinnerEl=document.getElementById("spinner");

function createAndAppend(result){
    let {link,title,description}=result;
    let resultItem=document.createElement("div");
    resultItem.classList.add("result-item");

    let titleEl=document.createElement("a");
    titleEl.textContent=title;
    titleEl.href=link;
    titleEl.target="_blank";
    titleEl.classList.add("result-title");
    resultItem.appendChild(titleEl);

    let titleBreakEl=document.createElement("br");
    resultItem.appendChild(titleBreakEl);

    let urlEl=document.createElement("a");
    urlEl.textContent=link;
    urlEl.href=link;
    urlEl.target="_blank";
    urlEl.classList.add("result-url");
    resultItem.appendChild(urlEl);  
    
    let linkBreakEl=document.createElement("br");
    resultItem.appendChild(linkBreakEl);

    let descriptionEl=document.createElement("p");
    descriptionEl.textContent=description;
    descriptionEl.classList.add("link-description");
    resultItem.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItem);
    
}

function displayResults(search_results){
    spinnerEl.classList.add("d-none");
    for(let result of search_results){
        createAndAppend(result);
    }
}
function searchWikipedia(event){
    if(event.key==="Enter"){
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent="";
        let searchInputValue=searchInputEl.value;
        let url=`https://apis.ccbp.in/wiki-search?search=${searchInputValue}`;
        let options={
            method:"GET"
        }
        fetch(url,options)
        .then(res=>res.json())
        .then(jsonData=>{
            let {search_results}=jsonData;
            displayResults(search_results);
        });
    }
}
searchInputEl.addEventListener("keydown",searchWikipedia);
var html_list;
var header;
var nav;
var main;
var asideTextArea;
const BASE_URL = "http://localhost:3000/";

function init(){
    asideTextArea = document.querySelector("#aside_text_area");
    main = document.querySelector("main");
    nav = document.querySelector("nav");
    header = document.querySelector("header");
    fetch(BASE_URL+"html_list.json")
    .then(response => response.json())
    .then(data => {
      html_list = data
      updateHeader()
      updateNav()
      updateAside()
    });
}

function updateHeader(){
    header.innerHTML = 
    "<h1>"+document.title.toUpperCase()+"</h1>"
}

function updateNav(){
    var navigationContent = "";
    for(topico in html_list){
        if(topico === "index"){
            let selected = ""
            if(getFileName(document.location.pathname) === html_list[topico]['uri']){ 
                selected = "class='selected'"
            } 
            navigationContent += "<h3><a "+selected+" href="+BASE_URL+html_list[topico]['uri']+">"+html_list[topico]['title'].toUpperCase()+"</a></h3>"
        }
        else{
            navigationContent += "<h3>"+topico.toUpperCase()+"</h3>"
            for(let item of html_list[topico]){
                let selected = ""
                if(getFileName(document.location.pathname) === getFileName(item['uri'])){ 
                    selected = "class='selected'"
                }                     
                navigationContent += "<p><a "+selected+" href='"+BASE_URL+item['uri']+"'>"+item['title'].toUpperCase()+"</a></p>"
            }
        }        
    }
    nav.innerHTML = navigationContent;

    let navPadding = window.getComputedStyle(nav).getPropertyValue('padding')
    let padding = navPadding.substring(0, navPadding.length-2)
    
    if(nav.offsetHeight < main.offsetHeight){
        nav.style.height = (main.offsetHeight - padding*2)+"px"
    }    
}

function updateAside(){
    asideTextArea.innerHTML = main.innerHTML   
    asideTextArea.style.height = main.offsetHeight+"px"    
}

function getFileName(pathName){
    pagePathName = pathName;
    fileName = pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
    return fileName;
}





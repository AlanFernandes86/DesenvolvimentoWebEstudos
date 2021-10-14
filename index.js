var html_list;
const BASE_URL = "http://localhost:3000/"

function init(){
    fetch(BASE_URL+"html_list.json")
    .then(response => response.json())
    .then(data => {
      html_list = data
      nav()
      header()
    });
}

function header(){
    document.querySelector("header").innerHTML = 
    "<h1>"+document.title.toUpperCase()+"</h1>"
}

function nav(){
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
    document.querySelector("nav").innerHTML = navigationContent;
}

function getFileName(pathName){
    pagePathName = pathName;
    fileName = pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
    return fileName;
}



//function main(){
 //   document.querySelector("main").innerHTML = "Main";
//}





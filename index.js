var pagePathName;
var fileName;

function start(){
    pagePathName = window.location.pathname;
    fileName = pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
    nav();
    main();
    header();
}

function header(){
    document.querySelector("header").innerHTML = 
    "<h1>"+document.title+"</h1>"
}

function nav(){
    document.querySelector("nav").innerHTML = 
    fileName;
}

function main(){
    document.querySelector("main").innerHTML = 
    fileName;
}

var html_list;
var header;
var nav;
var main;
var aside;
var asideTextArea;
const BASE_URL = "http://localhost:3000/";

function init() {

    // referencia os elementos no html
    asideTextArea = document.querySelector("#aside_text_area");
    main = document.querySelector("main");
    nav = document.querySelector("nav");
    header = document.querySelector("header");
    aside = document.querySelector("aside");

    // carrega o arquivo json e chama os métodos para atualizar a página
    fetch(BASE_URL + "html_list.json")
        .then(response => response.json())
        .then(data => {
            html_list = data;
            updateHeader();
            updateNav();
            updateMain();
            updateAside();
        });
}

// insere o título no header com o mesmo texto do título da página
function updateHeader() {
    header.innerHTML =
        "<h1>" + document.title.toUpperCase() + "</h1>"
}

// atualiza a barra de navegação
function updateNav() {
    var navigationContent = "";

    //interage sobre propriedades do html na ordem que foram inseridas no arquivo
    for (topico in html_list) {
        // compara de o topico é o index - se sim implementa o link da pagína inicial
        if (topico === "index") {
            let selected = ""
            if (getFileName(document.location.pathname) === html_list[topico]['uri']) {
                selected = "class='selected'"
            }
            navigationContent += "<h3><a " + selected + " href=" + BASE_URL + html_list[topico]['uri'] + ">" + html_list[topico]['title'].toUpperCase() + "</a></h3>"
        }
        // quando não é o index, implementa os links do tópico atual no for
        else {
            navigationContent += "<h3>" + topico.toUpperCase() + "</h3>"
            for (let item of html_list[topico]) {
                let selected = ""
                // se for a página atual, descata na lista da navegação
                if (getFileName(document.location.pathname) === getFileName(item['uri'])) {
                    selected = "class='selected'"
                }
                navigationContent += "<p><a " + selected + " href='" + BASE_URL + item['uri'] + "'>" + item['title'].toUpperCase() + "</a></p>"
            }
        }
    }

    nav.innerHTML = navigationContent;

    // le o valor do padding atual do nav
    let navPadding = window.getComputedStyle(nav).getPropertyValue('padding')
    // remove o 'px' do final
    let padding = navPadding.substring(0, navPadding.length - 2)

    // se o height for menos que da main, iguala o valor com o da main, sendo necessário descontar o padding
    if (nav.offsetHeight < main.offsetHeight) {
        nav.style.height = (main.offsetHeight - padding * 2) + "px"
    }
}

function updateMain() {
    
    if (asideTextArea == null) {
        aside.style.display = "none";
        main.classList.add("width-without-aside")
    }

    if (main.offsetHeight < nav.offsetHeight) {
        // le o valor do padding atual do main
        let mainPadding = window.getComputedStyle(main).getPropertyValue('padding')
        // remove o 'px' do final
        let padding = mainPadding.substring(0, mainPadding.length - 2)

        main.style.height = (nav.offsetHeight - padding * 2) + "px"
    }
}

// atualiza a barra lateral
function updateAside() {
    if (asideTextArea != null) {
        asideTextArea.innerHTML = main.innerHTML
        asideTextArea.style.height = main.offsetHeight + "px"
    }
}



// retorna somente o nome do arquivo de um caminho completo
function getFileName(pathName) {
    pagePathName = pathName;
    fileName = pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
    return fileName;
}





const buttonTheme = document.getElementById('themeToggle');

function ToggleTheme(){
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        buttonTheme.textContent = 'слава жава пипту';

    }else{
        buttonTheme.textContent = 'На темную сторону интернета';
    }
}

buttonTheme.addEventListener('click', ToggleTheme);



const homeButton = document.getElementById('homeButton');

function ButtonHome(){
    document.body.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        homeButton.textContent = 'мой сайт';

    }else{
        homeButton.textContent = 'мой сайт';
    }
}

homeButton.addEventListener('click', ButtonHome);




































































































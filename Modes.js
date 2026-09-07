// let body = document.getElementById('body');
let btnContainer = document.getElementById("btn-container");
let btn = document.createElement("button");


let reloj = document.getElementById("watch");
let cont = document.getElementsByClassName("container");
let boton = document.getElementById("set");

btn.classList.add("alarm-btn");
btn.innerHTML = `<i class="fa-solid fa-moon"></i><i class="fa-solid fa-sun"></i>`;
btnContainer.appendChild(btn);

btn.addEventListener( "click", function() {
    document.body.classList.toggle(`dark`);
    btn.classList.toggle(`active`);

    boton.classList.toggle(`dark`);
    reloj.classList.toggle(`dark`);

})
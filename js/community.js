function tableToggle() {
    const tableTitle = document.querySelectorAll(".tableTitle");

    tableTitle.forEach((item)=>{
        const tableContent = item.closest("tr").nextElementSibling;

        item.addEventListener("click", ()=>{
            tableContent.classList.toggle("on");
            item.classList.toggle("on");
        })
    })
}

tableToggle();



////////////////////////////////////////////////////////////////////////////////////////////
/* ------------------- menu ------------------- */
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}
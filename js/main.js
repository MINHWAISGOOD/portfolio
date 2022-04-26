/* ------------------- menu ------------------- */
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}



/* ------------------- community ------------------- */
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


/* ------------------- scroll ------------------- */
const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll("body >ul li");
const base = -300;

setPos();

// 브라우저가 리사이징 될때
window.addEventListener("resize", ()=>{
    setPos();
})

console.log(posArr);

window.addEventListener("scroll", ()=>{
    let scroll = window.scrollY || window.pageYOffset;

    sections.forEach((el,index)=>{
        if(scroll >= posArr[index] + base) {
            lis.forEach((el,index)=>{
                el.classList.remove("on");
                sections[index].classList.remove("on");
            })
            lis[index].classList.add("on");
            sections[index].classList.add("on");
        }
    })
})

lis.forEach((li,index)=>{
    li.addEventListener("click", (e)=>{
        new Anime(window, {
            prop: "scroll",
            value: posArr[index],
            duration: 500
        });
        for(let el of lis) {
            el.classList.remove("on");
        }       
        e.currentTarget.classList.add("on");
    })
})


function setPos() {
    posArr=[];
    for(let el of sections) {
        posArr.push(el.offsetTop);
    }
}


/* ------------------- swiper ------------------- */ 
var swiper = new Swiper(".mySwiper", {
    direction:"horizontal", //슬라이딩 방향 
    slidesPerView: 4,//하나의 화면당 보일 패널의 갯수 
    spaceBetween: 30,//슬라이드 간 사이간격
    loop: true,//슬라이딩 순환의 여부 결정
    grabCursor:true, //스와이프시 마우스 커서 모양
    autoplay:{
        delay: 3000,
        disableOnInteraction:false,
        //true : 롤링 중에 스와이프 되면 롤링 중지
        //false : 롤링 중에 스와이프 되더라도 롤링 계속
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true, //페이지네이션을 클릭해서 인터렉션할 수 있게함
        //type:"fraction", //페이지네이션을 숫자로 표시함
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    mousewheel:true, //마우스 휠을 이용하여 이동가능하게 함.
    keyboard:{
        enabled :true, //키보드로tap키로 각요소들을 접근할수 있게함 
    },
});


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
const len = sections.length;
const lis = document.querySelectorAll("body >ul li");

const btns_arr = Array.from(lis);

let posArr = [];
const base = -400;
let enableClick = true;

setPos();

// 브라우저가 리사이징 될때
window.addEventListener("resize", ()=>{
    setPos();
})

console.log(posArr);

//마우스 휠을 내리면 li의 값이 변경되면서 해당 section으로 이동하는 이벤트를 걸어줄 것.
window.addEventListener("mousewheel", (e)=>{
    // e.preventDefault();
    // 활성화 되어있는 btns li를 변수로 저장
    let activeItem = document.querySelector(".btns li.on");

    let activeIndex = btns_arr.indexOf(activeItem);
    // console.log(activeIndex);

    let targetIndex;

    // 마우스 휠을 올린다.
    // if문은 인덱스 값만 왔다갔다 해주는 용도
    if(e.deltaY < 0) {
        // 마우스 휠을 올리는 경우 ( 음수 )
        // 3 2 1 0 return;
        if(activeIndex == 0) return;
        targetIndex = activeIndex - 1;
    }else {
        // 마우스 휠을 내렸을 경우 ( 양수 )
        // 0 1 2 3 return;
        if(activeIndex == len - 1) return;
        targetIndex = activeIndex + 1;
    }
    // 마우스휠 이벤트 결과로 나오는 정확한 인덱스 값을 추적하는 코드

    // 결과적으로 anime 쪽에 posArr의 인덱스에 정확한 targetIndex를 주기 위한 것.
    new Anime(window, {
        prop: "scroll",
        value: posArr[targetIndex],
        duration: 500
    })
}, {passive:false})

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

lis.forEach((el,index)=>{
    el.addEventListener("click", (e)=>{
        // 클릭한 버튼이 활성화 되어있는지 판별하는 변수를 만든다.
        let isOn = e.currentTarget.classList.contains("on");
        // 활성화 되어있다면 종료
        if(isOn) return; 

        if(enableClick) {
            
            new Anime(window, {
                prop: "scroll",
                value: posArr[index],
                duration: 500,
                callback: ()=>{
                    enableClick = true;
                }
            })
            enableClick = false;
        }        
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
    spaceBetween: 15,//슬라이드 간 사이간격
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


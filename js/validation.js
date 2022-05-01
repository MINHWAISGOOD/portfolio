const form = document.querySelector("#joinForm");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click",(e)=>{
    if(!isText("id", 5)) e.preventDefault(); // id 인증
    if(!isText("comments",20)) e.preventDefault(); // comments인증
    if(!isCheck("gender")) e.preventDefault(); // gender 인증
    if(!isCheck("interest")) e.preventDefault(); // interest 인증
    if(!isPwd("password1", "password2", 7)) e.preventDefault(); // password인증    
});

// input-type : text
function isText(name, len) {
    //만약 입력반은 len값이 비어있다면 디폴트 값은 5
    if(len === undefined) {
        len =5;
    }

    let input = form.querySelector(`[name=${name}]`);
    let txt = input.value;
    
    if(txt.length >= len) {
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove();

        return true;
    }else {        
        const errMsgs = input.closest("td").querySelectorAll("p");
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요.`);
        input.closest("td").append(errMsg);

        return false;
    }
}

function isCheck(name) {
    let inputs = form.querySelectorAll(`[name=${name}]`);
    let isCheck = false;

    for(let el of inputs) {
        if(el.checked) isCheck = true;
    }

    if(isCheck) {
        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        if(errMsgs.length>0) inputs[0].closest("td").querySelector("p").remove();

        return true;
    }else {
        const errMsgs = inputs[0].closest("td").querySelectorAll("p");
        if(errMsgs.length>0) inputs[0].closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");
        errMsg.append("필수 입력 항목을 체크해 주세요.");
        inputs[0].closest("td").append(errMsg);

        return false;
    }
}

function isPwd(name1, name2, len){
    let pwd1 = form.querySelector(`[name=${name1}]`);
    let pwd2 = form.querySelector(`[name=${name2}]`);

    let pwd1_val = pwd1.value;
    let pwd2_val = pwd2.value;

    const num = /[0-9]/;
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+?><]/;

    if(pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)) {
        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();

        return true;
    }else {
        const errMsgs = pwd1.closest("td").querySelectorAll("p");
        if(errMsgs.length >0) pwd1.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p");        
        errMsg.append(`비밀번호는 ${len}글자이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요.`);
        pwd1.closest("td").append(errMsg);

        return false;
    }
}



////////////////////////////////////////////////////////////////////////////////////////////
/* ------------------- menu ------------------- */
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function(e){
    e.preventDefault();

    btnCall.classList.toggle("on");
    menuMo.classList.toggle("on");
}


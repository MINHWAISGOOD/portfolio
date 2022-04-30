var mapContainer = document.getElementById('map');

const t_on = document.querySelectorAll(".traffic li")[1];

const branch_btns = document.querySelectorAll(".branch li");

let drag = true;
let zoom = true;

var mapOption = {
    center : new kakao.maps.LatLng(37.5217357,127.033271),
    level : 3
};

// 지도 생성
var map = new kakao.maps.Map(mapContainer, mapOption);

var markerOptions =[
    {
        title : "강남전시장",
        latlng : new kakao.maps.LatLng(37.5217357,127.033271),
        imgSrc : 'img/marker.png',
        imgSize : new kakao.maps.Size(50,50),
        imgPos : {offset : new kakao.maps.Point(25,50)},
        button : branch_btns[0]
    },
    {
        title : "서초전시장",
        latlng : new kakao.maps.LatLng(37.4851385,127.0112461),
        imgSrc : 'img/marker.png',
        imgSize : new kakao.maps.Size(50,50),
        imgPos : {offset : new kakao.maps.Point(25,50)},
        button : branch_btns[1]
    },
    {
        title : "강북전시장",
        latlng : new kakao.maps.LatLng(37.629275,127.02455),
        imgSrc : 'img/marker.png',
        imgSize : new kakao.maps.Size(50,50),
        imgPos : {offset : new kakao.maps.Point(25,50)},
        button : branch_btns[2]
    }
];

for( let i=0; i<markerOptions.length; i++){
    new kakao.maps.Marker({
        map : map,
        position : markerOptions[i].latlng,
        title : markerOptions[i].title,
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc,markerOptions[i].imgSize,markerOptions[i].imgPos)
    });

    // branch 버튼을 클릭했을 때, 해당 위치로 이동하고 또 버튼을 활성화하기
    markerOptions[i].button.onclick =(e)=>{
        e.preventDefault();
        for(let k=0; k<markerOptions.length; k++){
            // 각 요소들의 버튼의 remove on
            markerOptions[k].button.classList.remove("on");
        }
        // 내가 선택한 그 버튼에 on 붙이기
        markerOptions[i].button.classList.add("on");
        // 지도이동함수 이용해서 이동시키기
        moveTo(markerOptions[i].latlng);
    }
}

window.onresize = ()=>{
    // on이 붙은 클릭한 branch 버튼 찾기
    let active_btn = document.querySelector(".branch li.on");
    // active_btn의 인덱스 값 찾기
    let active_index = active_btn.getAttribute("data-index");
    // 찾은 marketOptions[active_index]의 위도경도를 setCenter 해준다.
    map.setCenter(markerOptions[active_index].latlng);
}

// 교통정보 on/off 이벤트
t_on.addEventListener("click", (e)=>{
    e.preventDefault();
    
    t_on.classList.toggle("on");
    if(t_on.classList.contains("on")) {
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }else {
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }
});

var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


// 함수
// 드래그 함수 선언
setDraggable(drag);
// 지도 드래그 이동 끄기, 켜기
function setDraggable(draggable){
    //마우스 드래그로 지도 이동 가능여부를 설정하는것.
    map.setDraggable(draggable);  
}

// 줌 함수 선언
setZoomable(zoom);
function setZoomable(zoomable){
    // 마우스 휠로 지도를 확대, 축소 가능여부 설정하는 것
    map.setZoomable(zoomable);
}

// 지도 이동 함수
function moveTo(target){
    // 본점,지점1,지점2의 위치를 매개변수(target)로 받아올 것
    var moveLatLon = target;
    // 이동해서 정가운데로 이동시키는 메소드
    map.setCenter(moveLatLon);   
}
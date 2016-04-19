/**
 * Program    : iframeMap.js
   Date       : 2016-04-19
   Description: 매칭 장소 정하는 맵뷰.
   Modify     : 서우철
   History    :   - 2016-04-19 작성자 : 서우철
                   * 매칭 장소 정하는 맵뷰 추가. 
 * 
 */

/*----- 지도 생성 start -----*/
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	mapOption = {
    	center: new daum.maps.LatLng(37.566833, 126.978522), // 지도의 중심좌표
		level: 3 // 지도의 확대 레벨
};  

// 지도를 생성합니다    
var map = new daum.maps.Map(mapContainer, mapOption);
//지도가 생성됐을때 현재위치 중심 추적 함수

nowLocation();
/*----- 지도 생성 end -----*/

//필드 값
var lat; //위도
var lon; //경도
var locMarker;

// 중심 마커가 표시될 위치입니다 
var centerMarkerPosition = map.getCenter();


// 중심 마커를 생성합니다
var centerMarker = new daum.maps.Marker({
	position: centerMarkerPosition
});

// 중심 마커가 지도 위에 표시되도록 설정합니다
centerMarker.setMap(map);

/*----- 현재위치 추적의 핵심역할 GeoLocation 마커 / 위치정보제공 동의 / 현재위치추적기능 / 주소정보 / 지도 중심좌표  start -----*/
function nowLocation() {
	
	if(!!locMarker) {
 		locMarker.setMap(null);
	}

	// 지도에 마커와 인포윈도우를 표시하는 함수입니다
	var imageSrc = '../lib/images/map/red-circle.png', // 마커이미지의 주소입니다    
		imageSize = new daum.maps.Size(25, 25), // 마커이미지의 크기입니다
		imageOption = {
			offset : new daum.maps.Point(10, 10)
	}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
	var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize,
		imageOption), markerPosition = new daum.maps.LatLng(lat, lon); // 마커가 표시될 위치입니다

	function displayMarker(locPosition, message) {
		// 마커를 생성합니다
		locMarker = new daum.maps.Marker({
			map : map,
			position : locPosition,
			image : markerImage
		});
		// 지도 중심좌표를 접속위치로 변경합니다
		map.setCenter(locPosition);
	}

		
	//HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
	if (navigator.geolocation) {
		// GeoLocation을 이용해서 접속 위치를 얻어옵니다
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude, // 위도 파악
			lon = position.coords.longitude; // 경도 파악
			var locPosition = new daum.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
			message = ''; // 인포윈도우에 표시될 내용입니다 (필요없음 : 일단 제거)
			// 마커와 인포윈도우를 표시합니다
			displayMarker(locPosition, message);
		});
	} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
		var locPosition = new daum.maps.LatLng(33.450701, 126.570667), message = '현재 위치를 확인할 수 없습니다.';
		displayMarker(locPosition, message);
	}

	//주소-좌표 변환 객체를 생성합니다
	var geocoder = new daum.maps.services.Geocoder();

	//지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
	daum.maps.event.addListener(map, 'click', function(mouseEvent) {
		searchDetailAddrFromCoords(mouseEvent.latLng, function(status, result) {
    		if (status === daum.maps.services.Status.OK) {
     	 		console.log(result[0].roadAddress.name);
  	    		console.log(result[0].jibunAddress.name); 
			}   
		});
	});

	function searchAddrFromCoords(coords, callback) {
	// 좌표로 행정동 주소 정보를 요청합니다
	geocoder.coord2addr(coords, callback);         
	}

	function searchDetailAddrFromCoords(coords, callback) {
	// 좌표로 법정동 상세 주소 정보를 요청합니다
	geocoder.coord2detailaddr(coords, callback);
	}

	// 지도 중심 좌표 변화 이벤트를 등록한다
	daum.maps.event.addListener(map, 'center_changed', function() {
		console.log('지도의 중심 좌표 : ' + map.getCenter().toString());
		console.log('이것은 바로 위도 : '+map.getCenter().getLat().toString());
		console.log('이것은 바로 경도 : '+map.getCenter().getLng().toString());
		
		
		centerMarker.setMap(null);
		
		centerMarkerPosition = map.getCenter();
		centerMarker = new daum.maps.Marker({
			position : centerMarkerPosition
		});
		centerMarker.setMap(map);
	});

}
/*----- 현재위치 추적의 핵심역할 GeoLocation 마커 / 위치정보제공 동의 / 현재위치추적기능 / 주소정보 / 지도 중심좌표  end -----*/

var centerMarkerWindow;

/*----- 참고 소스-----*/

daum.maps.event.addListener(map, 'dragstart', function() {
	console.log('드래그시작');
	if(!!centerMarkerWindow){
		centerMarkerWindow.close();
	}
});

daum.maps.event.addListener(map, 'drag', function() {
	console.log('드래그중');
});

daum.maps.event.addListener(map, 'dragend', function() {
	console.log('드래그종료');
	
	var geocoder = new daum.maps.services.Geocoder();

	var coord = map.getCenter();
	var callback = function(status, result) {
	    if (status === daum.maps.services.Status.OK) {
	    
	        // 요청위치에 건물이 없는 경우 도로명 주소는 빈값입니다
	        console.log('도로명 주소 : ' + result[0].roadAddress.name);
	        console.log('지번 주소 : ' + result[0].jibunAddress.name);
	        
	        var centerMarkerContent = 	'<div style="padding:5px;">주소 : '+result[0].jibunAddress.name+
	        							'<br>도로명주소 : '+result[0].roadAddress.name+
	        							'<br><a href="#" id="registerBt">등록하기</a></div>';
	        							//'<br><a class="registerButton">등록하기</a></div>';
			var	centerMarkerContentPosition = map.getCenter();
	
			// 인포윈도우를 생성합니다
			centerMarkerWindow = new daum.maps.InfoWindow({
				position : centerMarkerContentPosition,
				content : centerMarkerContent
			});
			
			centerMarkerWindow.open(map, centerMarker);
				
	    }
	};

	geocoder.coord2detailaddr(coord, callback);
	
});

$(function(){
	$('#registerBt').click(function(){
		top.opner.history.go(0);
	});
});


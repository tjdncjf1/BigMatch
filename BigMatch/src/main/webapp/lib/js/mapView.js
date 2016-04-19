/**
 * Program    : mapView.js
   Date       : 2016-04-19
   Description: 대전 찾기 시 보여줄 맵.
   Modify     : 서우철
   History    :   - 2016-04-19 작성자 : 서우철
                   * 대전 찾기 시 보여줄 맵 자바스크립트 추가. 
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

	nowLocation();
	/*----- 지도 생성 end -----*/

	var lat; //위도
	var lon; //경도

	var locMarker;

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
				lat = position.coords.latitude, // 위도
				lon = position.coords.longitude; // 경도
				var locPosition = new daum.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
				message = ''; // 인포윈도우에 표시될 내용입니다
				// 마커와 인포윈도우를 표시합니다
				displayMarker(locPosition, message);
	
			});
	
		} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
	
			var locPosition = new daum.maps.LatLng(33.450701, 126.570667), message = '현재 위치를 확인할 수 없습니다.';
	
			displayMarker(locPosition, message);
		}
	}

	// 주소-좌표 변환 객체를 생성합니다
	var geocoder = new daum.maps.services.Geocoder();
	
	
	// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
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
	});
		
	// 마커 이미지의 주소
	var redMarkerImageUrl = '../lib/images/map/red-pin.png', 
	markerImageSize = new daum.maps.Size(40, 42), // 마커 이미지의 크기
    markerImageOptions = { 
		offset : new daum.maps.Point(20, 42)// 마커 좌표에 일치시킬 이미지 안의 좌표
    };

	var blueMarkerImageUrl = '../lib/images/map/blue-pin.png', 
	markerImageSize = new daum.maps.Size(40, 42), // 마커 이미지의 크기
    markerImageOptions = { 
		offset : new daum.maps.Point(20, 42)// 마커 좌표에 일치시킬 이미지 안의 좌표
    };
	
	var greenMarkerImageUrl = '../lib/images/map/green-pin.png', 
	markerImageSize = new daum.maps.Size(40, 42), // 마커 이미지의 크기
    markerImageOptions = { 
		offset : new daum.maps.Point(20, 42)// 마커 좌표에 일치시킬 이미지 안의 좌표
    };
	
	// 마커 이미지를 생성한다
	var redMarkerImage = new daum.maps.MarkerImage(redMarkerImageUrl, markerImageSize, markerImageOptions);
	var blueMarkerImage = new daum.maps.MarkerImage(blueMarkerImageUrl, markerImageSize, markerImageOptions);
	var greenMarkerImage = new daum.maps.MarkerImage(greenMarkerImageUrl, markerImageSize, markerImageOptions);
	// 지도에 마커를 생성하고 표시한다
	
	var redMarker = new daum.maps.Marker({
	    position: new daum.maps.LatLng(37.495301, 127.027298), // 마커의 좌표 (추후에 좌표는 DB에서 불어와야 함.)
	    draggable : false, // 마커를 드래그 가능하도록 설정한다
	    image : redMarkerImage, // 마커의 이미지
	    map: map // 마커를 표시할 지도 객체
	});
	
	var blueMarker = new daum.maps.Marker({
	    position: new daum.maps.LatLng(37.494923, 127.026630), // 마커의 좌표
	    draggable : false, // 마커를 드래그 가능하도록 설정한다
	    image : blueMarkerImage, // 마커의 이미지
	    map: map // 마커를 표시할 지도 객체
	});
	
	var greenMarker = new daum.maps.Marker({
	    position: new daum.maps.LatLng(37.4938505, 127.028484), // 마커의 좌표
	    draggable : false, // 마커를 드래그 가능하도록 설정한다
	    image : greenMarkerImage, // 마커의 이미지
	    map: map // 마커를 표시할 지도 객체
	});
	
	// 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
	daum.maps.event.addListener(redMarker, 'click', function() {
	    console.log("레드마커 클릭");
	});
	daum.maps.event.addListener(blueMarker, 'click', function() {
	    console.log("블루마커 클릭");
	});
	daum.maps.event.addListener(greenMarker, 'click', function() {
	    console.log("그린마커 클릭");
	});
	
	/* 경기리스트 뜨게하는 부분 */
	
	// 추후 작업 필요.
	// 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
	// var iwContent = '<div style="padding:5px;"><div id="jb-tab-1">  <table border=0 cellspacing=0 cellpadding=0 width=440 style="display:block; border:4px solid #E3E3E3;"> <tr> <td align=center valign=top width=100 height=100><br> <img src="../images/home/my.png" width="100%"/> </td> <td align=left> <br> <table border=0 cellspacing=0 cellpadding=1> <!--닉네임--> <tr> <td width=1 rowspan=5></td> <td width=20% valign=middle> <img src="../images/home/my.png" width="30%"/> </td> <td width=80% valign=middle> <font style="font-family:맑은 고딕, tahoma, Vrinda, 굴림, arial; font-size:9pt; color:#8E8E8E; line-height:120%"> 이강민(nickname) </font> </td> </tr> <!--승률--> <tr> <td width=20% align=left valign=middle> <img src="../images/home/trophy.png" width="30%"/> </td> <td width=80% align=left valign=middle> <font style="font-family:맑은 고딕, tahoma, Vrinda, 굴림, arial; font-size:9pt; color:#8E8E8E; line-height:120%"> 2200 </font> <font style="font-family:맑은 고딕, tahoma, Vrinda, 굴림, arial; font-size:9pt; color:#8E8E8E; line-height:120%"> (승률 50% : 승/무/패) </font> </td> </tr> <!--다마수--> <tr> <td width=20% align=left valign=middle> <font style="font-family:맑은 고딕, tahoma, Vrinda, 굴림, arial; font-size:9pt; color:#3E3E3A; line-height:120%"> <img src="../lib/images/home/dama.png" width="30%"/> </font> </td> <td width=80% align=left valign=middle> <font style="font-family:맑은 고딕, tahoma, Vrinda, 굴림, arial; font-size:9pt; color:#8E8E8E; line-height:120%"> 다마점수 </font> </td> </tr> <!--신뢰점수--> <tr> <td width=20% align=left valign=middle> <font style="font-family:맑은 고딕, tahoma, Vrinda, 굴림, arial; font-size:9pt; color:#3E3E3A; line-height:120%"> <img src="../lib/images/home/pin.png" width="30%"/>(신뢰도) <!--이미지 변결 요망.. 이미지 크기가 달라서 테이블 구조가 깨짐--> </font> </td> <td width=80% align=left valign=middle> <font style="font-family:맑은 고딕, tahoma, Vrinda, 굴림, arial; font-size:9pt; color:#8E8E8E; line-height:120%"> 600점 </font> </td> </tr> <!--위치--> <tr> <td width=20% align=left valign=middle> <img src="../lib/images/home/pin.png" width="30%"/> </td> <td width=80% align=left valign=middle> <font style="font-family:맑은 고딕, tahoma, Vrinda, 굴림, arial; font-size:9pt; color:#8E8E8E; line-height:120%"> 서울시 동작구 어딘가? </font> </td> </tr><!--//////////////////////////////////////////////////////////임시////////////////////////////////////////////////////////////////////////////////////////--></table><br></td></tr></table> </div></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
	// var iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

	// 인포윈도우를 생성합니다
	var infoWindow = new daum.maps.InfoWindow({
	    content : iwContent,
	    removable : iwRemoveable
	});

	// 마커에 클릭이벤트를 등록합니다
	daum.maps.event.addListener(redMarker, 'click', function() {
	      // 마커 위에 인포윈도우를 표시합니다
	      infoWindow.open(map, redMarker);  
	});
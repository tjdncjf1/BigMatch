/*----- ----- ----- 지도 생성 start ----- ----- -----*/
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    	mapOption = {
        	center: new daum.maps.LatLng(37.566833, 126.978522), // 지도의 중심좌표
       		level: 3 // 지도의 확대 레벨
    	};
	// 지도를 생성합니다    
	var map = new daum.maps.Map(mapContainer, mapOption);
	
	nowLocation();
/*----- ----- ----- 지도 생성 end ----- ----- -----*/
	
	//field
	var lat; //위도
	var lon; //경도
	var locMarker; //현재위치 빨간원
	
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
		var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption); 
			//markerPosition = new daum.maps.LatLng(lat, lon); // 마커가 표시될 위치입니다
		
	
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
				viewMarkers();
			});
	
		} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
	
			var locPosition = new daum.maps.LatLng(33.450701, 126.570667), 
					message = '현재 위치를 확인할 수 없습니다.';
	
			displayMarker(locPosition, message);
		}
		
	}
/*----- 현재위치 추적의 핵심역할 GeoLocation 마커 / 위치정보제공 동의 / 현재위치추적기능 / 주소정보 / 지도 중심좌표  end -----*/

	// 주소-좌표 변환 객체를 생성
	var geocoder = new daum.maps.services.Geocoder();
	
	// 지도에서 클릭하면 주소 표시
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
	
	
	
	
	
	// 지금부터 마커생성을 시작한다.
		
	// 첫째, 마커를 표시할 위치 객체 배열을 생성한다.	
	var marker;
	var markers=[]; // 마커 객체 배열
	
	
	var listInfoWindow;
	var listInfoWindows=[];
	
	function addMarker(position) {
	    // 마커를 생성합니다
	    marker = new daum.maps.Marker({
	        position: position
	    });
	    listInfoWindow = new daim.maps.InfoWindow({
	    	position : position
	    });
		// 생성된 마커를 배열에 추가합니다
	    markers.push(marker);
	    listInfoWindows.push(listInfoWindow);
	}
	
	// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
	function setMarkers(map) {
	    for (var i = 0; i < markers.length; i++) {
	    	markers[i].setMap(map);
	    }
	    for (var i = 0; i < listInfoWindows.length; i++) {
	    	listInfoWindows[i].setMap(map);
	    }
	}
    
	// 드래그가 끝났을 시 마커 핀 업데이트.
	daum.maps.event.addListener(map, 'dragend', function() {
		
		setMarkers(null); // 드레그가 끝났을 시 마커 객체 삭제
		console.log('마커배열 길이 :'+markers.length);
		
		console.log(markers.length);
		markers=[]; // 마커 객체 배열 초기화
		    
//		console.log('지도의 중심 좌표 : ' + map.getCenter().toString());
//		console.log('지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng());
//	    console.log('북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng());
	    
	    viewMarkers();
	    
	});
	
	// 확대가 변경 됐을 시 마커 핀 업데이트.
	daum.maps.event.addListener(map, 'zoom_changed', function() {
		setMarkers(null);
		markers=[];
		viewMarkers();
	});
	
	// Map에 DB에 Marker 표시
	function viewMarkers() {
		
		// 지도의 현재 영역을 얻어옵니다 
	    var bounds = map.getBounds();
	    // 영역의 남서쪽 좌표를 얻어옵니다 
	    var swLatLng = bounds.getSouthWest(); 
	    // 영역의 북동쪽 좌표를 얻어옵니다 
	    var neLatLng = bounds.getNorthEast(); 
		
		console.log('지도의 중심 좌표 : ' + map.getCenter().toString());
		console.log('지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng());
	    console.log('북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng());
	    
		$.ajax({
			url: baseUrl + '/mapMatchList.do',
			method:'GET',
			dataType:'json',
			headers: { 
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			data : {
				eventTypeCd		: $('input[name="viewChoice"]:checked:checked').val(),
				swLatitude 		: swLatLng.getLat(),
				swLongitude 	: swLatLng.getLng(),
				neLatitude 		: neLatLng.getLat(),
				neLongitude 	: neLatLng.getLng()
			},
			success : function(result) {
				console.log('result :: ' + result.length);
				$(result).each(function(i) {
					addMarker(new daum.maps.LatLng(result[i].placeLatitude, result[i].placeLongitude));
				});
				console.log('마커배열 길이 :'+markers.length);
				setMarkers(map);
			}
		});
	}
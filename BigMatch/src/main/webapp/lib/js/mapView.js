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
	var overlay; // 커스텀 오버레이
	
	function moveMatchDetail(matchSeq) {
		location.href = 'matchDetailView.html?matchSeq=' + matchSeq;
	}
	
	function addMarker(result) {
//		console.log("타입 :: " + Array.isArray(result));
		
		if(Array.isArray(result)) {
//			console.log('result array :: ' + result[0].placeLatitude);
//			console.log('위치 :: ' + result[0].placeLatitude + ', ' + result[0].placeLongitude);
			// 마커를 생성합니다
			marker = new daum.maps.Marker({
				position: new daum.maps.LatLng(result[0].placeLatitude, result[0].placeLongitude)
			});
			
//			console.log('result[0] ::: ' + result[0].placeLatitude + ', ' + result[0].placeLongitude);
			// 임시로 1개 이상일 경우 크기 지정. (추후 수정부분)
			if(result.length > 1) {
				var content = '<div id="wrapper" style="height:163px">' + 
				'    			<div id="info" style="height:152px">';
			} else {
				var content = '<div id="wrapper">' + 
				'    			<div id="info">';
			}
			
			for(var i = 0; i < result.length; i++) {
				content += '<div class="list" onclick="moveMatchDetail(' + result[i].matchingInfoSeq + ')">' + 
				'            <div class="userImg">' +
				'                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="100%" height="100%">' +
				'           </div>' + 
				'            <div class="desc">' + 
				'                <div class="matchTitle">매칭 제목 : ' + result[i].matchingTitle + '</div>' + 
				'                <div class="name matchTitle">이름 : ' + result[i].hostUser.name + '</div>' + 
				'                <div class="level matchTitle">희망실력 : ' + result[i].targetStartLevel + '</div>' + 
				'            </div>' + 
				'        </div>';
			}
			
			content += '</div></div>';
			
			// 커스텀 오버레이를 생성합니다
			overlay = new daum.maps.CustomOverlay({
				content : content
			});
			
			// 생성된 마커를 배열에 추가합니다
			markers.push({marker, overlay});
		} else {
			console.log('위치 :: ' + result.placeLatitude + ', ' + result.placeLongitude);
			// 마커를 생성합니다
			marker = new daum.maps.Marker({
				position: new daum.maps.LatLng(result.placeLatitude, result.placeLongitude)
			});
			
			var content = '<div id="wrapper">' + 
			'    			<div id="info">';
			content += '<div class="list" onclick="moveMatchDetail(' + result.matchingInfoSeq + ')">' + 
			'            <div class="userImg">' +
			'                <img src="http://cfile181.uf.daum.net/image/250649365602043421936D" width="100%" height="100%">' +
			'           </div>' + 
			'            <div class="desc">' + 
			'                <div class="matchTitle">매칭 제목 : ' + result.matchingTitle + '</div>' + 
			'                <div class="name matchTitle">이름 : ' + result.hostUser.name + '</div>' + 
			'                <div class="level matchTitle">희망실력 : ' + result.targetStartLevel + '</div>' + 
			'            </div>' + 
			'        </div>';
			content += '</div></div>';
			
			// 커스텀 오버레이를 생성합니다
			overlay = new daum.maps.CustomOverlay({
				content : content
			});
			
			// 생성된 마커를 배열에 추가합니다
			markers.push({marker, overlay});
			
		}
	}
	
	// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
	function setMarkers(map) {
		console.log('markers ::::::: ' + markers);
	    for (var i = 0; i < markers.length; i++) {
	    	console.log('markers['+i+'] 위치 ::::::: ' + markers[i].marker.getPosition());
	    	markers[i].marker.setMap(map);
	    	// map이 null이 아닐경우 맵지역을 클릭 시 커스텀 오버레이 close.
	    	if(map != null) {
	    		setOverlay(markers[i], markers, map);
	    	}
	    }
	}
    
	function setOverlay(clickMarker, totalMarkers, map) {
		// 마커 클릭시 다른 곳에 오버레이가 활성화 되있다면 close
		daum.maps.event.addListener(clickMarker.marker, 'click', function() {
			for (var i = 0; i < totalMarkers.length; i++) {
				if(!!totalMarkers[i].overlay) {
					totalMarkers[i].overlay.setMap(null);
				}
			}
			// 마커 클릭시 커스텀 오버레이 표시
			// 클릭한 마커를 중심으로 바뀜.
			map.setCenter(clickMarker.marker.getPosition());
			clickMarker.overlay.setPosition(clickMarker.marker.getPosition());
			clickMarker.overlay.setMap(map);
    	});
//		 맵을 클릭시 커스텀 오버레이 close
//		daum.maps.event.addListener(map, 'click', function() {
//			clickMarker.overlay.setMap(null);
//    	});
	}
	
	// 드래그가 끝났을 시 마커 핀 업데이트.
	daum.maps.event.addListener(map, 'dragend', function() {
		// 드래그가 끝났을 시 커스텀 오버레이 close
		for (var i = 0; i < markers.length; i++) {
			if(!!markers[i].overlay) {
				markers[i].overlay.setMap(null);
			}
		}
		setMarkers(null); // 드레그가 끝났을 시 마커 객체 삭제
		console.log('마커배열 길이 :'+markers.length);
		console.log(markers.length);
		markers=[]; // 마커 객체 배열 초기화
	    viewMarkers();
	});
	
	// 확대가 변경 됐을 시 마커 핀 업데이트.
	daum.maps.event.addListener(map, 'zoom_changed', function() {
		// 드래그가 끝났을 시 커스텀 오버레이 close
		for (var i = 0; i < markers.length; i++) {
			if(!!markers[i].overlay) {
				markers[i].overlay.setMap(null);
			}
		}
		setMarkers(null);
		markers=[];
		viewMarkers();
	});
	
	$('.eventView').bind('click', function(){
		// 드래그가 끝났을 시 커스텀 오버레이 close
		for (var i = 0; i < markers.length; i++) {
			if(!!markers[i].overlay) {
				markers[i].overlay.setMap(null);
			}
		}
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
				console.log('result :: ' + result);
//				console.log('result length:: ' + result.length);
				while(true) {
					var samePositionArr = [];
					if(result.length > 0 && result.length == 1) {
						addMarker(result[0]);
						console.log("도착하나?")
						break;
					} else if(result.length > 0 && result.length > 1) {
//						console.log('result[0] :: ' + result[0]);
//						console.log('result[0] 위치:: ' + result[0].placeLatitude);
//						console.log('result length:: ' + result.length);
						samePositionArr.push(result[0]);
						result.splice(0,1);
//						console.log('samePositionArr[0] :: ' + samePositionArr[0]);
//						console.log('samePositionArr[0] 위치:: ' + samePositionArr[0].placeLatitude);
						for(var i=(result.length)-1; i>=0; i--) {
//							console.log('samePositionArr[0].placeLatitude :: ' + samePositionArr[0].placeLatitude);
//							console.log('result[i].placeLatitude :: ' + result[i].placeLatitude);
							if(samePositionArr[0].placeLatitude == result[i].placeLatitude &&
									samePositionArr[0].placeLongitude == result[i].placeLongitude) {
								samePositionArr.push(result[i]);
								result.splice(i,1);
							}
						}
//						console.log('samePositionArr :: ' + samePositionArr);
//						console.log('samePositionArr 위치:: ' + samePositionArr[0].placeLatitude);
						addMarker(samePositionArr);
					} else {
						break;
					}
				}
				
				setMarkers(map);
			}
		});
	}
	
	// 밑에 리스트 이미지 클릭시 페이지 이동
	function moveListView() {
		// 지도의 현재 영역을 얻어옵니다 
	    var bounds = map.getBounds();
	    // 영역의 남서쪽 좌표를 얻어옵니다 
	    var swLatLng = bounds.getSouthWest(); 
	    // 영역의 북동쪽 좌표를 얻어옵니다 
	    var neLatLng = bounds.getNorthEast();
	    
	    location.href = 'map_list.html?' +
	    				'eventTypeCd=' + $('input[name="viewChoice"]:checked:checked').val() +
	    				'&swLatitude=' + swLatLng.getLat() + 
	    				'&swLongitude=' + swLatLng.getLng() +
	    				'&neLatitude=' + neLatLng.getLat() + 
	    				'&neLongitude=' + neLatLng.getLng();
	    
	}
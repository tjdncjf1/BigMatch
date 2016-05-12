/**
 * Program    : dupCheckSwipe.js
   Date       : 2016-05-12
   Description: match 화면 정보 출력.
   Modify     : 조민호
   History    :  
 * 
 */

// 뿌려질 대전정보 요청


function home_matchInfo(){

	$.ajax({
		url : baseUrl + '/match.do/' + userseq,
		type : 'get',
		dataType : 'json',
		headers : {
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(result) {
			// button클릭시 전송할 matchingInfoSeq 저장
			matchingInfoSeq = result.rows[0].matchingInfoSeq;
			console.log("!!!!!!!!!!!!!!!!!!dfsajkhakf"+ matchingInfoSeq);
	
			// m_nickName
			// console.log("닉넴 :: " +
			// result.rows[0].hostUser.nickname);
			$('#m_nickName').empty();
			$('#m_nickName').append(result.rows[0].hostUser.nickname);
			
	
			// m_location
			var loctionAddr = null;
			var geocoder = new daum.maps.services.Geocoder();
			var coord = new daum.maps.LatLng(Number(result.rows[0].placeLatitude), Number(result.rows[0].placeLongitude));
			var callback = function(status, addr) {
				if (status === daum.maps.services.Status.OK) {
					// console.log('지번 주소 : '+ addr[0].jibunAddress.name);
					loctionAddr = addr[0].jibunAddress.name;
	
					// console.log("loctionAddr : "+ loctionAddr);
					$('#m_location').empty();
					$('#m_location').append(loctionAddr);
				}
			};
			geocoder.coord2detailaddr(coord,callback);
			// m_time
			// console.log('시간 : '+result.rows[0].);
			$('#m_time').empty();
			$('#m_time').append(result.rows[0].year + "/");
			$('#m_time').append(result.rows[0].month + "/");
			$('#m_time').append(result.rows[0].date + " : ");
	
			var tempTime = result.rows[0].timeCd;
			var time;
			switch (tempTime) {
			case 'MID_NIGHT':
				time = '00 ~ 03시';
				break;
			case 'DAWN':
				time = '03 ~ 06시';
				break;
			case 'EARLY_MORNING':
				time = '06 ~ 09시';
				break;
			case 'MORNING':
				time = '09 ~ 12시';
				break;
			case 'AFTERNOON':
				time = '12 ~ 15시';
				break;
			case 'LATE_AFTERNOON':
				time = '15 ~ 18시';
				break;
			case 'EVENING':
				time = '18 ~ 21시';
				break;
			case 'NIGHT':
				time = '21 ~ 24시';
				break;
			}
			$('#m_time').append(time);
	
			// m_dama
			// console.log('다마수 : '+
			// result.rows[0].targetStartLevel);
			$('#m_dama').empty();
			$('#m_dama').append(result.rows[0].targetStartLevel);
	
			// m_title
			// console.log('타이틀 : '+
			// result.rows[0].matchingTitle);
			$('#m_title').empty();
			$('#m_title').append(result.rows[0].matchingTitle);
	
			// m_title
			// console.log('desc : '+
			// result.rows[0].matchingDesc);
			$('#m_desc').empty();
			$('#m_desc').append(result.rows[0].matchingDesc);
	
			
			//대전 삭제
			$('#m_deleteMatch').bind('click',function() {
				console.log("딜리트 펑션 들어옴!!!! 헤헿");
				$.ajax({
					// 매칭인포seq!!!!
					url : baseUrl+ '/matchDetail.do/'+ matchingInfoSeq,
					method : 'PUT',
					headers : {
						"Accept" : "application/json",
						"Content-Type" : "application/json"
					},
					data : JSON.stringify({
								hostUserSeq : userseq,
								visible : 'N'
							}),
					success : function(data) {
						console.log("deleteMatch() 후 받아온 결과 data값 : "+ data);
						location.href="home.html";
					}
				});
			});
			
			// 매칭 거절
			$('#m_cancleMatch').bind('click',function() {
				console.log("매칭 거절 펑션 들어옴!!!! 헤헿");
				$.ajax({
					// 매칭인포seq!!!!
					url : baseUrl+ '/matchDetail.do/'+ matchingInfoSeq+'/'+userseq,
					method : 'DELETE',
					headers : {
						"Accept" : "application/json",
						"Content-Type" : "application/json"
					},
					success : function(data) {
						console.log("deleteMatch() 후 받아온 결과 data값 : "+ data);
						location.href="home.html";
					}
				});
			});
			
			
		}
	});
}


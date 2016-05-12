/**
 * Program    : changeView.js
   Date       : 2016-05-12
   Description: 페이지마다 로딩되는 ajax 요청.
   Modify     : 서우철
   History    :   - 2016-05-12 작성자 : 서우철
                   * 랭킹 페이지 ajax function 작성.
 */

function rankListView() {
	$('#rankList').empty();
	$('#matchResultList').empty();
	
	$.ajax({
		url: baseUrl + '/userInfo.do/' + userseq,
		method:'GET',
		headers: { 
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(data) {
			//console.log("유저 정보 :: " + data.ptPointRank3b+'위 ');
			var threeballInfo = data.ptPointRank3b + '위 ';
			var fourballInfo = data.ptPointRank4b + '위 ';
			var poketInfo = data.ptPointRankp + '위 ';
			$(data.userRecordList).each(function(i){
				if(data.userRecordList[i].eventTypeCd == 'THREE') {
					threeballInfo += data.userRecordList[i].wonCount + '승 ' +
					data.userRecordList[i].drawCount + '무 ' +
					data.userRecordList[i].loseCount + '패(' +
					Number(data.userRecordList[i].winningRate) * 100 + '%)';
				} else if(data.userRecordList[i].eventTypeCd == 'FOUR'){
					fourballInfo += data.userRecordList[i].wonCount + '승 ' +
					data.userRecordList[i].drawCount + '무 ' +
					data.userRecordList[i].loseCount + '패(' +
					Number(data.userRecordList[i].winningRate) * 100 + '%)';
				} else if(data.userRecordList[i].eventTypeCd == 'POOL'){
					poketInfo += data.userRecordList[i].wonCount + '승 ' +
					data.userRecordList[i].drawCount + '무 ' +
					data.userRecordList[i].loseCount + '패(' +
					Number(data.userRecordList[i].winningRate) * 100 + '%)';
				}
			});
			$('#3ballScore').html(threeballInfo);
			$('#4ballScore').html(fourballInfo);
			$('#poolScore').html(poketInfo);
		}
	});
	
	$.ajax({
		url: baseUrl + '/userList.do/',
		method:'GET',
		headers: { 
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		data : {
			eventTypeCd : evetType,
			page : 1,
			rows : 10
		},
		success : function(data) {
			console.log("rank List 길이 :: " + data.rows.length);
			$(data.rows).each(function(i){	
				var contents = '';
				if(i == 0) {
					contents += '<li><img src="../lib/images/home/goldTrophy.png" class="rankTrophy">' +
					'<span>' + data.rows[i].nickname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
					'<span>' + data.rows[i].userRecordList[0].wonCount + '승 ' + 
					data.rows[i].userRecordList[0].drawCount + '무 ' +
					data.rows[i].userRecordList[0].loseCount + '패(' +
					Number(data.rows[i].userRecordList[0].winningRate) * 100 + '%)</li>'; 
				} else if(i == 1) {
					contents += '<li><img src="../lib/images/home/silverTrophy.png" class="rankTrophy">' +
					'<span>' + data.rows[i].nickname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
					'<span>' + data.rows[i].userRecordList[0].wonCount + '승 ' + 
					data.rows[i].userRecordList[0].drawCount + '무 ' +
					data.rows[i].userRecordList[0].loseCount + '패(' +
					Number(data.rows[i].userRecordList[0].winningRate) * 100 + '%)</li>'; 
				} else if(i == 2) {
					contents += '<li><img src="../lib/images/home/bronzeTrophy.png" class="rankTrophy">' +
					'<span>' + data.rows[i].nickname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
					'<span>' + data.rows[i].userRecordList[0].wonCount + '승 ' + 
					data.rows[i].userRecordList[0].drawCount + '무 ' +
					data.rows[i].userRecordList[0].loseCount + '패(' +
					Number(data.rows[i].userRecordList[0].winningRate) * 100 + '%)</span></li>'; 
				} else {
					contents += '<li>' + i + '위 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
					'<span>' + data.rows[i].nickname + '</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
					'<span>' + data.rows[i].userRecordList[0].wonCount + '승 ' + 
					data.rows[i].userRecordList[0].drawCount + '무 ' +
					data.rows[i].userRecordList[0].loseCount + '패(' +
					Number(data.rows[i].userRecordList[0].winningRate) * 100 + '%)</span></li>'; 
				}
				$('#rankList').append(contents);
				$('#rankList').listview('refresh');
				
			});
		}
	});
}

function matchResultView() {
	$('#matchResultList').empty();
	$.ajax({
		url: baseUrl + '/matchResultList.do/',
		method:'GET',
		headers: { 
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		data : {
			userSeq : userseq,
			page : 1,
			rows : 10
		},
		success : function(data) {
			console.log("결과 갯수" + data.rows.length);
			$(data.rows).each(function(i){
				
				var contents = '';
				var backColor = '';
				var resultVL = '';
				var evetImgSrc = '';
				var oppoNickName = '';
				var geocoder = new daum.maps.services.Geocoder();
   				var coord = new daum.maps.LatLng(Number(data.rows[i].matchingInfoVo.placeLatitude), Number(data.rows[i].matchingInfoVo.placeLongitude));
	   			var callback = function(status, addr) {
	   			    if (status === daum.maps.services.Status.OK) {
	   			        //console.log('지번 주소 : ' + addr[0].jibunAddress.name);
			   			$('#spot'+i).append('장소 : ' + addr[0].jibunAddress.name);
	   			    }
	   			};
	   			geocoder.coord2detailaddr(coord, callback);
	   			
	   			if((userseq == data.rows[i].hostUser.userSeq && data.rows[i].resultCd == 'WIN') ||
	   					(userseq == data.rows[i].appenderUser.userSeq && data.rows[i].resultCd == 'LOSE')) {
	   				backColor = '#3388CC';
	   				resultVL = '<승리>';
	   			} else if((userseq == data.rows[i].hostUser.userSeq && data.rows[i].resultCd == 'LOSE') ||
	   					(userseq == data.rows[i].appenderUser.userSeq && data.rows[i].resultCd == 'WIN')) {
	   				backColor = '#EE0E00';
	   				resultVL = '<패배>';
	   			} else if(data.rows[i].resultCd == 'DRAW') {
	   				backColor = '#8080C0';
	   				resultVL = '<무승부>';
	   			}
	   			
	   			if(data.rows[i].matchingInfoVo.eventTypeCd == 'THREE') {
	   				evetImgSrc = '../lib/images/home/3ball.png';
	   			} else if(data.rows[i].matchingInfoVo.eventTypeCd == 'FOUR') {
	   				evetImgSrc = '../lib/images/home/4ball.png';
	   			} else if(data.rows[i].matchingInfoVo.eventTypeCd == 'POOL') {
	   				evetImgSrc = '../lib/images/home/pocketball.png';
	   			}
	   			
	   			if(userseq == data.rows[i].hostUser.userSeq) {
	   				oppoNickName = data.rows[i].appenderUser.nickname;
	   			} else if(userseq == data.rows[i].appenderUser.userSeq) {
	   				oppoNickName = data.rows[i].hostUser.nickname;
	   			}
	   			
	   			contents += '<div class="ui-bar ui-bar-a" style="height: 110px; background-color:' + backColor + '">' +
				'				<p align="center" style="color:white; margin-top:0; margin-bottom:0; font-size:140%;">' + resultVL + '</p>' +
				'				<span><img alt="img" src="' + evetImgSrc + '" style="height:50%;"/></span>' +
				'				<div class="matchInfo">' +
				'					<p class="infoMargin" id="opponent">대전상대: ' + oppoNickName + '</p>' +
				'					<p class="infoMargin" id="spot' + i + '"></p>' + 
				'					<p class="infoMargin" id="matchDay">일자 : ' + data.rows[i].matchingInfoVo.year +'.'+
									data.rows[i].matchingInfoVo.month +'.'+ data.rows[i].matchingInfoVo.date + '</p>' + 
				'				</div>' +
				'			</div>';
	   			$('#matchResultList').append(contents);
	   			
			});
		}
	}); 
}

function searchUserNickName() {
	//$('#userNik_text').empty();
	$('#matchResultList').empty();
	$('#rankList').empty();
	$.ajax({
		url			: baseUrl + '/userInfo.do/' + userseq,
		type		: 'get',
		dataType	: 'json',
		headers		: { 
				"Accept" : "application/json",
				"Content-Type" : "application/json"
			},
		success		: function(result) {
			console.log("home userInfo : " + result);
			$('#userNik_text').html(result.nickname);
		}
	});
}



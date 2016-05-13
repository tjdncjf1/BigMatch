/**
 * Program    : dupCheckSwipe.js
   Date       : 2016-05-10
   Description: 홈화면 swiper 시 ajax에 따라 (POSSIBLE_div, REGISTERED_div, EXISTENCE_div) 속성 을 받아 matchPage UI 변경.
   Modify     : 조민호
   History    :  
 * 
 */

function dupCheckSwipe() {
	$('#matchResultList').empty();
	$.ajax({
		url : baseUrl + '/matchDupCheck.do/' + userseq,
		method : 'GET',
		headers : {
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(data) {
			console.log("받아온값 받아온 결과 data값 (home에서): " + data);

			// data test ///////////////////////
			// data = "ALREADY_REGISTERED";
			// console.log("변경시킨 값 : "+data);
			// ////////////////////////////

			// 결과에 따라 다른 UI 구성
			// DB에서 받아온 data 에 따라 구성되어 있는 <div>들을 display : none ->
			// block 으로 변경 시킴

			if (data == "POSSIBLE_ACTION") { // 매치등록 가능상태
				document.getElementById("POSSIBLE_div").style.display = "block";
				document.getElementById("BASE_div").style.display = "none";
			} else if (data == "ALREADY_REGISTERED") { // 이미 매치를 등록한 상태
				
				document.getElementById("POSSIBLE_div").style.display = "none";
				document.getElementById("BASE_div").style.display = "block";
				document.getElementById("REGISTERED_div").style.display = "block";
				document.getElementById("EXISTENCE_div").style.display = "none";

				// 뿌려질 대전정보 요청
				home_matchInfo();
			} else if (data == "ALREADY_APPENDED") { // 이미 다른 매치에 신청한상태
				document.getElementById("POSSIBLE_div").style.display = "none";
				document.getElementById("BASE_div").style.display = "block";
				document.getElementById("REGISTERED_div").style.display = "none";
				document.getElementById("EXISTENCE_div").style.display = "block";
				
				// 뿌려질 대전정보 요청
				home_matchInfo();
			} else if (data == "APPENDER_EXISTENCE") { // 내가 등록한 매치에 신청자가 있는 상태
				document.getElementById("POSSIBLE_div").style.display = "none";
				document.getElementById("BASE_div").style.display = "block";
				document.getElementById("REGISTERED_div").style.display = "none";
				document.getElementById("EXISTENCE_div").style.display = "block";
				
				// 뿌려질 대전정보 요청
				home_matchInfo();
			}
		}
	});
}
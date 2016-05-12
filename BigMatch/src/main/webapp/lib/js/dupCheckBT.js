/**
 * Program    : dupCheckSwipe.js
   Date       : 2016-05-10
   Description: 홈화면 button click 시 event (POSSIBLE_div, REGISTERED_div, EXISTENCE_div) 속성 을 받아 toast 출력.
   Modify     : 서우철
   History    :  
 * 
 */

function dupCheckBT(){
	
	 $.ajax({
		url: baseUrl + '/matchDupCheck.do/' +userseq,
		method:'GET',
		headers: { 
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		success : function(data) {
			console.log("받아온 결과 data값 : "+data);
			
			if(data == "POSSIBLE_ACTION") { // 매치등록 가능상태
				console.log('등록 가능');
				location.href = "../matchlist/addMatch.html"; 
			} else if(data == "ALREADY_REGISTERED")	{ // 이미 매치를 등록한 상태
				 $.toast({
	   	   		    //heading: 'Error',
	   	   		    text: '이미 등록한 매칭이 있습니다.',
	   	   			position: 'bottom-left',
	   	   		    icon: 'error',
	   	   			textAlign: 'center'
	   			});
			} else if(data == "ALREADY_APPENDED")	{ // 이미 다른 매치에 신청한 상태
				$.toast({
	   	   		    //heading: 'Error',
	   	   		    text: '이미 신청한 매칭이 있습니다.',
	   	   			position: 'bottom-left',
	   	   		    icon: 'error',
	   	   		  	textAlign: 'center'
	   			}); 
			} else if (data == "APPENDER_EXISTENCE") { // 내가 등록한 매치에 신청자가 있는 상태
				view=3;
	   			location.href='../main/home.html?viewNum=' + view + '&toastBoolean=0';				
			}
		}
	}); 
}
/**
   Program    : joinValidation.js
   Description: 회원가입 유효성 검사.
   Modify     : 서우철
   History    :   - 2016-04-15 작성자 : 서우철
                   * 회원가입 유효성 검사 추가 (추후에 DB랑 연동해서 아이디 중복검사 추가해야함).
                  - 2016-04-16 작성자 : 조민호
                   * pw 암호화 작업 추가
                  - 2016-04-19 작성자 : 서우철
                   * pw 특수문자,영문,숫자 포함하게 정규식 작성

*/
	
// 패스워드 정규식.
$.validator.addMethod("passwordCk",  function( value, element ) {
	return this.optional(element) ||  /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(value);
}, '영문,숫자,특수문자 포함'); 

$.validator.addMethod('emailCheck', function(email) {
	$.ajax({
		url: baseUrl + '/dupCheck.do',
		method: 'POST',
		dataType:'JSON',
		headers: { 
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		data: JSON.stringify({
			userId: $('#userId').val()
		}),
		cache:false,
		async:false,
		success: function(answer) {
			console.log("answer :: " + answer);
			result = answer.result == 'SUCCESS' ? true : false;
//			console.log(result);
		}
	});
	console.log(result);
	return result;
}, '');

$.validator.addMethod('nickNameCheck', function(email) {
	$.ajax({
		url: baseUrl + '/dupCheck.do',
		method: 'POST',
		dataType:'JSON',
		headers: { 
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		data: JSON.stringify({
			nickname: $('#nickname').val()
		}),
		cache:false,
		async:false,
		success: function(answer) {
			console.log("answer :: " + answer);
			result = answer.result == 'SUCCESS' ? true : false;
//			console.log(result);
		}
	});
	console.log(result);
	return result;
}, '');

// 기본 형태
//$('#registerForm').validate();  // 유효성 검사를 적용
$('#registerForm').validate({
	onkeyup : function(element){this.element(element);},
	rules: {
		userId:{
			required:true,
			email:true,
			emailCheck: true
		},
        password: {
        	required: true,
			minlength: 8,
			passwordCk: true
        },
        confirmPassword: {
        	required:true, 
        	equalTo:'#password'
        	},               
        nickname: {
        	required:true, 
        	minlength: 4,
        	nickNameCheck: true
        }
    },
    messages: {
    	userId: {
             required:'email을 입력하세요.',
             email:'올바른 이메일을 입력하시오.',
             emailCheck : '입력하신 email은 이미 존재하는 이메일입니다.'
        },
        password: {
        	required: '암호를 입력하세요',
			minlength: '8자리 이상 입력하세요.'
        },
        confirmPassword: {
            required: '암호확인을 입력하시오.',
            equalTo:'암호를 다시 확인하세요' 
		},
		nickname: {
			required:'닉네임을 입력하시오.',
			minlength:'닉네임이 짧습니다.',
			nickNameCheck : '입력하신 닉네임은 이미 존재하는 닉네임입니다.'
		}
    },
    submitHandler: function (){ //유효성 검사를 통과시 전송
    	//암호화 과정
    	var rawData = $('#password').val();			// -> 입력받은 암호값
    	console.log('입력받은 비밀번호 : ' + rawData);
    	var resultData = sha256(rawData);			// -> 변환된 암호값
    	console.log('암호화된 비밀번호 : ' + resultData);
    	$.ajax({
    		url: baseUrl + '/membership.do',
    		method:'POST',
    		dataType:'json',
    		headers: { 
    			"Accept" : "application/json",
    			"Content-Type" : "application/json"
    		},
    		data : JSON.stringify({
    			userId   : $('#userId').val(),
    			password : resultData,
    			nickname : $('#nickname').val(),
    			gender   : $('input[name="gender"]:checked:checked').val()
    		}),
    		success : function(event) {
    			if(event.result == 'SUCCESS') {
					alert('회원 가입 성공');
					location.href = "login.html";
				} else {
					alert('회원 가입 실패');
				}
    		}
    	});
    },
    invalidHandler: function() { // 모두 입력 안했을 시
		alert('모두 입력해주세요.');
	}
   
});

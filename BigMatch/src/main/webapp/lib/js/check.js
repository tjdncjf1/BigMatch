/*
   Program    : check.js
   Description: 회원가입 유효성 검사.
   Modify     : 서우철
   History    :   - 2016-04-15 작성자 : 서우철
                   * 회원가입 유효성 검사 추가 (추후에 DB랑 연동해서 아이디 중복검사 추가해야함). 

*/
$(function(){
	
	// 기본 형태
	//$('#registerForm').validate();  // 유효성 검사를 적용
	
	$('#registerForm').validate({
		rules: {
			//userId:{required:true, minlength:3, remote:"Validate"},
			userId:{required:true, email:true},
            password: {
            	required: true,
				minlength: 8	
            },
            confirmPassword: {
            	required:true, 
            	equalTo:'#password'
            	},               
            name: {
            	required:true, 
            	minlength: 4,
            }
        },
        messages: {
        	userId: {
                 required:'email을 입력하세요.',
                 email:'올바른 이메일을 입력하시오.'
                 //remote : jQuery.format("입력하신 {0}는 이미존재하는 아이디입니다. ")
            },
            password: {
            	required: '암호를 입력하세요',
				minlength: '8자리 이상 입력하세요.'
            },
            confirmPassword: {
                required: '암호확인을 입력하시오.',
                equalTo:'암호를 다시 확인하세요' 
			},
			name: {
				required:'닉네임을 입력하시오.',
				minlength:'닉네임이 짧습니다.'
			}
        },
        submitHandler: function (){ //유효성 검사를 통과시 전송
        	//frm.submit();
        	$.ajax({
        		url:'/membership.do',
        		method:'POST',
        		dataType:'json',
        		headers: { 
        			"Accept" : "application/json",
        			"Content-Type" : "application/json"
        		},
        		data : JSON.stringify({
        			userId   : $('#userId').val(),
        			password : $('#password').val(),
        			name     : $('#name').val(),
        			gender   : $('input[name="gender"]:checked:checked').val()
        		}),
        		success : function(event) {
        			location.href = "login.html";
        		}
        	});
        },
        invalidHandler: function() { // 모두 입력 안했을 시
			alert('모두 입력해주세요.');
		}
       
    });
	
});
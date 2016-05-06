/**
 * Program    : common.js
   Date       : 2016-04-19
   Description: 공통된 자바스크립트 모음.
   Modify     : 서우철
   History    :   - 2016-04-19 작성자 : 서우철
                   * 공통으로 사용하는 url 글로벌 변수 추가
                  - 2016-04-26 작성자 : 서우철
                   * home.html view 화면우선순위 글로벌 변수 추가. 
 */
var baseUrl = 'http://localhost:8080';
//var baseUrl = 'http://192.168.0.22:8080'; // host 파일에 등록된 url

//home.html에 view 화면우선순위
// 0: 추천 1: 기록 2: 메인 3: 대전알림 4: 더보기
var view = 2;
				
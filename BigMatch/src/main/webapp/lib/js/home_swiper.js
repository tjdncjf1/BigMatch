/**
 * Program    : common.js
   Date       : 2016-04-21
   Description: 홈화면 swiper 속성 수정.
   Modify     : 서우철
   History    :   - 2016-04-21 작성자 : 서우철
                   * swiper를 먹이기 위해 속성 부여. 
 * 
 */



$(function(){
	var swiper = new Swiper('.swiper-container', {
		initialSlide: view, // 두번째 페이지(div)가 첫화면으로 띄움(home화면)
		loop: false, // 1페이지(추천페이지)에서 왼쪽으로 더이상 swipe 못하게 막음
		spaceBetween: 29, // 페이지 사이마다 공간 부여
		pagination: '.swiper-pagination',
		paginationClickable: true,
		paginationBulletRender: function (index, className) {
			if(index == 0) {
				return '<span class="' + className + '"><div align="center"><img src="../lib/images/home/thumb_up.png"></div></span>';
			} else if (index == 1) {
				return '<span class="' + className + '"><div align="center"><img src="../lib/images/home/record.png"></div></span>';
			} else if (index == 2) {
				return '<span class="' + className + '"><div align="center"><img src="../lib/images/home/home.png"></div></span>';
			} else if (index == 3) {
				return '<span class="' + className + '" onclick="dupCheckSwipe()"><div align="center"><img src="../lib/images/home/match.png"></div></span>';
			} else {
				return '<span class="' + className + '"><div align="center"><img src="../lib/images/home/more.png"></div></span>';
			}
		}
	});
});

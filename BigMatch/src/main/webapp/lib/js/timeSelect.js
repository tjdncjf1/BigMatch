var now = new Date();

var nowH = now.getHours()+'시';

if ((now.getHours()+3) >= 24) {
	var after3H = '내일 '+(now.getHours()-21)+'시';
} else {
	var after3H = (now.getHours()+3)+'시';
}

if ((now.getHours()+6) >= 24) {
	var after6H = '내일 '+(now.getHours()-18)+'시';
} else {
	var after6H = (now.getHours()+6)+'시';
}

if ((now.getHours()+9) >= 24) {
	var after9H = '내일 '+(now.getHours()-15)+'시';
} else {
	var after9H = (now.getHours()+9)+'시';
}

if ((now.getHours()+12) >= 24) {
	var after12H = '내일 '+(now.getHours()-12)+'시';
} else {
	var after12H = (now.getHours()+12)+'시';
}

if ((now.getHours()+15) >= 24) {
	var after15H = '내일 '+(now.getHours()-9)+'시';
} else {
	var after15H = (now.getHours()+15)+'시';
}

if ((now.getHours()+18) >= 24) {
	var after18H = '내일 '+(now.getHours()-6)+'시';
} else {
	var after18H = (now.getHours()+18)+'시';
}

if ((now.getHours()+21) >= 24) {
	var after21H = '내일 '+(now.getHours()-3)+'시';
} else {
	var after21H = (now.getHours()+21)+'시';
}

if ((now.getHours()+24) >= 24) {
	var after24H = '내일 '+(now.getHours())+'시';
} else {
	var after24H = (now.getHours()+24)+'시';
}


//var timeSelect = 
//	'<div class="ui-field-contain">'
//	    +'<select name="selectTime" id="select-custom-1" data-native-menu="false">'
//	    +'    <option value="'+now.getHours()+'">'+nowH+' ~ '+after3H+'</option>'
//	    +'    <option value="'+(now.getHours()+3)+'">'+after3H+' ~ '+after6H+'</option>'
//		+'    <option value="'+(now.getHours()+6)+'">'+after6H+' ~ '+after9H+'</option>'
//		+'    <option value="'+(now.getHours()+9)+'">'+after9H+' ~ '+after12H+'</option>'
//		+'    <option value="'+(now.getHours()+12)+'">'+after12H+' ~ '+after15H+'</option>'
//		+'    <option value="'+(now.getHours()+15)+'">'+after15H+' ~ '+after18H+'</option>'
//		+'    <option value="'+(now.getHours()+18)+'">'+after18H+' ~ '+after21H+'</option>'
//		+'    <option value="'+(now.getHours()+21)+'">'+after21H+' ~ '+after24H+'</option>'
//		+'</select>'
//		+'</div>';
var timeSelect = 
	'<div class="ui-field-contain">'
	    +'<select name="selectTime" id="select-custom-1" data-native-menu="false">'
	    +'    <option value="'+now.getHours()+'">'+nowH+' ~ '+after3H+'</option>'
	    +'    <option value="'+(now.getHours()+3)+'">'+after3H+' ~ '+after6H+'</option>'
		+'    <option value="'+(now.getHours()+6)+'">'+after6H+' ~ '+after9H+'</option>'
		+'    <option value="'+(now.getHours()+9)+'">'+after9H+' ~ '+after12H+'</option>'
		+'    <option value="'+(now.getHours()+12)+'">'+after12H+' ~ '+after15H+'</option>'
		+'    <option value="'+(now.getHours()+15)+'">'+after15H+' ~ '+after18H+'</option>'
		+'    <option value="'+(now.getHours()+18)+'">'+after18H+' ~ '+after21H+'</option>'
		+'    <option value="'+(now.getHours()+21)+'">'+after21H+' ~ '+after24H+'</option>'
		+'</select>'
		+'</div>';

document.write(timeSelect);	
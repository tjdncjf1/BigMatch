	var now = new Date().getHours();
	
	if ($('#select-custom-1').val() == '1' ) {
		if ( now > 3 ) {
			var able01 = 'disabled="disabled"';
		} else {
			var able01 = '';
		}
	}
	if ($('#select-custom-1').val() == '1' ) {
		if ( now > 6 ) {
			var able02 = 'disabled="disabled"';
		} else {
			var able02 = '';
		}
	}
	if ($('#select-custom-1').val() == '1' ) {
		if ( now > 9 ) {
			var able03 = 'disabled="disabled"';
		} else {
			var able03 = '';
		}
	}
	if ($('#select-custom-1').val() == '1' ) {
		if ( now > 12 ) {
			var able04 = 'disabled="disabled"';
		} else {
			var able04 = '';
		}
	}
	if ($('#select-custom-1').val() == '1' ) {
		if ( now > 15 ) {
			var able05 = 'disabled="disabled"';
		} else {
			var able05 = '';
		}
	}
	if ($('#select-custom-1').val() == '1' ) {
		if ( now > 18 ) {
			var able06 = 'disabled="disabled"';
		} else {
			var able06 = '';
		}
	}
	if ($('#select-custom-1').val() == '1' ) {
		if ( now > 21 ) {
			var able07 = 'disabled="disabled"';
		} else {
			var able07 = '';
		}
	}
	if ($('#select-custom-1').val() == '1' ) {
		if ( now > 24 ) {
			var able08 = 'disabled="disabled"';
		} else {
			var able08 = '';
		}
	}
	

	var timeSelect = 
	'<table>'+
	'<tr>'+
	'<td>'+
	'<div class="ui-field-contain">'+
	'<select name="daySelect" id="select-custom-1" data-native-menu="false">'+
	'<option value="1">오늘</option>'+
	'<option value="2">내일</option>'+
	'</select>'+
	'</div>'+
	'</td>'+
	'<td>'+
	'<div class="ui-field-contain">'+
	'<select name="selectTime" id="select-custom-18" data-native-menu="false">'+
	'<option value="MID_NIGHT" '+ able01 +'>00시 ~ 03시</option>'+
	'<option value="DAWN" '+ able02 +'>03시 ~ 06시</option>'+
	'<option value="EARLY_MORNING" '+ able03 +'>06시 ~ 09시</option>'+
	'<option value="MORNING" '+ able04 +'>09시 ~ 12시</option>'+
	'<option value="AFTERNOON" '+ able05 +'>12시 ~ 15시</option>'+
	'<option value="LATE_AFTERNOON" '+ able06 +'>15시 ~ 18시</option>'+
	'<option value="EVENING" '+ able07 +'>18시 ~ 21시</option>'+
	'<option value="NIGHT" '+ able08 +'>21시 ~ 24시</option>'+
	'</select>'+
	'</div>'+
	'</td>'+
	'</tr>'+
	'</table>';
	
	
	document.write(timeSelect);
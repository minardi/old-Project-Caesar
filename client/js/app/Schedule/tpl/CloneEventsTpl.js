templates.cloneEventsTpl = _.template([
'	Clone events to next',
'	<input type="text" class="weeksNumber" value="1"> </input>',
'	<select class="form-control resourceSorting">',
'		<option value="0">weeks</option>',
'		<option value="1">days</option>',
'	</select>',
'	<button class="btn btn-primary">Clone</button>'].join(''));
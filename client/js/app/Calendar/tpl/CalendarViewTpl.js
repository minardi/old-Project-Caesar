var calendarRowTpl = _.template([
'	<tr>',
'		<td>',
'			<%= timeline %>',
'		</td>',

'		<td day= "<%= day %>" timeline = "<%= timeline %>">',
'		</td>',

'		<td day= "<%= day = day + 1 %>" timeline = "<%= timeline %>">',
'		</td>',

'		<td day= "<%= day = day + 1 %>" timeline = "<%= timeline %>">',
'		</td>',

'		<td day= "<%= day = day + 1 %>" timeline = "<%= timeline %>">',
'		</td>',

'		<td day= "<%= day = day + 1 %>" timeline = "<%= timeline %>">',
'		</td>',
'	</tr>'].join(''));

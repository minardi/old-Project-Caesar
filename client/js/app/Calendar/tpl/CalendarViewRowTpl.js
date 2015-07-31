var calendarRowTpl = _.template([
'	<tr  timeline = "<%= timeline %>">',
'		<td>',
'			<%= timeline %>',
'		</td>',
'		<td day= "<%= day %>">',
'		</td>',
'		<td day= "<%= day = day + 1 %>">',
'		</td>',
'		<td day= "<%= day = day + 1 %>">',
'		</td>',
'		<td day= "<%= day = day + 1 %>">',
'		</td>',
'		<td day= "<%= day = day + 1 %>">',
'		</td>',
'	</tr>'].join(''));

var daysRowTpl = _.template([
'	<tr>',
'		<td>',
'		</td>',
'		<td>',
'			Monday',
'		</td>',
'		<td>',
'			Tuesday',
'		</td>',
'		<td>',
'			Wednesday',
'		</td>',
'		<td>',
'			Thursday',
'		</td>',
'		<td>',
'			Friday',
'		</td>',
'	</tr>',
'	<tr>',
'		<td></td>',
'		<td>',
'			<%= startDate.getDate() + "." + Number(startDate.getMonth() + 1) %>',
'		</td>',
'		<td>',
'			<% startDate.setDate(startDate.getDate() + 1)  %>',
'			<%= startDate.getDate() + "." + Number(startDate.getMonth() + 1) %>',
'		</td>',
'		<td>',
'			<% startDate.setDate(startDate.getDate() + 1)  %>',
'			<%= startDate.getDate() + "." + Number(startDate.getMonth() + 1) %>',
'		</td>',
'		<td>',
'			<% startDate.setDate(startDate.getDate() + 1)  %>',
'			<%= startDate.getDate() + "." + Number(startDate.getMonth() + 1) %>',
'		</td>',
'		<td>',
'			<% startDate.setDate(startDate.getDate() + 1)  %>',
'			<%= startDate.getDate() + "." + Number(startDate.getMonth() + 1) %>',
'		</td>',
'	</tr>'].join(''));
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
'			<%= startDate.getDate() + "." + startDate.getMonth() %>',
'		</td>',
'		<td>',
'			<% startDate.setDate(startDate.getDate() + 1)  %>',
'			<%= startDate.getDate() + "." + startDate.getMonth() %>',
'		</td>',
'		<td>',
'			<% startDate.setDate(startDate.getDate() + 1)  %>',
'			<%= startDate.getDate() + "." + startDate.getMonth() %>',
'		</td>',
'		<td>',
'			<% startDate.setDate(startDate.getDate() + 1)  %>',
'			<%= startDate.getDate() + "." + startDate.getMonth() %>',
'		</td>',
'		<td>',
'			<% startDate.setDate(startDate.getDate() + 1)  %>',
'			<%= startDate.getDate() + "." + startDate.getMonth() %>',
'		</td>',
'	</tr>'].join(''));
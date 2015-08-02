var weeksTpl = [
'<% _.each(events, function (event, i) {%>',
'		<a data-id = "<%= event.get("id") %>"><%= event.get("name") %></a>',
'<% }) %>'
].join('\n');
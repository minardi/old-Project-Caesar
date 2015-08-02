var scheduleConflictTpl = [
'<%= event.name %></br>',
'<% _.each(conflicts, function (resourceId, i) { %>',
'<b><%= cs.resources.get(resourceId).get("type") %>:</b>',
'<%= cs.resources.get(resourceId).get("name") %>',
'</br>',
'<% }) %>',
].join('\n');
templates.sheduleCellTpl = _.template([
'	<div class="myPanel myPanel-primary">',
'   	<div class="myPanel-heading">',
'			event',
'			<button class="close">',
'   	 		<span>&times;</span>',
'			</button>',
'		</div>',
'   	<div class="myPanel-body">',
'				<%= value%>',
'		</div>',
' 	</div>'].join(''));
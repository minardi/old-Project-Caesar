templates.cloneEventsTpl = _.template([
'	<div class="row">',
'		<div class="col-md-8">',
'			<div class="radio">',
'  				<label><input type="radio" name="optradio" param="days">',
'					copy to next ',
'					<input type="number" class="weeksNumber" value="1"> </input>',
'				</label>',
'			</div>',
'			<div class="radio">',
'  				<label><input type="radio" name="optradio" param="end">',
'					till end of group',
'				</label>',
'			</div>',
'		</div>',
'		<div class="col-md-4">',
'			<div class="btn-group-vertical">',
'  				<button type="button" class="weeks btn btn-primary">Weeks</button>',
'   			<button type="button" class="days btn btn-primary">Days</button>',
'			</div>',
'		</div>',
'	</div>'
].join(''));


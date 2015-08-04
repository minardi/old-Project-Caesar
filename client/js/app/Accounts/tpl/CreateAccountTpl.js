'use strict';
var createAccountTpl = _.template([
	'<div class="container">',
    '<div class="row">',
        '<form role="form">',
            '<div class="col-sm-6 col-sm-offset-3 form-box">',
                '<div class="page-header">',
                    '<h3>Create an Account</h3>',
                '</div>',
                '<div class="well well-sm"><strong><span class="glyphicon glyphicon-asterisk"></span>Required Field</strong></div>',
                '<div class="form-group">',
                    '<label for="InputName">Enter Name</label>',
                    '<div class="input-group">',
                        '<input type="text" class="form-control" name="InputName" id="InputName" placeholder="Enter Name" required>',
                        '<span class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></span>',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="InputSurname">Enter Surname</label>',
                    '<div class="input-group">',
                        '<input type="text" class="form-control" name="InputSurname" id="InputSurname" placeholder="Enter Surname" required>',
                        '<span class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></span>',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="InputEmail">Enter Email</label>',
                    '<div class="input-group">',
                        '<input type="email" class="form-control" id="InputEmailFirst" name="InputEmail" placeholder="Enter Email" required>',
                        '<span class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></span>',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="InputUsername">Enter Username</label>',
                    '<div class="input-group">',
                        '<input type="text" class="form-control" name="InputUsername" id="InputUsername" placeholder="Enter Username" required>',
                        '<span class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></span>',
                    '</div>',
                '</div>',
                '<button type="submit" name="submit" id="submit" class="btn btn-info pull-right">Submit</button>',
            '</div>',
        '</form>',
    '</div>',
'</div>'].join(''));
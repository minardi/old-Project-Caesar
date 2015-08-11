'use strict';
var createAccountTpl = _.template([
    '<div class="col-md-4">',
     '<div class="col-md-6 form-box">',
        '<div class="panel panel-default">',
            '<div class="panel-heading">',
                '<form id="formAccount" role="form">',
                   '<div class="form-group">',
                    '<label for="InputFullName">Enter FullName</label>',
                    '<div class="input-group">',
                        '<input type="text" class="form-control" name="fullName" id="InputFullName" placeholder="Enter FullName">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="InputLogin">Enter Login</label>',
                    '<div class="input-group">',
                        '<input type="text" class="form-control" name="login" id="InputLogin" placeholder="Enter Login">',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="InputPassword">Enter Password</label>',
                    '<div class="input-group">',
                        '<input type="password" class="form-control" name="password" id="InputPassword" placeholder="Enter Password">',
                    '</div>',
                '</div>',
                 '<div class="form-group">',
                    '<label for="InputCountry">Enter City</label>',
                     '<div class="input-group">',
                        '<select class="form-control" id="selectCity" size=6 name="city">',
                            '<option value="Lviv">Lviv</option>',
                            '<option value="Rivne">Rivne</option>',
                            '<option value="Ivano-Frankivsk">Ivano-Frankivsk</option>',
                            '<option value="Chernivtsi">Chernivtsi</option>',
                            '<option value="Dnipropetrovsk">Dnipropetrovsk</option>',
                            '<option value="Kyiv">Kyiv</option>',
                        '</select>',
                    '</div>',
                '</div>',
                 '<div class="form-group">',
                    '<label for="InputCity">Select Country</label>',
                    '<div class="input-group">',
                        '<select class="form-control" id="selectCountry" size=2 name="country">',
                            '<option value="Ukraine">Ukraine</option>',
                            // '<option value="Poland">Poland</option>',
                            // '<option value="Bulgaria">Bulgaria</option>',
                        '</select>',
                    '</div>',
                '</div>',
                '<div class="form-group">',
                    '<label for="InputRole">Enter Role</label>',
                    '<div class="input-group">',
                    '<select class="form-control" id="selectRole" size=2 name="role">',
                            '<option value="Admin">Admin</option>',
                            '<option value="Coordinator">Coordinator</option>',
                    '</select>',
                    '</div>',
                '</div>',
        '</form>',
        '<button type="button" class="btn btn-warning back">Close</button>',
        '<button type="button" class="btn btn-info save pull-right">Save</button>', 
            '</div>',
        '</div>',
    '</div>',
'</div>'
].join(''));
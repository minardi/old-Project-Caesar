templates.createAccountTpl = _.template([
        '<div class="modal-backdrop fade in"></div>',
        '<div class="modal-dialog modal-md">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                     '<h4 class="modal-title">Create/Edit account</h4>',
                '</div>',
                '<div class="modal-body clearfix">',
                    '<div class="accountForm">',
                    '<div class="form-group" class="col-xs-4">',
                        '<label for="InputFullName">Enter FullName</label>',
                        '<input type="text" class="form-control" value="<%= fullName %>" name="fullName" id="InputFullName" placeholder="Enter FullName">',
                    '</div>',
                    '<div class="form-group" class="col-xs-4">',
                        '<label for="InputLogin">Enter Login</label>',
                        '<input type="text" class="form-control" value="<%= login %>" name="login" id="InputLogin" placeholder="Enter Login">',
                    '</div>',
                    '<div class="form-group" class="col-xs-4">',
                         '<label for="InputPassword">Enter Password</label>',
                        '<input type="text" class="form-control" value="<%= password %>" name="password" id="InputPassword" placeholder="Enter Password">',
                    '</div>',
                    '<div class="form-group">',
                        '<label for="locationCity">Select City</label>',
                        '<select class="form-control listbox" name="locationCity">',
                            '<%_.each(locationCity, function (city) {%>',
                                '<% if (city.id === cityId) { %>',
                                    '<option selected value="<%= city.id %>">',
                                        '<%= city.name %>',
                                    '</option>',
                                '<% } %>',
                                    '<option value="<%= city.id %>">',
                                        '<%= city.name %>',
                                    '</option>',
                                '<% }) %>',
                        '</select>',
                    '</div>',
                    '<div class="form-group">',
                        '<label for="role">Select Role</label>',
                         '<select class="form-control" name="role">',
                            '<option value="Coordinator" selected>Coordinator</option>',
                            '<option value="Admin">Admin</option>',
                        '</select>',
                      '</div>',
                    '</div>',
                    '<button type="button" class="btn btn-info save pull-right">',
                        '<i class="glyphicon glyphicon-floppy-saved"></i> Save',
                    '</button>',
                    '<button type="button" class="btn btn-default cancel pull-left">',
                        '<i class="glyphicon glyphicon-floppy-remove"></i> Back',
                    '</button>',
                '</div>',
            '</div>',
        '</div>'].join(''));  
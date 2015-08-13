templates.cityTpl = _.template([
        '<div class="panel panel-default">',
            '<div class="panel-heading">',
                '<p>Select country to add city</p>',
                 '<select class="form-control" id="selectCountry" name="locationCountry">',
                    '<%_.each(locationCountry, function (country) {%>',
                        '<option value="<%= country.id %>">',
                            '<%= country.name %>',
                        '</option>',
                    '<%})%>',
                '</select>',
            '</div>',
            '<ul class="cities list-group">',
            '</ul>',
            '<div>',
                '<input class="new-city form-control" type="text"  placeholder="Select a country at first">',
            '</div>',
        '</div>'
].join(''));
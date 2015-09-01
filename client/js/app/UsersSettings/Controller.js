(function (This) {
    This.Controller = function () {
        var userSettingsView = new This.UserSettingsView(),
            $main = $('#main');
        
        start();
        
        function start () {
            renderSettings();
            cs.mediator.subscribe('ShowUserSettings', showAll);
        }
        
        function renderSettings () {
            hideAll();
            $main.append(userSettingsView.render().el);
        }
        
        function showAll () {
            hideAll();
            userSettingsView.show();
        }
        
        function hideAll () {
            $main.children().addClass('hidden');
        }
    }
})(App.UserSetting);
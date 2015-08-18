'use strict';
(function (This) {
    This.Controller = function () {
        var $menu = $('#navbar');

        start();
        
        function start () {
            renderMenu();
        }

        function renderMenu (){
            var menuView = new This.MenuView();
            $menu.append(menuView.render().$el);
        }
		
		var logo = document.getElementById("logo");
		logo.addEventListener('click', function () {	 
			$('#logo').addClass('flip');
			setTimeout(function () {
			    $('#logo').removeClass('flip');
			} ,1100)

			// $('#logo').removeClass('bounceIn');
		},false);
    }
})(App.Menu);
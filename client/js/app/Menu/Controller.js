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
			cs.mediator.publish('MenuClicked', '/Events'); //publish to global router
			$('.menu-item').removeClass('active');
			$('.events').addClass('active');
			$('.forAdmin').css('display', 'block');
			$('.onlyAdmin').css('display', ' none ');
			$('#role').text('Coordinator');
			 User.set('coordinator');
			
			setTimeout(function () {
			    $('#logo').removeClass('flip');
			} ,1100)
		},false);
    }
})(App.Menu);
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
		
		$('#logo').click(function () {	 
			$('#logo').addClass('flip');
			cs.mediator.publish('MenuClicked', '/Events'); //publish to global router
			cs.mediator.publish('RenderHollidays'); //publish to holidaysCollection		
			$('.menu-item').removeClass('active');
			$('.events').addClass('active');
			$('.forAdmin').css('display', 'block');
			$('.onlyAdmin').css('display', ' none ');
			$('#role').text('Coordinator');
			User.set('coordinator');
			localStorage.setItem("manRole", 'coordinator');
			
			setTimeout(function () {
				$('#logo').removeClass('flip');
			} ,1100)
		});
    }
})(App.Menu);
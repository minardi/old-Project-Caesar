'use strict';

(function (This)  {
    This.Controller = function () {
        var $service = $('#main'),
            view;

        start();

        function start () {
            cs.mediator.subscribe('ShowAbout', showAbout);

            view = new This.GroupCollectionView();

            $service.append(view.render().el);
        }

        function showAbout () {
            hideAll();

			$(".a4").show();
			$(".a6").show();
			
			function second_passed() {
			    $('.a4').addClass('zoomOutUp');
				$('.a6').addClass('zoomOutUp');
			}
			setTimeout(second_passed, 3000);
				
			function second_passed1() {
			    $(".a4").hide().removeClass('zoomOutUp');
				$(".a6").hide().removeClass('zoomOutUp');
			}
			setTimeout(second_passed1, 4000);
			
            view.show();
        }

        function hideAll () {
            $service.children().addClass('hidden');
        }

        return this;
    }
})(App.About);
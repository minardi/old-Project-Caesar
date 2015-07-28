'use strict';

(function (This) {

    This.Tooltip = (function () {

        return {
            show: function (model) {
                var wrapForModel = document.createElement('div'),
				    windowHeight = $(window).height(),
				    mousePositionByY = window.event.clientY,
					changePositionByY = 30;
					
                wrapForModel.setAttribute('class', 'showFullInfo');
                document.body.appendChild(wrapForModel);
                wrapForModel.innerHTML = model;
    
				if(mousePositionByY <= 50){
					changePositionByY = (mousePositionByY - 15);
				} else if (mousePositionByY >= windowHeight - 100) {
					changePositionByY = (mousePositionByY + 135 - windowHeight);
				}
				
				
                $(window).mousemove(function (pos) {
                    $('.showFullInfo').css('left',(pos.pageX+40)+'px').css('top',(pos.pageY-changePositionByY)+'px');
                });
            },

            hide: function () {
                $('.showFullInfo').css('display','none');
            }
        };
    })();

})(App.About);
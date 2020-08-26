/*-------------------------------------------------------------------------------------------------------------
	*필수 클래스명*
	acd, acd-title, acd-list, unite, acd-subtitle, acd-content
-------------------------------------------------------------------------------------------------------------*/
function accordion(){
    var $acd_subtitle = $('.acd-subtitle');

    $acd_subtitle.on({
        'click': function(){
            var $this = $(this);

            $this.parent().next('.acd-content').stop().slideToggle('fast');
            $this.parent().parent('.unite').siblings().children('.acd-content').slideUp('fast');

            /* Effect */
            $this.parent().parent('.unite').toggleClass('is-active');
            $this.parent().parent('.unite').siblings().removeClass('is-active');

            /* WAI-ARIA Apply */
            $this.parent().parent('.unite').siblings().find('.acd-subtitle').attr({'aria-expanded':'false'});
            $this.parent().parent('.unite').siblings().find('.acd-content').attr({'aria-hidden':'true', 'tabindex':'-1'});
            if($('.acd-list .unite').hasClass('is-active')){
                $this.attr({'aria-expanded':'true'});
                $this.parent().next('.acd-content').attr({'aria-hidden':'false', 'tabindex':'0'});
            }else{
                $this.attr({'aria-expanded':'false'});
                $this.parent().next('.acd-content').attr({'aria-hidden':'true', 'tabindex':'-1'});
            }
        }
    });

};

$(document).ready(function(){
    accordion();
});
/*-------------------------------------------------------------------------------------------------------------
	*필수 클래스명*
    tabs, tab-list
    
    WAI-ARIA 사용을 원치 않으면 aria-selected, aria-hidden만 삭제
-------------------------------------------------------------------------------------------------------------*/
function tabUI(){
    var $tabActive = $('[role="tab"]');

    $tabActive.on({
        'click': function(){
            var $this = $(this),
                $tabList = $this.parent('[role="tablist"]'),
                $idx = $this.index(),
                $tabPanel = $tabList.next('.tab-contents').find('[role="tabpanel"]').eq($idx);

            /* AddClass */
            $this.addClass('is-active').siblings().removeClass('is-active');
            $tabPanel.removeClass('is-unvisual').siblings().addClass('is-unvisual');

            /* WAI-ARIA */
            $this.attr('aria-selected','true').siblings().attr('aria-selected','false'); // aria-selected
            $this.attr('tabindex','0').siblings().attr('tabindex','-1');
            $tabPanel.attr('aria-hidden','false').siblings().attr('aria-hidden','true'); // aria-hidden
        },
        
        'keyup': function(e){
            var $this = $(this),
                keyCode = e.keyCode || e.which; //키보드 코드값
            
            if(keyCode == 39 || keyCode == 40){ //오른쪽 방향키 이거나 아래 방향키
                //tab의 aria-controls 값이 tabpanel의 id값과 연결: 즉 role=tabpanel을 컨트롤 할 수 있는 변수.
                var selectedID = '#' + $this.next().attr('aria-controls');
                
                /* AddClass */
                //tab: tab의 포커스가 이동하면 배경색과 글자 색이 바뀐다.
                $this.next().addClass('is-active').siblings().removeClass('is-active');
                //tabpanel: 자신은 보이게하고 다른 tabpanel은 보이지 않게 지정한다.
                $(selectedID).removeClass('is-unvisual').siblings().addClass('is-unvisual');
                
                /* WAI-ARIA */
                //tab: 다음 tab 요소에 ara-selected=true로 지정하고, 
                //     형제 요소중에 자신 tab 이외의 나머지 tab 요소들을 aria-selected=false로 지정.
                $this.next().attr('aria-selected','true').siblings().attr('aria-selected','false'); // aria-selected
                $this.next().attr('tabindex','0').siblings().attr('tabindex','-1');
                //tabpanel: tab의 포커스가 이동하면 상응하는 tabpanel의 aria-hidden 값 변경.
                $(selectedID).attr('aria-hidden','false'); // aria-hidden
                $(selectedID).siblings().attr('aria-hidden','true'); // aria-hidden

                //오른쪽, 아래 방향키를 눌렀을 때 role=tab의 포커스 이동.
                $this.next().focus();
                
                
                //마지막 요소에서 오른쪽 방향키나 아래 방향키를 눌렀을 경우
                var tabPanelLastData = $this.closest('[role="tablist"]').next().children('[role="tabpanel"]:last-of-type').data();

                if($this.next().prevObject.attr('aria-controls') == tabPanelLastData.id){
                    //tab, tabpanel, focus 모두 처음으로 이동
                    var $firstTab =  $this.closest('[role="tablist"]').find('[role="tab"]:first-of-type'),
                        $firstTabPanel = $('[role="tabpanel"]:first-of-type');
                        console.log(tabPanelLastData);
                    /* AddClass */
                    $firstTab.addClass('is-active').siblings().removeClass('is-active');
                    $firstTabPanel.removeClass('is-unvisual').siblings().addClass('is-unvisual');

                    /* WAI-ARIA */
                    $firstTab.attr('aria-selected','true').siblings().attr('aria-selected','false'); // aria-selected
                    $firstTab.attr('tabindex','0').siblings().attr('tabindex','-1');
                    $firstTabPanel.attr('aria-hidden','false'); // aria-hidden
                    $firstTabPanel.siblings().attr('aria-hidden','true'); // aria-hidden
                    
                    $firstTab.focus();
                }
            }
            if(keyCode == 37 || keyCode == 38){ //왼쪽 방향키 이거나 위쪽 방향키: 주석 설명 오른쪽 방향키 참고
                var selectedID = '#' + $this.prev().attr('aria-controls');
                
                /* AddClass */
                $this.prev().addClass('is-active').siblings().removeClass('is-active');
                $(selectedID).removeClass('is-unvisual').siblings().addClass('is-unvisual');
                
                /* WAI-ARIA */
                $this.prev().attr('aria-selected','true').siblings().attr('aria-selected','false'); // aria-selected
                $this.prev().attr('tabindex','0').siblings().attr('tabindex','-1');
                $(selectedID).attr('aria-hidden','false'); // aria-hidden
                $(selectedID).siblings().attr('aria-hidden','true'); // aria-hidden

                $this.prev().focus();
                
                var tabPanelFirstData = $this.closest('[role="tablist"]').next().children('[role="tabpanel"]:first-of-type').data();
                
                if($this.prev().prevObject.attr('aria-controls') == tabPanelFirstData.id){
                    var $lastTab = $this.closest('[role="tablist"]').find('[role="tab"]:last-of-type'),
                        $lastTabPanel = $('[role="tabpanel"]:last-of-type');
                        console.log(tabPanelFirstData);
                    /* AddClass */
                    $lastTab.addClass('is-active').siblings().removeClass('is-active');
                    $lastTabPanel.removeClass('is-unvisual').siblings().addClass('is-unvisual');

                    /* WAI-ARIA */
                    $lastTab.attr('aria-selected','true').siblings().attr('aria-selected','false'); // aria-selected
                    $lastTab.attr('tabindex','0').siblings().attr('tabindex','-1');
                    $lastTabPanel.attr('aria-hidden','false'); // aria-hidden
                    $lastTabPanel.siblings().attr('aria-hidden','true'); // aria-hidden
                    
                    $lastTab.focus();
                }
            }
        }
    });

};

$(document).ready(function(){
    tabUI();
});
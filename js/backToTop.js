$(document).ready(function(){
    //Back to top by Amin Yusuf nu Juara thea
    
        //Scroll Offset dari atas (in pixels)
    var offset = 300,
        //Scroll back to top durasi 
        scrollTopDuration = 1000,
        //Selector Back to top
        $backtotop = $('#backtotop');
        
    $(window).scroll(function(){
       ($(this).scrollTop() > offset) ? $backtotop.fadeIn('slow') : $backtotop.fadeOut('slow');
    });
    
    $backtotop.click(function(){
        $('html, body').animate({scrollTop: 300}, scrollTopDuration);
    });
     
});
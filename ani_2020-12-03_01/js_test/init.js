// import {App} from './app.js';
$(document).ready(function(){
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        }
      });
    
      App.init(swiper);
      App.emptySlide(2,true);
      console.log(App.slides);
      App.emptySlide(1,true);

      App.setPage(1,"asdfasdfasd");
      App.setPage(2,"asdfasdfasl,ld");

});
jQuery(document).ready(function(){
  // футер: выпадашка для мобильных
  jQuery( "#js-hidden-panda" ).click(function() {
    jQuery( ".footer__nav" ).slideToggle( "slow" );
  });

  // мой сложноватый, но рабочий фикс выпадашки
  // до фикса: если пощелкать выпадашку, а потом увеличить окно, то у навигации оставался disply:block
  if (matchMedia) {
    var mq = window.matchMedia("(min-width: 765px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  // если тоже самое прописывать в css, то ломается .slideToggle
  function WidthChange(mq) {
    if (mq.matches) {
      jQuery( ".footer__nav" ).show();
    } else {
      jQuery( ".footer__nav" ).hide();
    }
  }
});

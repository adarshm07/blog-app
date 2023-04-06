$(document).ready(function(){
   $("#sliderStatusMin").html(1);
   $("#count_title").hide();
   $("#count_content").hide();



   $('#password+.passShowHide').click(function(){
      var value = $('#password').attr('type')
      if ($('#password').val().length > 0) {
        if (value == 'text') {
          $('#password').attr('type', 'password')
          $('#password+.passShowHide').removeClass('fa-eye').addClass('fa-eye-slash')
        } else {
          $('#password').attr('type', 'text')
          $('#password+.passShowHide').addClass('fa-eye').removeClass('fa-eye-slash')
        }
      }
      
   })

    // HEADER 
    var nav = $('#navigation')
    if ($(window).width() == 768) {
      nav.addClass('off');
      if ($(nav).hasClass('off')) {
        $('#navigation.sidebar a span').fadeOut();
        $('img.logo_text').fadeOut(function(){
          $('img.logo_icon').fadeIn();
        });
      } else {
        $('#navigation.sidebar a span').fadeIn();
        $('img.logo_icon').fadeIn(function(){
          $('img.logo_text').fadeIn()
        });
      }
    }
    if ($(window).width() >= 768) {
      $('#navigation .toggle').click(function(){
        nav.toggleClass('off');

        if ($(nav).hasClass('off')) {
          $(this).find('img').attr('src', 'images/toggle_off.svg')
          $('#navigation.sidebar a span').fadeOut();
          $('img.logo_text').fadeOut(function(){
            $('img.logo_icon').fadeIn();
          });
        } else {
          $(this).find('img').attr('src', 'images/toggle_on.svg')
          $('#navigation.sidebar a span').fadeIn();
          $('img.logo_icon').fadeIn(function(){
            $('img.logo_text').fadeIn()
          });
        }
      })
    }
    // if ($(window).width() <= 767) {
      // $('.mobile_menu button.toggle').click(function(){
      //   $('#navigation').addClass('mobileOn')
      //   $('.menu_dropshadow').fadeIn();
      // })
      // $('.sidebar .toggle').click(function(){
      //   $('#navigation').removeClass('mobileOn')
      //   $('.menu_dropshadow').fadeOut();
      // })
      // $('.menu_dropshadow').click(function(){
      //   $('#navigation').removeClass('mobileOn')
      //   $('.menu_dropshadow').fadeOut();
      // })
    // }
    
    // PREVIEW SIDEBAR
    $(".preview_link").click(function(){
      var id = $(this).attr('data-target');
      console.log(id);
      $(id).addClass('on');
      $('.preview_modal_dropshadow').show();
    })

    $(".preview_modal .close").click(function(){
      $(".preview_modal").removeClass('on');
      $('.preview_modal_dropshadow').hide()
    })
    $('.preview_modal_dropshadow').click(function(){
      $(".preview_modal").removeClass('on');
      $('.preview_modal_dropshadow').hide();
    })




   $('.hamb').click(function(){
       $(".prmo").toggle();
       $(".pd0").toggleClass('concate');
       $(".expire").toggleClass("exp_pos");
   });



  /////////////// Input title count  /////////////
  $("#input_title_count").on("keyup",function(){
      $("#count_title").show();
      var val = $(this).val();
      if(val.toString().length>=50){
        jQuery("#title_count").html(50);
        jQuery("input_title_count").val(val.substr(0,50));
      }else{
        jQuery("#title_count").html(val.toString().length);
      }
  })
  if ($('#input_title_count').val().length > 0) {
    $("#count_title").show();
  }
  if ($('#input_message_count').val().length > 0) {
    $("#count_content").show();
  }

  $("#input_message_count").on("keyup",function(){
    $("#count_content").show();
       var val = $(this).val();
       if(val.toString().length>=150){
         jQuery("#message_count").html(150);
         jQuery("input_message_count").val(val.substr(0,150));
       }else{
         jQuery("#message_count").html(val.toString().length);
       }
    })
  });
  /////////////// Input title count  /////////////

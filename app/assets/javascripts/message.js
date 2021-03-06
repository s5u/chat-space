$(function(){

  $(document).on('turbolinks:load', function(){

    function buildHTML(message){
      var image = message.image.url == null ? '' : `<img src="${message.image.url}">`
      var html = `<li class='chat-message' data-message-id='${message.id}'>
                    <p class='chat-message__user'>${message.user_name}<span> ${message.created_at}</span></p>
                    <p class='chat-message__content'>
                      ${message.content}
                      <div>
                        ${image}
                      </div>
                    </p>
                 </li>`
      return html;
    }

    $('#message_content, #message_image').on('input change',function(){
      if($(this).val()) {
        $('input[type="submit"]').removeAttr('disabled');
      } else {
        $('input[type="submit"]').attr('disabled', 'disabled');
      }
    })

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      }).done(function(data){
        $('.chat-messages').append(buildHTML(data));
        $('.chat-body').animate({ scrollTop: $('.chat-body')[0].scrollHeight }, 'fast');
        $('#message_content').val('');
        $('#message_image').val('');
      }).fail(function(){
        alert('メッセージの送信に失敗しました');
      });
    });

    var insterval = setInterval(function(){
      if (location.href.match(/\/groups\/\d+\/messages/)) {
        var id = $('.chat-message:last-child').data('message-id');
        $.ajax({
          url: location.pathname,
          type: 'GET',
          data: { id: id },
          dataType: 'json'
        })
        .done(function(messages){
          var insertHTML = '';
          messages.forEach(function(message){
            insertHTML += buildHTML(message);
          });
          $('.chat-messages').append(insertHTML);
        })
        .fail(function(){
          alert('データの取得に失敗しました')
        });
      } else {
        clearInterval(insterval);
      }
    }, 5 * 1000);


  })

})

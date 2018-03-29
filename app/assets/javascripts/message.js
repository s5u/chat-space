$(function(){

  function buildHTML(message){
    var image = message.image.url == null ? '' : `<img src="${message.image.url}">`
    var html = `<li class='chat-message'>
                  <p class='chat-message__user'>${message.user_name}<span> ${message.created_at}</span></p>
                  <p class='chat-message__content'>
                    ${message.content}
                    <div>
                      ${image}
                    </div>
                  </p>
               </li>`
    return html
  }

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
    })
  });

  setInterval(function(){
    $.ajax({
      url: location.pathname,
      type: 'GET',
      dataType: 'json'
    })
    .done(function(messages){
      $('.chat-messages').empty();
      messages.forEach(function(message){
        $('.chat-messages').append(buildHTML(message))
      });
    })
    .fail(function(){
      alert('データの取得に失敗しました')
    })
  }, 5000);
})

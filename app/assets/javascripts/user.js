$(function(){
  var searchResult = $('#user-search-result')

  function addUserHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    return html;
  }

  function addSelectedUserHTML(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }

  $('#user-search-field').on('keyup', function(){
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url:  '/users/',
      data: { keyword: input },
      dataType : 'json'
    })
    .done(function(users){
      searchResult.empty();
      if (users !== 0) {
        users.forEach(function(user){
          var selected_user_ids = []
          $('#chat-group-users > .chat-group-user').each(function(){
            var selected_user_id = $(this).attr('id').slice(16);
            selected_user_ids.push(selected_user_id)
          })
          if (selected_user_ids.indexOf(user.id.toString()) == -1 ) {
            searchResult.append(addUserHTML(user));
          }
        });
      }
      else {
        searchResult.append('一致するユーザーは存在しません');
      }
    })
    .fail(function(){
      alert('ユーザーの検索に失敗しました');
    })
  });

  $(document).on('click', '.chat-group-user__btn--add' , function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    $('#chat-group-users').append(addSelectedUserHTML(user_id, user_name));
  });

  $(document).on('click', '.chat-group-user__btn--remove' , function(){
    $(this).parent().remove();
  });

});


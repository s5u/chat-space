$(function(){
  var searchResult = $('#user-search-result')

  function addUserHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
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
          searchResult.append(addUserHTML(user));
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
});


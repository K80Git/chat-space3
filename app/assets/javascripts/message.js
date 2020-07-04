$(function(){
  function buildHTML(message){
    if (message.image) {
      let html =
      `<div class="Chatmain__message__box">
          <div class="Chatmain__message__box--list">
            <div class="Chatmain__message__box--list--profile">
              <div class="Chatmain__message__box--list--profile--name">
                ${message.user_name}
              </div>
              <div class="Chatmain__message__box--list--profile--time">
                ${message.created_at}
              </div>
              <div class="Chatmain__message__box--list--message">
                <img class="Message__image" src="${message.image}">
              </div>
            </div>
          </div>
        </div>`
        return html;
    } else {
      let html = 
        `<div class="Chatmain__message__box">
          <div class="Chatmain__message__box--list">
            <div class="Chatmain__message__box--list--profile">
              <div class="Chatmain__message__box--list--profile--name">
                ${message.user_name}
              </div>
              <div class="Chatmain__message__box--list--profile--time">
                ${message.created_at}
              </div>
              <div class="Chatmain__message__box--list--message">
                <p class="Message__content">
                  ${message.content}
                </p>
              </div>
            </div>
          </div>
        </div>`
        return html;
    };
  }
  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chatmain__message').append(html);      
      $('.Form')[0].reset();
      $('.Chatmain__message').animate({ scrollTop: $('.Chatmain__message')[0].scrollHeight});
      $('.Form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});

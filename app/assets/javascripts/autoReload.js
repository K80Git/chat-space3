$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
       `<div class="Chatmain__message__box" data-message-id=${message.id}>
         <div class="Chatmain__message__box--list">
           <div class="Chatmain__message__box--list--profile">
              <div class="Chatmain__message__box--list--profile--name">
                ${message.user_name}
              </div>
              <div class="Chatmain__message__box--list--profile--time">
                ${message.created_at}
              </div>
            </div>  
            <div class="Chatmain__message__box--list--message">
             <p class="Message__content">
              ${message.content}
             </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>
       </div>`
      return html;
    } else {
      let html =
        `<div class="Chatmain__message__box" data-message-id=${message.id}>
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

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.Chatmain__message__box:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る 
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.Chatmain__message').append(insertHTML);
        $('.Chatmain__message').animate({ scrollTop: $('.Chatmain__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
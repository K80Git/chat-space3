require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
        #ここはテストではなく、beforeメソッドであり、
        #事前処理を作成している。
        login user
        #controller_macrosにより定義したloginメソッドを使用
        get :index, params: { group_id: group.id }
        #indexアクションを実施する。
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
        #10行目のbeforあとのを受けて、メッセージが表示されるかを確認
        #be_a_newは対象が引数で指定したクラスのインスタンスが保存レコードか確認する。
        #最初の:messageはこれまでの条件を踏まえて作成したメッセージであり、そのメッセージが未保存かをチェックする。
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        expect(response).to render_template :index
        #受けたリクエストをresponseで受けて、その行先のindexが同じか確認
      end
    end

    context 'not log in' do
      before do
        #loginしていない状況を作成
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
        #new_user_session_pathって何？チェック
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    #paramsを作成する。
    #attribute_forはインスタンスを作成せずにハッシュとしてメッセージを作成

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }
        #subjectはハッシュの箱として事前に用意した

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
          #subjectは事前に用意した変数で、postメソッドでcreateアクションを擬似的にリクエストした結果
          #changeは引数が変化したかを確認する
          #メッセージの数1個増えたかを確認
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
        #attribute_forでcontent imageが空のメッセージハッシュを作成

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
          #not_toで違うことを確認する。
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end


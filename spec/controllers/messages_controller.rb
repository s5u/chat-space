require 'rails_helper'

RSpec.describe MessagesController, type: :controller do

  describe 'GET #index' do

    # userとgroup作成
    let(:user) { create(:user) }
    let(:group) { create(:group) }

    context 'log in' do

      # 各exampleが実行される直前にログイン
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        expect(response).to render_template :index
      end

    end

    context 'not log in' do

      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirect to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end

    end

  end

end

require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      # contextでは特定の条件をまとめることができる。
      it 'is valid with content' do
        #コンテンツがあれば、入力できるか
        expect(build(:message, image: nil)).to be_valid
        #イメージは空にして、メッセージインスタンスを作成
        #be_validは正しいか確認する。
      end

      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
      end

      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        #content imageの両方がない場合を条件
        message.valid?
        #作成したインスタンスができるかどうかを確認
        expect(message.errors[:content]).to include("を入力してください")
        #そのメッセージが何であるのかを確認
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'is invalid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
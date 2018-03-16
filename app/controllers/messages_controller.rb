class MessagesController < ApplicationController
  def index
    @groups = [ { group_name: 'group1', group_last_message: 'おはよう' }, { group_name: 'group2', group_last_message: 'こんにちは' }]
  end
end

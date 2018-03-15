# DB設計

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user|references|foreign_key: true|
|group|references|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
  has_many :messages
- has_many :members
- has_many :users, through: :menbers

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|foreign_key: true|
|group|references|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

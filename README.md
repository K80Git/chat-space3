## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|encrypted_password|string|null: false|

has_many:groups　, through: :groups_users
has_many:groups_users
has_many:messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

belong_to:user
belong_to:group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

has_many:users　, through: :groups_users
has_many:groups_users
has_many:messages


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

belong_to:user
belong_to:group
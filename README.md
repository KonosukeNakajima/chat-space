## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|string|
|image|string|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|

###Association
- has_many :groups, through :group_users
- has_many :messages
- has_many :group_users


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through :group_users
- has_many :messages
- has_many :group_users


## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

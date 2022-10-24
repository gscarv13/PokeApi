class CreateWallets < ActiveRecord::Migration[7.0]
  def change
    create_table :wallets do |t|
      t.bigint :usd_balance
      t.bigint :tokens_balance
      t.belongs_to :user

      t.timestamps
    end
  end
end

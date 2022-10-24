class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.string :operation
      t.bigint :amount
      t.belongs_to :wallet

      t.timestamps
    end
  end
end

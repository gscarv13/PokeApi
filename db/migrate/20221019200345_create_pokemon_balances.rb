class CreatePokemonBalances < ActiveRecord::Migration[7.0]
  def change
    create_table :pokemon_balances do |t|
      t.integer :amount
      t.belongs_to :pokemon
      t.belongs_to :wallet

      t.timestamps
    end
  end
end

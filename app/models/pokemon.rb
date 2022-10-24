class Pokemon < ApplicationRecord
  has_many :pokemon_balances
  has_many :wallets, through: :pokemon_balances
end

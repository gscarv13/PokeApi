class Wallet < ApplicationRecord
  has_many :pokemon_balances
  has_many :pokemons, through: :pokemon_balances
end

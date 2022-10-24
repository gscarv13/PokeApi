class PokemonBalance < ApplicationRecord
  belongs_to :wallet
  belongs_to :pokemon

  scope :balance_with_pokemons, lambda { |filter|
    joins(:pokemon).select('pokemons.*, pokemon_balances.*').where(filter)
  }
end

class PokemonBalance < ApplicationRecord
  belongs_to :wallet
  belongs_to :pokemon
end

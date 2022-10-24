class Wallet < ApplicationRecord
  has_many :pokemon_balances
  has_many :pokemons, through: :pokemon_balances
  has_many :transactions

  def display_usd
    (usd_balance / 100.0)
  end

  def self.format_to_usd(value)
    (value * 100).to_i
  end
end

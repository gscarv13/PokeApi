class DashboardController < ApplicationController
  include DashboardHelper

  def index
    @wallet = set_wallet
    @pokemons = Pokemon.all
    @pokemon_balance = PokemonBalance.balance_with_pokemons({ wallet_id: @wallet.id })
    @transactions = @wallet.transactions

    render json: {
      pokemons: @pokemons,
      pokemon_balance: @pokemon_balance,
      wallet: display_wallet(@wallet),
      transactions: @transactions
    }, status: :ok
  end
end

class TradesController < ApplicationController
  include TradesHelper

  def buy
    wallet = current_user.wallet
    total_usd = Wallet.format_to_usd(params[:total_usd].to_f)

    render json: { error: 'Insuficient USD balance' } if wallet.usd_balance <= total_usd
    render json: { error: 'No PokeCoins were selected' } if params[:pokemons].empty?

    added_tokens = 0
    params[:pokemons].each do |poke|
      pb = PokemonBalance.balance_with_pokemons({ wallet_id: wallet.id, pokemon_id: poke['id'] }).last

      if pb.nil?
        PokemonBalance.create(wallet_id: wallet.id, pokemon_id: poke['id'], amount: poke['amount'])
        pb = PokemonBalance.balance_with_pokemons({ wallet_id: wallet.id, pokemon_id: poke['id'] }).last
      else
        pb.update(amount: pb.amount += poke['amount'])
      end

      added_tokens += poke['amount'] * pb.base_experience
    end

    wallet.update(usd_balance: wallet.usd_balance - total_usd,
                  tokens_balance: wallet.tokens_balance + added_tokens)

    Transaction.create(operation: 'buy', amount: params[:total_tokens], wallet_id: wallet.id)

    render json: { message: 'Trade Completed' }, status: :ok
  end

  def sell
    wallet = current_user.wallet
    pokemon_balance = PokemonBalance.balance_with_pokemons({ wallet_id: wallet.id })

    render json: { error: 'Invalid operation' } if pokemon_balance.empty?
    render json: { error: 'No PokeCoins were selected' } if params[:pokemons].empty?

    params[:pokemons].each do |poke|
      pb = PokemonBalance.balance_with_pokemons({ wallet_id: wallet.id, pokemon_id: poke['id'] }).last

      if poke['amount'].zero?
        pb.destroy
      else
        pb.update(amount: poke['amount'])
      end
    end

    formatted_usd = Wallet.format_to_usd(params[:total_usd].to_f)

    wallet.update(
      usd_balance: wallet.usd_balance + formatted_usd,
      tokens_balance: wallet.tokens_balance - params[:total_tokens]
    )

    Transaction.create(operation: 'sell', amount: params[:total_tokens], wallet_id: wallet.id)

    render json: { message: 'Trade Completed' }, status: :ok
  end
end

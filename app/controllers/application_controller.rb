class ApplicationController < ActionController::Base
  before_action :authenticate_user!

  private

  def set_wallet
    wallet = current_user.wallet

    return wallet unless wallet.nil?

    new_wallet = current_user.build_wallet(usd_balance: 100_000, tokens_balance: 0)
    new_wallet.save!
    new_wallet
  end
end

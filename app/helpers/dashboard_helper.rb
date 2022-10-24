module DashboardHelper
  def display_wallet(wallet)
    {
      usd_balance: wallet.display_usd,
      tokens_balance: wallet.tokens_balance
    }
  end
end

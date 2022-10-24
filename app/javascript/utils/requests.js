import { DASHBOARD_INDEX, BTC_BASE_URL, BTC_HISTORY, BTC_INFO } from "./constants";

export const httpGetDashboard = async () => {
  try {
      const response = await fetch(DASHBOARD_INDEX);
      return await response.json()
  }
  catch (error) {
      throw new Error(error.message);
  }
}

export const httpPostTrade = async (body, endpoint) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
    },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(endpoint, config);
    return await response.json()
  }
  catch (error) {
      throw new Error(error.message);
  }
}

export const httpGetBTCHistory = async () => {
  try {
    const response = await fetch(BTC_BASE_URL + BTC_HISTORY);
    return await response.json()
  }
  catch (error) {
      throw new Error(error.message);
  }
}

export const httpGetBTC = async () => {
  try {
    const response = await fetch(BTC_BASE_URL + BTC_INFO);
    return await response.json()
  }
  catch (error) {
      throw new Error(error.message);
  }
}


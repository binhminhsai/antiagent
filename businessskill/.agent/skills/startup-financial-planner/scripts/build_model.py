def calculate_metrics(data):
    paying_users = data["paying_users"]
    arpu = data["arpu"]
    churn = data["churn"]
    gross_margin = data["gross_margin"]
    cac = data["cac"]
    expenses = data["expenses"]
    cash = data["cash"]

    mrr = paying_users * arpu
    arr = mrr * 12
    burn = expenses - mrr
    runway = cash / burn if burn > 0 else "Infinite"
    ltv = (arpu * gross_margin) / churn if churn > 0 else 0
    ltv_cac = ltv / cac if cac > 0 else 0

    return {
        "MRR": mrr,
        "ARR": arr,
        "Burn": burn,
        "Runway": runway,
        "LTV": ltv,
        "LTV_CAC": ltv_cac
    }
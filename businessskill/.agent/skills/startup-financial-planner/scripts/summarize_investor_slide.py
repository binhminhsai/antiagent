def summarize(metrics):
    return f"""
Startup is generating ${metrics['MRR']:.0f} MRR (${metrics['ARR']:.0f} ARR).

Unit economics are strong with LTV:CAC ratio of {metrics['LTV_CAC']:.2f}.

Current burn rate is ${metrics['Burn']:.0f}/month with runway of {metrics['Runway']} months.

Business shows scalable growth potential with improving retention and monetization.
"""
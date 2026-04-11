---
name: startup-financial-planner
description: Build financial plans, metrics, and investor pitch deck outputs for tech startups using user data.
---

# Startup Financial Planner Skill

## Goal
Convert startup data into an investor-ready financial plan and pitch deck content.

## Workflow
1. Collect missing input data
2. Validate assumptions
3. Calculate financial metrics
4. Build forecast scenarios
5. Generate investor-ready outputs

## Required Inputs
- Users (total, active, paying)
- Pricing / ARPU
- Growth rate
- Churn rate
- CAC (Customer Acquisition Cost)
- Gross margin
- Monthly expenses
- Cash balance
- Fundraising target

## Metrics to Calculate
- MRR = paying_users × ARPU
- ARR = MRR × 12
- Burn rate = expenses - revenue
- Runway = cash / burn
- LTV = ARPU × gross_margin / churn
- LTV:CAC ratio

## Instructions
- Always separate REAL data vs ASSUMPTIONS
- If data missing → ask user
- Build 3 scenarios:
  - Conservative
  - Base
  - Aggressive
- Keep outputs concise and investor-friendly

## Output Format

### 1. Executive Summary
Short explanation of business + financial health

### 2. KPI Table
List key metrics clearly

### 3. Financial Forecast (12 months)

### 4. Scenarios

### 5. Use of Funds

### 6. Pitch Deck Slides
Bullet points ready to paste into slides
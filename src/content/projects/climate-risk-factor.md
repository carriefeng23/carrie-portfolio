---
title: "Pricing Climate Risk: A Green-Minus-Brown Factor"
description: "Does owning clean energy instead of fossil fuels earn returns that standard risk factors can't explain? I built the factor, stress-tested it, and measured what a clean energy tilt costs a portfolio."
tags: ["Python", "Factor Models", "Portfolio Optimization", "Climate Risk"]
publishDate: 2026-11-04
cover: "/projects/climate-risk-factor/cover.png"
outcome: "Finding: no significant green premium after Fama-French controls, and the result depends on the sample period."
---

## The Question

Climate risk is turning into financial risk, but it's hard to tell whether markets reward or penalize companies on the right side of that shift. I wanted to test a simple version of the question with free data: **has owning clean energy instead of fossil fuels earned returns that standard risk factors can't explain?**

This is an exploratory personal project. I built it to practice the toolkit behind quantitative finance (factor models, regression, and mean-variance optimization) on a topic I care about.

---

## Key Findings

### No Significant "Green Premium"
I built a green-minus-brown factor: the monthly return of a clean energy ETF (ICLN) minus the return of an energy-sector ETF (XLE), over 218 months from 2008 to 2026. It averaged **-0.7% per month** with about 9% monthly volatility.

After controlling for the five Fama-French factors, the leftover return (alpha) was **-0.79% per month (t = -1.35, p = 0.18)**. That is not statistically distinguishable from zero, so the data shows neither a clean energy premium nor a penalty.

<div class="demo-shot">
  <img src="/projects/climate-risk-factor/cumulative-returns.png" alt="Cumulative growth of $1 in ICLN, XLE and the green-minus-brown factor" />
  <p class="demo-caption">Cumulative growth of $1 · clean energy (ICLN), energy (XLE), and green minus brown</p>
</div>

### It Behaves Like a Style Bet, Not a Pure Climate Factor
The five standard factors explain about 25% of the factor's variation. It loads negatively on value (HML), profitability (RMW), and investment (CMA). Relative to oil and gas, clean energy looks like a growth, lower-profitability, high-investment tilt. A lot of what looks like a "climate" effect is really style and sector exposure.

<div class="demo-shot">
  <img src="/projects/climate-risk-factor/factor-loadings.png" alt="Factor loadings of the green-minus-brown factor with 95% confidence intervals" />
  <p class="demo-caption">Factor loadings with 95% confidence intervals · value, profitability and investment stand out</p>
</div>

### The Result Depends on the Period
I re-ran the regression with a different ETF pair and different time windows.

| Specification | Months | Alpha (% per month) | t-stat |
| --- | --- | --- | --- |
| ICLN − XLE, full sample | 218 | −0.79 | −1.35 |
| PBW − VDE (different ETFs, from 2005) | 257 | −0.66 | −1.30 |
| ICLN − XLE, first half (2008–2016) | 101 | −1.58 | −2.61 |
| ICLN − XLE, second half (2017 onward) | 117 | −0.06 | −0.07 |
| ICLN − XLE, excluding 2020–21 | 194 | −1.16 | −2.29 |

All five estimates are negative, but only two are statistically significant, and the second half is close to zero. The windows overlap, so I don't treat them as independent confirmations. The honest summary is no evidence of a green premium, with clean energy lagging mainly in the early years.

<div class="demo-shot">
  <img src="/projects/climate-risk-factor/robustness-alpha.png" alt="Alpha estimates with 95% confidence intervals across five specifications" />
  <p class="demo-caption">Alpha across specifications · 95% confidence intervals</p>
</div>

### What a Clean Energy Tilt Costs a Portfolio
Using eight sector ETFs, I built the minimum-variance and maximum-Sharpe long-only portfolios and traced the efficient frontier. The maximum-Sharpe portfolio held no clean energy or fossil fuels at all: roughly 56% tech, 29% health care, 11% utilities, and 3% consumer staples. Over this period ICLN earned about zero excess return with 31% annual volatility.

Requiring a minimum clean energy weight lowers the best achievable Sharpe ratio:

| Minimum clean energy weight | Best Sharpe ratio |
| --- | --- |
| 0% | 0.96 |
| 5% | 0.90 |
| 10% | 0.83 |
| 20% | 0.71 |
| 30% | 0.60 |

A 5% cap on fossil fuels cost nothing, because the optimizer already avoided them. That says more about this sample than about fossil fuels.

<div class="demo-shot">
  <img src="/projects/climate-risk-factor/efficient-frontier.png" alt="Efficient frontier for eight sector ETFs including clean energy" />
  <p class="demo-caption">Efficient frontier · long-only, eight sector ETFs including clean energy</p>
</div>

<div class="demo-shot">
  <img src="/projects/climate-risk-factor/cost-of-green.png" alt="Best achievable Sharpe ratio as the minimum clean energy weight rises" />
  <p class="demo-caption">The Sharpe cost of a clean energy floor (in-sample)</p>
</div>

### Out-of-Sample Reality Check
I fit the portfolios on the first 70% of months (August 2008 to March 2021) and judged them on the last 30% (April 2021 to September 2026), holding the weights fixed. The maximum-Sharpe portfolio's Sharpe ratio fell from 1.03 in-sample to 0.81 out of sample. The minimum-variance portfolio fell from 0.89 to 0.35 and trailed equal weight (0.62). This is the usual optimism of in-sample optimization, and it is the reason to test out of sample.

<div class="demo-shot">
  <img src="/projects/climate-risk-factor/oos-cumulative.png" alt="Out-of-sample growth of $1 for five portfolios" />
  <p class="demo-caption">Out of sample · growth of $1 with weights fixed from the training window</p>
</div>

---

## Method

- **Data:** monthly ETF returns from Yahoo Finance and the Fama-French five factors from Kenneth French's data library
- **Factor:** long clean energy, short fossil fuels (ICLN minus XLE)
- **Regression:** OLS on the five factors with Newey-West standard errors
- **Robustness:** an alternative ETF pair, split samples, and a sample excluding the 2020–21 clean energy boom and bust
- **Optimization:** long-only mean-variance optimization with per-asset caps and floors, solved with SciPy
- **Validation:** weights estimated on the first 70% of months and evaluated on the last 30%

---

## Limitations

- An ETF pair mostly captures sector exposure, not a pure climate risk factor.
- Average returns are noisy, and optimizers overreact to them. A strong decade for tech drives much of the "optimal" weights.
- No fees or transaction costs, and monthly rebalancing to fixed weights is assumed.
- The 2008–2026 sample is short and includes an unusual clean energy boom and bust.

---

## Tools

Python · pandas · statsmodels · SciPy · matplotlib

---

## What I Learned

The main lesson was how easy it is to fool yourself. The full-sample result looked clean, and splitting the sample showed it depended on the period. The optimizer looked brilliant in-sample and gave back a fifth of its Sharpe ratio out of sample.

It also showed me what I can't do yet. The factor here is a crude proxy, and the stress tests are historical. Pricing climate risk properly means modeling long-horizon, uncertain scenarios with stochastic models and building factors from company-level emissions and exposure data. That is the training I'm looking for next.

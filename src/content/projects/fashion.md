---
title: "The Fashion Gap (Price vs. Transparency)"
description: "An interactive dashboard revealing the disconnect between fashion brand prestige, revenue, and supply chain transparency."
tags: ["Python", "Plotly", "Dashboard", "Data Viz", "Sustainability", "ESG"]
publishDate: 2026-02-05

# Card image shown on the Work / Projects page
cover: "/projects/fashion.jpg"
---

## Summary
This project challenges the common consumer assumption that **“higher price equals better ethics.”** By visualizing data from the **Fashion Transparency Index (FTI)** against **annual revenue** and **price positioning**, I built an interactive dashboard that reveals the disconnect between brand prestige and supply chain accountability.

The analysis shows that many luxury brands are **as opaque as ultra-fast fashion retailers**, and that transparency is a strategic choice—not a cost barrier.

---

## Insights

### The “Luxury Trap”
There is a distinct cluster of high-revenue luxury brands (e.g., Tom Ford, Chanel, Dior) in the bottom range of transparency. This indicates that paying a premium (Price Tier 4) **does not guarantee ethical transparency**—and in many cases, luxury houses scored **0–20%**, lower than some mass-market retailers.

### Fast Fashion Divergence
The “Cheap/Fast” category is not uniform. There is a massive gap between **H&M (61%)** and **Shein (7%)**, proving that similar price points can reflect radically different approaches to supply chain disclosure.

### A Luxury Outlier
**Gucci** stands out in the luxury sector with an **80%** score—demonstrating that high transparency is achievable at the top tier, and that competitor opacity is more likely a deliberate choice than an industry constraint.

---

## The Dashboard
<div class="map-embed">
  <iframe
    src="https://carriefeng23.github.io/fashion-gap/"
    title="The Fashion Gap Dashboard"
    loading="lazy"
  ></iframe>
</div>

<p style="margin-top:12px;">
  <a href="https://carriefeng23.github.io/fashion-gap/" target="_blank" rel="noreferrer">
    Open interactive dashboard in a new tab
  </a>
</p>

---

## Technical Methodology

### Data Engineering
Merged two datasets:
- Ethical scoring (**FTI 2023**)
- Financial performance (**FY2023/24 annual reports**)

### Data Cleaning
- Standardized disparate revenue currencies into **USD (Billions)**
- Created an ordinal **Price Tier** system (1 = Fast Fashion → 4 = Super Luxury)
- Normalized brand names across datasets to ensure accurate merging

### Visualization
Built with **Python** and **Plotly Express**, using a bubble chart to represent four dimensions simultaneously:
- **X-Axis:** Price Positioning (Category)
- **Y-Axis:** Transparency Score
- **Bubble Size:** Annual Revenue
- **Color:** Industry Segment

---

## Data Sources
- **Transparency:** Fashion Transparency Index 2023 (Fashion Revolution)
- **Financials:** FY2023/24 annual reports + public filings for parent companies (e.g., LVMH, Inditex, Kering)

---

## Why This Matters
This dashboard provides a consumer “reality check.” It visually proves that transparency is a **choice**, not a cost.

The fact that **H&M** can achieve **61%** transparency while **Tom Ford** sits at **0%** suggests that opacity in the fashion industry is driven more by **corporate culture and incentives** than economic necessity.

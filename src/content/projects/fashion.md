---
title: "The Fashion Gap"
description: "Do luxury brands have better supply chain ethics than fast fashion? I built an interactive dashboard to find out. Spoiler: mostly no."
tags: ["Python", "Plotly", "Data Viz", "Sustainability", "ESG"]
publishDate: 2026-02-05
cover: "/projects/fashion.jpg"
outcome: "Mapped 40+ brands; luxury labels averaged transparency scores below many mass-market retailers"
---

## The Question

There's a common belief that higher prices signal better ethics, that buying a $900 Dior bag is somehow more responsible than buying from Zara. I wanted to actually test that with data rather than just argue about it.

---

## What I Built

An interactive dashboard that plots 40+ fashion brands on two axes: price positioning and supply chain transparency score. The transparency data comes from the Fashion Transparency Index (FTI 2023), scored 0–100% based on publicly disclosed sourcing, labor conditions, and environmental practices. Revenue and price tier data comes from FY2023/24 annual reports.

The result is a bubble chart where size encodes annual revenue, color encodes industry segment, and position reveals the relationship (or lack of one) between what you pay and what you get.

<div class="map-embed">
  <iframe
    src="https://carriefeng23.github.io/fashion-gap/"
    title="The Fashion Gap Dashboard"
    loading="lazy"
  ></iframe>
</div>

<p style="margin-top:12px;">
  <a href="https://carriefeng23.github.io/fashion-gap/" target="_blank" rel="noreferrer">
    Open interactive dashboard in a new tab →
  </a>
</p>

---

## What the Data Shows

### The Luxury Trap
The cluster of high-revenue luxury brands (Tom Ford, Chanel, Dior) sits at the bottom of the transparency scale, scoring 0–20%, lower than many mass-market retailers. Paying a premium does not buy disclosure.

### Fast Fashion Is Not Uniform
H&M scores 61%. Shein scores 7%. They're in the same price tier. The gap between them isn't about cost; it's about corporate will. That matters for anyone making purchasing decisions based on "avoiding fast fashion."

### The Outlier That Proves the Point
Gucci scores 80%, the highest among luxury brands in the dataset. If Gucci can disclose at that level, the others are choosing not to.

---

## Process

**Data**
Merged two datasets: FTI 2023 ethical scoring and FY2023/24 annual reports. Revenue figures were standardized to USD billions. Brand names were normalized across sources before merging.

**Price Tier System**
I created an ordinal scale (1 = Fast Fashion to 4 = Super Luxury) rather than using raw price points, so comparisons are categorical rather than continuous. This better reflects how consumers actually think about brand positioning.

**Visualization**
Built in Python with Plotly Express. Four dimensions encoded simultaneously: price tier (x-axis), transparency score (y-axis), revenue (bubble size), and segment (color). The multi-variable encoding was intentional. I wanted the visual to force the question, not just display a number.

---

## Data Sources
- Fashion Transparency Index 2023, Fashion Revolution
- FY2023/24 annual reports and public filings (LVMH, Inditex, Kering, and others)

---

## Why It Matters

I went into this expecting luxury brands to at least score reasonably on transparency. They scored lower than H&M. The chart doesn't make that argument rhetorically; it just shows you. I think that's the most useful format for this kind of finding.

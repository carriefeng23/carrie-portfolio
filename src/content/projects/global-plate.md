---
title: "Global Plate: Food Waste by Nation"
description: "An interactive choropleth map showing food waste across 50+ countries. The top contributors might surprise you."
tags: ["Python", "Plotly", "Pandas", "Data Viz", "Sustainability"]
publishDate: 2026-02-05
outcome: "Top 5 contributors span 3 continents; U.S. and Spain both exceed 49,980 tons annually"
cover: "/projects/global-plate/food-cover.jpg"
---

## The Question

Food waste statistics get cited a lot in sustainability conversations, but they're rarely mapped. I wanted to see where the waste was actually coming from, country by country, instead of just citing a global average.

---

## What I Built

An interactive choropleth map showing total food waste by nation, color-encoded by volume. Hover over any country to see its specific figures. I wanted it to be explorable so users could draw their own conclusions, not just read mine.

<div class="map-embed">
  <iframe
    src="https://carriefeng23.github.io/food-waste-proj/"
    title="Global Plate: Food Waste Map"
    loading="lazy"
  ></iframe>
</div>

---

## Process

**Data**
I combined three sources: the FAO Food Loss and Waste Database, World Bank country indicators, and the UNEP Food Waste Index Report 2021. Each used slightly different country name conventions, so standardizing the naming schema was the first non-trivial task.

**Cleaning**
Filtered for "Total Waste" metrics rather than sub-category losses (retail, consumer, processing) to enable direct country comparisons. Standardized units to metric tons throughout. Where country data was sparse, I flagged the gap rather than filling it in. A blank space on the map signals limited reporting infrastructure, which is its own kind of information.

**Visualization Choices**
Choropleth maps carry a known bias: they visually amplify large land-area countries. To counter this, I used a normalized color scale rather than an absolute one, and included per-capita figures in the hover tooltip alongside absolute totals.

---

## What the Map Reveals

- Spain and the United States both exceed 49,980 tons annually, the highest in the dataset
- The top 5 contributors (Spain, US, India, Germany, Japan) span three continents, which challenges the framing of food waste as a problem concentrated in the developing world
- The top 5 are separated by fewer than 50 tons. This likely reflects how reporting works: countries with better data infrastructure record more comprehensively, which inflates their totals. It's not necessarily that they waste more.

---

## What I'd Change

The map conflates reporting quality with actual waste volume. A country appearing low might have low waste, or it might just have incomplete data. A next version would add a layer encoding data completeness per country so the gaps don't read as zeroes.

---

## Data Sources
- FAO Food Loss and Waste Database
- World Bank Development Indicators
- UNEP Food Waste Index Report 2021

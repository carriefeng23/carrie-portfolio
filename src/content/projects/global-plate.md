---
title: "Global Plate: Food Waste by Nation"
description: "An interactive choropleth map visualizing food waste across 50+ countries — and challenging the assumption that waste is primarily a developing-world problem."
tags: ["Python", "Plotly", "Pandas", "Data Viz", "Sustainability"]
publishDate: 2026-02-05
outcome: "Top 5 contributors span 3 continents — U.S. and Spain both exceed 49,980 tons annually"
cover: "/projects/global-plate/food-cover.jpg"
---

## The Question

Food waste statistics get cited constantly in sustainability conversations, but they rarely make geographic sense. I wanted to build something that turned a familiar abstraction — "the world wastes a third of its food" — into a map that shows *where* and *how much*, country by country.

---

## What I Built

An interactive choropleth map that visualizes total food waste by nation, color-encoded by volume. Hovering over any country surfaces its specific figures. The goal was to make the data explorable rather than just readable — to let a user form their own conclusions by moving through the map.

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
Filtered for "Total Waste" metrics rather than sub-category losses (retail, consumer, processing) to enable direct country comparisons. Standardized units to metric tons throughout. Where country data was sparse, I flagged the gap rather than imputing — a missing data point on the map signals limited reporting infrastructure, which is itself informative.

**Visualization Choices**
Choropleth maps carry a known bias: they visually amplify large land-area countries. To counter this, I used a normalized color scale rather than an absolute one, and included per-capita figures in the hover tooltip alongside absolute totals. The goal was to make large countries legible without making them automatically alarming.

---

## What the Map Reveals

- Spain and the United States both exceed 49,980 tons annually — the highest in the dataset
- The top 5 contributors (Spain, US, India, Germany, Japan) span three continents, which directly challenges the framing of food waste as a logistics or infrastructure problem concentrated in the developing world
- The top 5 are separated by fewer than 50 tons. This narrow range likely reflects ceiling effects in reporting methodology rather than true convergence — countries with stronger data infrastructure report more comprehensively, which inflates their totals relative to countries with sparse measurement systems

---

## What I'd Change

The map's most honest limitation is that it conflates reporting quality with actual waste volume. A country that appears low on the map might have low waste — or might simply have low data coverage. A follow-up version would add a secondary layer encoding data completeness per country, so the gaps don't read as zeroes.

---

## Data Sources
- FAO Food Loss and Waste Database
- World Bank Development Indicators
- UNEP Food Waste Index Report 2021

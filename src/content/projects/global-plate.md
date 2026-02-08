---
title: "Global Plate: Interactive Food Waste Tracker"
description: "An interactive map' that visualizes global food waste patterns with Python + Plotly."
tags: ["Python", "Plotly", "Pandas", "Data Viz", "Sustainability"]
publishDate: 2026-02-05
cover: "/projects/global-plate/food-cover.jpg"
---

## Summary
I built an interactive map dashboard to visualize global food waste patterns using Python and Plotly. By transforming data into an interactive choropleth map, this project highlights the disparity in waste generation between nations.

## Key Questions
- Which nations are the largest contributors to food waste by volume?
- Are there observable geographic clusters where waste management is failing?

## Map
<div class="map-embed">
  <iframe
    src="https://carriefeng23.github.io/food-waste-proj/"
    title="Global Plate: Food Waste Map"
    loading="lazy"
  ></iframe>
</div>

## The Process
Data and cleaning: EDA on global wastage data using Pandas; standardized column names and filtered for “Total Waste” metrics.  
Visualization: Built a choropleth map using Plotly to render density-based coloring. 

## Key Findings
- Top: Spain and the US emerged as the highest contributors in this dataset, both exceeding 49,980 tons annually.
- The top 5 countries (including India, Germany, and Japan) are separated by less than 50 tons, indicating a consistent upper bound in the reported data.
- Global Spread: High-volume waste is not limited to one region; the top 5 spans three continents (Europe, North America, Asia).

## Data
- The FAO Food Loss and Waste Database
- World Bank 
- United Nations Environment Programme "Food Waste Index Report"

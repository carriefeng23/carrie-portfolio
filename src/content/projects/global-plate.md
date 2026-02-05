---
title: "Global Plate: Interactive Food Waste Tracker"
description: "An interactive data dashboard that visualizes global food waste patterns with Python + Plotly."
tags: ["Python", "Plotly", "Pandas", "Data Viz", "Sustainability"]
publishDate: 2026-02-05
cover: "/projects/global-plate/food-cover.jpg"
---

## Summary
I built a responsive data dashboard to visualize global food waste patterns using Python and Plotly. By transforming raw ecological data into an interactive choropleth map, this project highlights the disparity in waste generation between nations. It demonstrates how open-source data can be rapidly deployed to the web to communicate complex environmental metrics.

## Key Questions
- Which nations are the absolute largest contributors to food waste by volume?
- Are there observable geographic clusters where waste management is failing?

## The Map
<div class="map-embed">
  <iframe
    src="https://carriefeng23.github.io/food-waste-proj/"
    title="Global Plate: Food Waste Map"
    loading="lazy"
  ></iframe>
</div>

## The Process
**Data & Cleaning:** Ingested raw global wastage data using Pandas; standardized column names and filtered for “Total Waste” metrics.  
**Visualization:** Built a choropleth (geographic heatmap) using Plotly to render density-based coloring.  
**Deployment:** Automated the generation of a static HTML site for direct hosting on GitHub Pages.

## Key Findings
- **Top Contributors:** Spain and the USA emerged as the highest contributors in this dataset, both exceeding **49,980 tons** annually.
- **Tight Margins:** The top 5 countries (including India, Germany, and Japan) are separated by **less than 50 tons**, indicating a consistent upper bound in the reported data.
- **Global Spread:** High-volume waste is not limited to one region; the top 5 spans three continents (Europe, North America, Asia).

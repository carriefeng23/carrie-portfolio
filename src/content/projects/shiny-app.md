---
title: "Interactive EDA Workbench"
description: "A full-stack Shiny app that guides users from raw dataset to structured insight: upload, clean, engineer features, and explore, no code required."
cover: "/images/shinyapp-preview.png"
tags: ["R", "Shiny", "Data Science", "EDA"]
publishDate: 2026-04-01
outcome: "Built for STAT GR5243; handles structured datasets end-to-end with fully reactive updates"
embedUrl: "https://5qdcoj-carrie0yan0yin-feng.shinyapps.io/project2_shiny_app/"
liveUrl: "https://5qdcoj-carrie0yan0yin-feng.shinyapps.io/project2_shiny_app/"
---

## The Problem

Most data science tutorials assume you arrive with a clean dataset. In practice, you don't. You arrive with a CSV you've never seen, questions you can't fully articulate yet, and no idea where to start.

I built this for STAT GR5243 (Applied Data Science at Columbia). It guides you through the full early-stage workflow in one place: upload, understand, clean, engineer features, and explore, without writing any code.

---

## Live App

<div class="embed-frame">
  <iframe
    src="https://5qdcoj-carrie0yan0yin-feng.shinyapps.io/project2_shiny_app/"
    title="Interactive EDA Workbench"
    loading="lazy"
    allow="fullscreen"
  ></iframe>
</div>

<p style="margin-top:12px;">
  <a href="https://5qdcoj-carrie0yan0yin-feng.shinyapps.io/project2_shiny_app/" target="_blank" rel="noreferrer">
    Open full app in a new tab →
  </a>
</p>

---

## What I Built

The app is organized around four sequential pipeline stages:

### Upload & Preview
Accepts CSV and Excel files. Displays a dynamic data table with column types, row counts, and missing value summaries so you can understand what you're working with before touching anything.

### Preprocessing
Options include removing duplicates, handling missing values (mean/median imputation or row deletion), and dropping or renaming columns. Each action updates the dataset in place and propagates downstream without a manual refresh.

### Feature Engineering
Users can normalize numeric columns, bin continuous variables into categorical ranges, create interaction terms, and one-hot encode categoricals. The options cover the transformations most commonly needed before modeling, without trying to be exhaustive.

### Exploratory Analysis
Interactive histograms, scatter plots, and a correlation heatmap update dynamically based on whatever state the dataset is in. Variable selectors let users drill into specific pairs or subgroups.

---

## Technical Notes

Built in **R** with the **Shiny** framework. Key design decisions:

- **Reactive expressions** propagate upstream changes to all downstream tabs automatically. Change a preprocessing step and everything downstream updates without a manual refresh.
- **Modular tab structure** keeps each pipeline stage isolated for readability and debugging
- Deployed via **shinyapps.io** for public access without requiring a local R installation

---

## What I Learned

The hardest part wasn't the statistical logic; it was defensive reactivity. If a user uploads a dataset with all-character columns, the normalization step needs to fail gracefully instead of crashing the session. Building those guard rails taught me more about software architecture than any tutorial had.

I also found that deciding what options to show the user and what to hide behind the scenes defined the tool's whole personality. Too many options and it's overwhelming; too few and it's useless. That balance required more product thinking than I expected from a data project.

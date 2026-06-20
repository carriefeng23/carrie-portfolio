---
title: "Beyond BMI: Predicting Obesity via Behavior"
description: "Can lifestyle habits predict a person's weight class without knowing their height or weight? I excluded all physical measurements to find out."
tags: ["Machine Learning", "Decision Trees", "Python", "Public Health", "EDA"]
publishDate: 2025-04-30
cover: "/projects/obesity/obesity-cover.jpg"
---

## The Question

BMI is a blunt instrument. We wanted to see if behavioral data alone could predict obesity level, so we took out height and weight entirely.

---

## Key Findings

### Behavior Predicts More Than We Expect
Once age was controlled for, the three strongest predictors were:
1. **Family history of overweight**: the strongest single signal, reflecting genetic and environmental inheritance
2. **Vegetable consumption frequency (FCVC)**: a consistent separator across weight classes
3. **Number of daily meals (NCP)**: meal structure as a stronger signal than exercise frequency

This ranking challenges the "move more" framing in public health messaging. Dietary structure and access appear to matter more.

### Model Performance
The optimized Decision Tree Classifier achieved a **Macro F1-Score of 0.73** across four weight classes (Insufficient Weight, Normal, Overweight, Obese), reflecting balanced performance despite class imbalance in the training data.

### Where It Struggled
The model showed behavioral overlap between the Overweight and Obese categories, with a slight tendency to misclassify overweight individuals as obese. The behaviors that produce those two outcomes are similar, and the boundary between them is not clean.

---

## Method

**Preventing Data Leakage**
Height and weight were removed before modeling. BMI is a mathematical function of those two values, and the point was to learn from behavior, not reverse-engineer a formula.

**Modeling**
- `DecisionTreeClassifier` (scikit-learn) to capture non-linear behavioral relationships
- `GridSearchCV` for hyperparameter tuning across `max_depth`, `min_samples_split`, and `max_features`
- `max_depth` turned out to be the most influential parameter; deeper trees overfit quickly on behavioral data

**Feature Engineering**
Encoded categorical transport and dietary variables. Normalized continuous features before grid search. Retained the full 17-feature behavioral set rather than reducing, to let the model surface its own importance ranking.

---

## Data

2,111 rows with 17 behavioral and demographic features, including:
- High-caloric food consumption (FAVC)
- Technology use per day (TUE)
- Transportation mode (MTRANS)
- Smoking status, alcohol consumption, water intake
- Physical activity frequency (FAF)

---

## Tools
Python · Pandas · scikit-learn (`DecisionTreeClassifier`, `GridSearchCV`)

---

## Project Deck

<div class="pdf-embed">
  <iframe
    src="/projects/obesity/Obesity-proj.pdf"
    title="Beyond BMI: Obesity Decision Tree Project"
    loading="lazy"
  ></iframe>
</div>

<p style="margin-top:12px;">
  <a href="/projects/obesity/Obesity-proj.pdf" target="_blank" rel="noreferrer">
    Open full PDF in a new tab →
  </a>
</p>

---

## Why It Matters

The strongest predictor was family history, which the model treats as a feature but is really a proxy for genetics and environment. That matters because it's the one thing behavioral interventions can't change directly. Everything else in the predictor set is more tractable, which is the main takeaway.

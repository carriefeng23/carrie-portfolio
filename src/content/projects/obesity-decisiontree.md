---
title: "Beyond BMI: Predicting Obesity via Lifestyle Analytics"
description: "A multi-class machine learning model that predicts obesity levels using behavioral data instead of physical metrics."
tags: ["Machine Learning", "Decision Trees", "Classification", "Public Health", "EDA"]
publishDate: 2026-02-05

# Cover image shown on the Work / Projects page
cover: "/projects/obesity/obesity-cover.jpg"
---

## Executive Summary
This project developed a classification decision tree model to predict an individual’s obesity level based on lifestyle behaviors, including diet, transportation habits, and technology use, instead of biological measurements.

By excluding direct physical indicators such as height and weight, the model isolates behavioral risk factors, allowing for more actionable insights relevant to public health interventions.

---

## Key Findings

### Behavior Over Biology
Once Age was accounted for, the most influential predictors of obesity were:
- Family History of Overweight
- Frequency of Vegetable Consumption (FCVC)
- Number of Meals per Day (NCP)

This confirms that lifestyle and environmental factors play a significant role beyond biological baselines.

### Model Performance
The optimized Decision Tree Classifier achieved a Macro F1-Score of 0.73, indicating balanced performance across four weight classes despite the class imbalance.

### Differentiation Difficulty
The model revealed behavioral overlap between the “Overweight” and “Obese” categories, showing a slight tendency toward false positives, misclassifying overweight individuals as obese. This highlights the gray area in behavioral health classification.

---

## Method

### Preventing Data Leakage
Height and weight features were explicitly removed to prevent data leakage, since BMI is directly computed from these variables. This forced the model to learn from lifestyle patterns rather than tautological signals.

### Modeling & Optimization
- Implemented a Decision Tree Classifier to capture non-linear relationships between lifestyle behaviors and health outcomes.
- Used GridSearchCV for hyperparameter tuning.
- Experiments revealed `max_depth` as the most influential hyperparameter, outweighing effects from `min_samples_split` and `max_features`.

---

## Data Sources & Tools

### Data
- 2,111 rows with 17 behavioral and demographic features, including:
  - High-caloric food consumption (FAVC)
  - Technology use (TUE)
  - Transportation methods (MTRANS)

### Tools
- Python
- Pandas
- Scikit-Learn
  - `DecisionTreeClassifier`
  - `GridSearchCV`

---

## Why This Matters
Standard BMI calculators tell you if someone is overweight and this model helps explain why.

By identifying Vegetable Consumption (FCVC) as a top-three feature by importance, this analysis provides empirical evidence that effective public health strategies should prioritize nutritional access and dietary quality over relying solely on generic “exercise more” messaging.

This approach reframes obesity as a behavioral and structural issue, not just an individual failure, making the findings directly relevant to policy and health equity initiatives.

---

## Project Deck
<div class="pdf-embed">
  <iframe
    src="/projects/obesity/Obesity-proj.pdf"
    title="Beyond BMI – Obesity Decision Tree Project"
    loading="lazy"
  ></iframe>
</div>

<p style="margin-top:12px;">
  <a href="/projects/obesity/Obesity-proj.pdf" target="_blank" rel="noreferrer">
    Open full PDF in a new tab
  </a>
</p>

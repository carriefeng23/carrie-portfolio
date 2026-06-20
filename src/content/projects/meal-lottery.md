---
title: "Meal Lottery"
description: "Save the dishes you love, spin the wheel. A full-stack meal planning app that uses AI to auto-tag dishes, generate recipes, and build a week of meals with a grocery list in seconds."
tags: ["Next.js", "React", "OpenAI API", "Full-Stack"]
publishDate: 2026-05-01
cover: "/projects/meal-lottery/hero.png"
liveUrl: "https://meal-lottery-amnotrild-carriefeng23s-projects.vercel.app/"
---

## The Problem

Growing up, I noticed that a surprising amount of our family's conversation was spent on one question: *what are we eating?* My mother carried most of the mental burden — planning meals for the week, checking what was in the fridge, building a grocery list in her head. By the time dinner came around, everyone was already a little agitated from just deciding what it would be.

The problem felt solvable. Families already know roughly what they like and the hard part is translating that into a coherent week of meals with a grocery list you can actually use. I wanted to build something that lifts that mental load, so the time we spend together can go toward something more meaningful.

---

## How It Works

The app is organized around four connected modules that take you from dish discovery to a grocery-ready week plan.

### 01 — My Dishes

Your personal recipe library. You can browse 66 curated starter dishes filtered by cuisine (Chinese, Japanese, Korean, Italian, Western) and dietary tag (vegetarian, vegan, gluten-free, dairy-free, nut-free, low-sodium, low-carb), or add your own.

<div class="demo-shot">
  <img src="/projects/meal-lottery/browse.png" alt="Browse 66 curated dishes by cuisine and diet" />
  <p class="demo-caption">Browse · 66 dishes filterable by cuisine and dietary tag</p>
</div>

When you add a custom dish by name, AI auto-detects the meal type, cuisine, cook time, protein source, dietary tags, and generates a full recipe with ingredients and step-by-step instructions included.

<div class="demo-shot">
  <img src="/projects/meal-lottery/add-dish.png" alt="Add a dish — AI auto-fills all metadata and generates a recipe" />
  <p class="demo-caption">Add a dish · type a name, AI fills in everything else</p>
</div>

Every dish comes with a full recipe card showing calorie estimates, ingredients, and instructions.

<div class="demo-shot">
  <img src="/projects/meal-lottery/recipe.png" alt="Recipe modal for pad thai" />
  <p class="demo-caption">Recipe view · ingredients, instructions, and calorie range</p>
</div>

---

### 02 — Meal Planner

Set your week style (office week, full week with breakfast/lunch/dinner), dietary needs, preferred cuisines, and serving size. Hit Generate and the planner randomly draws from your dish library and builds a full schedule. You can swap any individual meal with one click, or describe what you want in the ask AI function and let it build a custom plan for you.

<div class="demo-shot">
  <img src="/projects/meal-lottery/meal-planner.png" alt="Meal Planner with filters and generated week plan" />
  <p class="demo-caption">Meal Planner · filters on the left, generated week on the right</p>
</div>

---

### 03 — Grocery & Pantry

The Shopping List tab aggregates every ingredient from your weekly plan, de-duplicates across meals, and separates what you need to buy from what's already in your pantry. The Pantry tab lets you track what you have on hand.

<div class="demo-shot">
  <img src="/projects/meal-lottery/shopping-list.png" alt="Grocery shopping list auto-generated from the week plan" />
  <p class="demo-caption">Grocery list · 200 items to buy, 30 already in pantry</p>
</div>

<div class="demo-shot">
  <img src="/projects/meal-lottery/pantry.png" alt="Pantry tracker organized by food category" />
  <p class="demo-caption">Pantry · items organized by Produce, Protein, Grains, Staples, Frozen</p>
</div>

---

## Tools

Next.js · React · Vercel · OpenAI API

---

## Open to Feedback!

This project is still evolving and I'd love to hear what you think! Whether it's a feature idea, a UX tweak you noticed, or just a dish you think should be in the library. All feedback is welcome!

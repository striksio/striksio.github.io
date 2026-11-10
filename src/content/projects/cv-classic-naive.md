---
title: Classic CV, from scratch
summary: Canny edge detection, Hough line transforms and marker-based watershed segmentation, implemented from the description of each algorithm with plain for loops.
year: 2026
order: 3
tags: [NumPy, Jupyter, Canny, Hough transform, Watershed]
links:
  - label: Code
    url: https://github.com/striksio/cv-classic-naive
image: /media/canny-gradient.jpg
mediaAlt: Gradient magnitude of an aircraft photo, an intermediate step of the Canny edge detector.
---

## Why

A way to challenge myself: implement classic algorithms from their description and mechanism, without reaching for the library call. The implementations are unoptimised, for-loop versions, and none of the code is AI generated.

## Notebooks

- **Canny edge detector**: greyscale, Gaussian blur, gradient magnitude and direction, non-maximum suppression, double thresholding and edge hysteresis.
- **Hough line transform**, plus the probabilistic variant.
- **Marker-based watershed segmentation**.

---
title: LPRTOS
summary: Laser-prompted real-time object segmentation on smartphones via cloud computing. Point a green laser at an object and the phone shows its mask. Official implementation of the published paper.
year: 2026
order: 1
featured: true
tags: [YOLOv5, FastSAM, TensorRT, Jetson Orin Nano, Android, Kotlin, Docker]
metrics:
  - value: 16 ms
    label: per frame, L4 GPU, TensorRT
  - value: 42 ms
    label: per frame, Jetson Orin Nano, TensorRT
  - value: "2,209"
    label: images in the released benchmark dataset
links:
  - label: Code
    url: https://github.com/striksio/LPRTOSvcc
  - label: Paper
    url: https://doi.org/10.1007/s11554-026-01887-z
  - label: Dataset
    url: https://huggingface.co/datasets/striksio/Green-Laser-Guided-Segmentation-Dataset
video: /media/lprtos.mp4
poster: /media/lprtos-poster.jpg
portrait: true
mediaAlt: A phone streaming video of objects on a table; a laser dot selects one and its segmentation mask appears on screen.
---

## Overview

A laser pointer acts as the prompt. The phone streams camera frames to a server, a detector finds the laser spot, and a segmentation model returns the mask of the object the laser is pointing at. The laser dot is then inpainted out of the frame.

This is the official implementation of the paper [Laser-prompted real-time object segmentation on smartphones via cloud computing](https://doi.org/10.1007/s11554-026-01887-z), published in the Journal of Real-Time Image Processing.

## What is in the repository

- **lprtos-cloud** runs the main pipeline on a server, with the original PyTorch weights or a converted TensorRT engine.
- **lprtos-jetson-orin-nano** runs the same pipeline on a Jetson Orin Nano, again in PyTorch or TensorRT.
- **lprtos_client** is the Android application that streams frames and shows the result.

## Pipeline

1. **Laser detection** with YOLOv5n-LPD, a YOLOv5n model trained to find the laser spot.
2. **Object segmentation** with FastSAM-s, prompted by the detected spot.
3. **Inpainting** with the Telea method to remove the laser dot.

## Dataset

To evaluate the full system I created the [Green Laser Guided Segmentation Dataset](https://huggingface.co/datasets/striksio/Green-Laser-Guided-Segmentation-Dataset): 2,209 images across difficult environments, with both laser box boundaries and masks for the objects the laser points at, in COCO format.

For laser detection, a prediction counts as correct when the centre of the top-confidence box falls inside the ground-truth laser box. Box-overlap IoU rejects predictions whose centre lands on the laser spot, so the centre-based rule is the fairer one here. This benchmark method is not the one used in the paper.

## Results

### Total inference time (median per frame)

| Hardware | Backend | Detection | Segmentation | Inpainting | Total |
|---|---|---|---|---|---|
| L4 GPU | PyTorch | 6 ms | 13 ms | 3 ms | 21 ms |
| L4 GPU | TensorRT | 4 ms | 7 ms | 4 ms | **16 ms** |
| Jetson Orin Nano | PyTorch | 14 ms | 43 ms | 3 ms | 60 ms |
| Jetson Orin Nano | TensorRT | 9 ms | 28 ms | 4 ms | **42 ms** |

### Laser detection (YOLOv5n-LPD)

| Hardware | Backend | Precision | Recall | Median centre error |
|---|---|---|---|---|
| L4 GPU | PyTorch | 0.898 | 0.748 | 1.16 px |
| L4 GPU | TensorRT | 0.893 | 0.747 | 1.16 px |
| Jetson Orin Nano | PyTorch | 0.898 | 0.749 | 1.16 px |
| Jetson Orin Nano | TensorRT | 0.893 | 0.748 | 1.10 px |

### Object segmentation (FastSAM-s)

| Hardware | Backend | IoU | Dice | AP50 | AP50:95 |
|---|---|---|---|---|---|
| L4 GPU | PyTorch | 0.635 | 0.696 | 0.593 | 0.392 |
| L4 GPU | TensorRT | 0.622 | 0.682 | 0.573 | 0.376 |
| Jetson Orin Nano | PyTorch | 0.635 | 0.696 | 0.593 | 0.392 |
| Jetson Orin Nano | TensorRT | 0.622 | 0.682 | 0.573 | 0.377 |

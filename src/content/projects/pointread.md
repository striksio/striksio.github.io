---
title: PointRead
summary: Point at a word or sentence in a paper book and hear the translation. A hand-tracking, OCR, translation and speech pipeline running on an Nvidia Jetson Orin Nano.
year: 2026
order: 2
featured: true
tags: [RTMDet, RTMPose, PP-OCRv5, TensorRT, Jetson Orin Nano, OpenCV, Docker]
metrics:
  - value: "8"
    label: target languages, each with its own voice
  - value: "21"
    label: hand keypoints tracked in real time
  - value: Headless
    label: runs with only a camera and a speaker
links:
  - label: Code
    url: https://github.com/striksio/PointRead
  - label: Demo video
    url: https://youtu.be/xo0bdDjVpPQ
video: /media/pointread.mp4
poster: /media/pointread-poster.jpg
mediaAlt: A finger sliding under a line of text in a book while the pipeline highlights the selected words.
---

## Problem

Reading a book with unknown words is slow. On a phone, translation is one tap away. On paper, which many people prefer, you either type the word into a device, which brings back the screen you were avoiding, or look it up in a dictionary, which interrupts the reading.

## How it works

A double pinch of the index finger and thumb activates the device. You then slide your index finger under the text. The pipeline tracks the finger, extracts the text above it, recognises it, translates it and speaks the translation.

![PointRead pipeline: hand detection, fingertip tracking, double pinch activation, text capture, OCR, translation and speech](/media/pointread-architecture.jpg)

## Hardware

Nvidia Jetson Orin Nano and a Raspberry Pi Camera Module V2 (8 MP Sony IMX219 sensor).

## Pipeline

- **RTMDet** for hand detection and **RTMPose** for keypoint detection, converted to TensorRT.
- **Adaptive Gaussian thresholding** for text binarisation.
- **PP-OCRv5** server model through RapidOCR.
- **Argos Translate** for translation.
- **Piper** for speech.

## Details that made it usable

- A One-Euro filter smooths the fingertips, because the raw RTMPose keypoints are not stable.
- The double pinch is detected from the overlap of index finger and thumb, and does not fire twice when the overlap lasts several frames.
- Keypoints that briefly disappear are held for a few frames.
- Adaptive Gaussian thresholding removes noise and keeps the text as foreground. It worked better than Canny here.
- A morphological close merges each line of text into one region for highlighting.
- Selection only slides forward, left to right, and never jumps back to a previous line.

## Limitations

- OCR currently runs on the CPU, because there is no GPU build of onnxruntime for the Jetson Orin Nano on R39.2 yet. This makes OCR the slow step.
- The book has to be positioned so that the text is horizontal.
- Text detection sometimes fails, as the demo shows.
- Very large fonts or wide spacing can stop a line from forming.

## Supported languages

English to Ukrainian, Chinese, French, German, Italian, Spanish, Russian and Portuguese.

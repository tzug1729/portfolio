---
title: AI-based Touchless Machine (ATM)
slug: atm-simulator
period: "2025/11 – 2025/12"
role: solo
tech: ["Python", "YOLO", "OpenCV", "Tkinter"]
links:
  github: "https://github.com/tzug1729/ATM-simulator"
order: 3
---

## Why I built it

I made this as the final, open-topic assignment for Programming I, a course at my college.
I wanted to test a hypothesis: that image recognition could give a display with no touch panel something close to touch operation.

## What I did

My first plan was to use Teachable Machine to train a Keras model on where the index finger was — left, center, right, or nowhere — and map those positions to buttons for withdrawal, transfer, and opening an account. For reasons described below, I moved from Keras to YOLO's pose estimation.

## Where I got stuck

As above, I started with a Keras model, but however I adjusted the training, the button-press success rate felt like about 50%. It would register a press when I was not trying to press anything. Combining YOLO's pose estimation with some linear algebra fitted the problem exactly, and buttons started being pressed where I expected them to be. That said, I use the wrist joint to keep the math simple, so pressing a button still takes a little knack, and that is what I want to improve.

## What I learned

I learned how to use OpenCV and YOLO, both common in computer vision. I also got a feel for how the right AI differs from one situation to the next.

---
title: Pedalty
slug: pedalty
period: "2026/03 – 2026/10"
role: team
responsibility: "Circuitry"
tech: ["Unity", "C#", "Arduino"]
links:
  github: "https://github.com/tatsukodx/Pedalty"
order: 4
---

## Why I built it

Penalties for cycling violations were tightened in April 2026, and yet bicycle training is still nothing but lectures. We wanted to change that, so we set out to build a new, hands-on bicycle training system.

## What I did

I was responsible for the circuitry.
Specifically, I built the circuit so that a magnet sensor picks up the rotation count and converts it into the bicycle's speed, a potentiometer reads the handlebar angle, and push buttons detect the bell and the brakes. I then connected all of it to Unity over serial. I also placed the road signs inside Unity.

## Where I got stuck

Differences in COM port numbers meant it did not work on every machine, and there were very few places on a bicycle where a sensor could be mounted. A magnet sensor is meant to go on the wheel or the spokes, but the structure of the bicycle made that impossible, so I compromised: I mounted it on the pedal, and made the brake detection that this ruled out a button instead.

## What I learned

I used an Arduino UNO to build the circuit, and I could feel what I had learned at school actually paying off, from the purpose of pull-up resistors to handling switch chatter. Building electrical and electronic circuits has always been my weak spot, but by taking the board home and reworking the parts that did not go well, over and over, I have started to get a feel for how electricity behaves.
I also learned the basics of Unity, which is used for making games.

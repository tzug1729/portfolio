---
title: Development of a Parts Sorting System Using the SO-101
slug: imitation-learning-part-sorting
period: "2026/05 – 2026/12"
role: solo
tech: ["SO-101", "LeRobot", "Huggingface", "Python"]
order: 5
---

## Why I built it

During a school internship, I encountered a problem faced by the company I was working with and thought that a parts sorting system could help solve it. I wanted to tackle this problem using Physical AI, a field that had been gaining attention around 2026, so I decided to develop a parts sorting system using the SO-101 robotic arm.

## What I did

Coming Soon...

## Where I got stuck

When I first started working on this project, I knew nothing about Physical AI. Around that time, the Matsuo-Iwasawa Laboratory at the University of Tokyo was accepting applications for its Physical AI Fundamentals course, so I enrolled to build up my knowledge of the field.

I also took part in the follow-up courses, Physical AI Advanced 1 and Advanced 2. In addition, I attended the "Hands-on Physical AI Workshop Using Robot Arms and Mobile Robots," organized by Osaka Prefecture and the Robot Innovation Lab Osaka Joint Venture. Through these courses and workshops, I familiarized myself with imitation learning using the SO-101 and gradually deepened my understanding of Physical AI.

I also ran into hardware limitations. The motors originally installed on the SO-101 did not have enough torque to lift objects with a camera attached to the gripper. I tried replacing them with higher-torque motors, but the available power supply could not provide enough power to drive the replacements. Since changing the power supply was not feasible in my development environment, I had to give up on using a gripper-mounted camera.

Instead, I set up two cameras, one above the workspace and another in front of it, to observe objects from different angles and get a better sense of their three-dimensional positions when grasped. I also chose ordinary RGB cameras rather than specialized depth cameras because color information was more important than depth information for this task.

## What I learned

Coming Soon...

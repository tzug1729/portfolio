---
title: 3LM Chat
slug: 3lm-chat
period: "2026/06 – 2026/07"
role: team
responsibility: "The entire application build"
tech: ["Python", "LLM", "Ollama"]
links:
  github: "https://github.com/tzug1729/3LM-Chat"
order: 6
---

## Why I built it

I built this for the pitch contest held as the final assignment of Introduction to Problem-Based Learning, a course at my college. It was there to back up the feasibility of the product our team was proposing, 3LM Chat.
I took the view that LLMs hallucinate because the truthfulness of their output is judged only by the model's own self-evaluation, so I set out to reproduce a peer review across several models and cut hallucinations down.

## What I did

I handled the entire build of the application. Using Ollama, an open-source platform for running LLMs, I made an app where the next AI verifies the previous AI's answer, and so on, at no cost (setting up the environment is still required).

## Where I got stuck

My laptop is not powerful, so when the LLM was slow it was hard to tell whether my machine or a bug in the app I had written was to blame. The answers also had to be good enough to show an audience at the pitch contest, so picking a local LLM that pushed my hardware right to its limit took a great deal of trial and error.

## What I learned

I learned about the idea of a system prompt for an LLM, why a peer-review structure makes sense, the basics of running LLMs locally, and how much it matters to show a working demonstration at a pitch contest. It paid off: the judges rated us highest among the teams that presented that day. I expect local LLMs to become more important for security reasons, so I want to keep studying and following them.

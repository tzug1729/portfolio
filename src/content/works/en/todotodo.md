---
title: Todo TODO
slug: todotodo
period: "2026/10/ – 2026/11"
role: solo
tech: ["TypeScript", "React", "Tailwind CSS", "Vitest", "React Testing Library"]
links:
  github: "https://github.com/tzug1729/todo"
  demo: "https://tzug1729.github.io/todo/"
order: 7
---

## Why I built it

I wanted a to-do app that made finishing a task feel satisfying and rewarding, so I built Todo TODO. The name plays on the Japanese word “todo,” meaning sea lion.

## What I did

I built the UI and state management with React and TypeScript, and styled the app with Tailwind CSS. I added chat-style progress notes for each task and a completion animation in which the task card transforms into a sea lion and swims away.

I also wrote automated tests with Vitest and React Testing Library, combining TypeScript’s type checking with tests that verify the app’s behavior.

## Where I got stuck

The app’s signature feature is the sea lion animation that plays when a task is completed. Finding a movement that felt rewarding took a lot of trial and error. I eventually settled on having the sea lion turn toward and away from the viewer as it swims to the Completed tab, where the task count bounces on arrival.

## What I learned

I learned the basics of building web apps with React, TypeScript, and Tailwind CSS, along with test-driven development. I also learned that type checking and behavioral tests serve different purposes, so both need to be checked.

Paying close attention to UI and UX details, and refining them by actually using the app, made a substantial difference to both its quality and my own satisfaction with the result.

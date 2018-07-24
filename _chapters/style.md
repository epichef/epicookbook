---
title: 'Style guide for notebooks'
permalink: 'chapters/style'
previouschapter:
  url: chapters/appendices
  title: 'Appendices'
nextchapter:
  url: 
  title: ''
redirect_from:
  - 'chapters/style'
---
## Style guide for notebooks

1. Make a separate folder for each model.
2. Background for each model should be placed into a notebook `intro.ipynb`, which will then be converted into a Markdown document, `intro.md`.
3. Implementations for each model should go into a separate file:
  - `r.ipynb`: R
  - `julia.ipynb`: Julia
  - `python.ipynb`: Python
4. If there are separate implementations for each language, use a suffix separated by a hyphen e.g. `r-simecol.ipynb`.
5. Each implementation should follow the following structure:
   - Title of implementation
   - Name of author
   - Date
   - Simulation
   - Visualisation
6. Other style points:
   - Use `snake_case` for variables.

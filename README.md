# BeyondChats Assignment 

## Overview

This project implements an end-to-end content pipeline that:

- Scrapes recent blog articles from BeyondChats  
- Stores them in MongoDB as **original** articles  
- Uses an LLM to rewrite articles using top Google search references  
- Displays both original and updated articles on a Next.js frontend with proper Markdown rendering  

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Automation:** Node.js worker scripts  
- **LLM:** Groq 
- **Search:** SerpAPI  
- **Scraping:** Axios + Cheerio  

---


## Current Flow

### 1. Seed Step
- Scrapes the BeyondChats blog listing  
- Stores the latest articles as `version: original`

### 2. Automation Step
- Searches Google for top-ranking related articles  
- Scrapes reference content (where allowed)  
- Rewrites the article using an LLM  
- Saves rewritten content as `version: updated`

### 3. Frontend
- Fetches all articles from the backend  
- Renders Markdown correctly  
- Displays version badges (`original` / `updated`)

---

## Known Issues & Limitations (Important)

### 1. Scraping Restrictions (403 Errors)
- Some reference sites (e.g. ScienceDirect, university blogs) block bot requests  
- These requests return `403`  
- The pipeline skips blocked references and continues  
- This is expected behavior for many academic publishers  

---

### 2. LLM API Limitations
- **OpenAI API:** No free quota available → immediate `429` errors  
- Switched to **Groq** for free-tier inference  
- Encountered:
  - Model deprecations (older LLaMA models)
  - Token limits for long articles (`413 Request too large`)

---

### 3. Model Mismatch / Deprecation
- Initial runs failed due to deprecated Groq models  
- Fixed by switching to currently supported models  
- Highlights the need to track provider deprecations in production pipelines  

---

### 4. Initial Scraper Selector Issue
- Original scraper used the `.blog-card` selector  
- Actual site used the `.entry-card` selector  
- Resulted in zero articles being seeded initially  
- Fixed after inspecting the live DOM structure  

---

### 5. Duplicate Documents
- Original and updated articles are stored as **separate documents**  
- This is intentional to allow comparison  
- Could be normalized into a single document per article in future iterations  

---

## Why These Issues Are Left Visible

These issues are **real-world constraints**, not bugs:

- API quotas  
- Bot protection  
- Model lifecycle changes  
- HTML structure drift  

The pipeline is designed to **fail gracefully** and continue processing wherever possible.



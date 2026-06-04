# Ontology Review Backend Starter

FastAPI backend for the human-in-the-loop ontology editing dashboard.

## What it supports

- Ontology tree API
- Semantic review panel API
- Reviewer actions: approve, reject, add multiple inheritance, split, merge, escalate, turn into rule
- Reviewer notes
- Diff simulator endpoint
- In-memory seed data for fast prototyping

## Run locally

```bash
cd ontology_backend_starter
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs will be available at:

```text
http://127.0.0.1:8000/docs
```

## Suggested frontend integration

Replace hardcoded data in:
- OntologyTree.tsx with `GET /ontology/tree`
- SemanticReview.tsx with `GET /reviews/{node_id}/semantic`
- DiffSimulator.tsx with `GET /reviews/{node_id}/diff`
- ReviewerActions.tsx button handlers with `POST /reviews/{node_id}/actions`
- Reviewer notes with `PUT /reviews/{node_id}/notes`

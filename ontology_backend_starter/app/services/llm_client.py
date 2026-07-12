"""
Unified LLM client. All OpenAI calls go through here.
Reads credentials from environment (.env): OPENAI_API_KEY, OPENAI_MODEL.
"""

import os
from functools import lru_cache

from dotenv import load_dotenv
from openai import OpenAI

# Load .env once at import time
load_dotenv()


@lru_cache(maxsize=1)
def _client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY is not set. Add it to ontology_backend_starter/.env"
        )
    # timeout: fail fast instead of hanging for minutes on a stuck request.
    # max_retries=0: surface the real error immediately rather than silently
    # retrying (which is what made Re-run spin forever).
    return OpenAI(api_key=api_key, timeout=30, max_retries=0)


def get_model() -> str:
    return os.getenv("OPENAI_MODEL", "gpt-4o")


def call_llm(system: str, user: str, *, temperature: float = 0.2, max_tokens: int = 1024, model: str | None = None) -> str:
    """Send a system+user prompt to OpenAI, return the text response.
    Raises on hard API errors (caller decides how to fail soft).

    A 30s timeout ensures a single stuck request fails fast so the frontend
    'Re-running...' spinner resolves instead of hanging indefinitely."""
    resp = _client().chat.completions.create(
        model=get_model(),
        temperature=temperature,
        max_tokens=max_tokens,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        timeout=30,
    )
    return resp.choices[0].message.content or ""
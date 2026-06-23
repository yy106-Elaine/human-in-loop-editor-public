import { useState } from "react";
import { hasSupabaseConfig, supabase } from "../lib/supabaseClient";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!hasSupabaseConfig) {
      setError("Missing Supabase env vars. Check .env.local and restart npm run dev.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900">Ontology Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">Sign in to continue.</p>

        {sent ? (
          <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
            Check your email for the login link.
          </p>
        ) : (
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@mit.edu"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />

            <button
              type="submit"
              className="w-full bg-gray-900 text-white rounded-lg px-3 py-2 text-sm font-medium"
            >
              Send magic link
            </button>

            {error && <p className="text-xs text-red-600">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
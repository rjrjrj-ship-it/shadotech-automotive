"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const router      = useRouter();
  const params      = useSearchParams();
  const redirect    = params.get("redirect") ?? "/admin/calendrier";

  const [id,    setId]    = useState("");
  const [pwd,   setPwd]   = useState("");
  const [show,  setShow]  = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiant: id, motdepasse: pwd }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Erreur");
      } else {
        router.push(redirect);
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-[#C62D36] items-center justify-center mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-white font-bold text-2xl">Panel Admin</h1>
          <p className="text-[#6B7280] text-sm mt-1">Shadotech Automotive</p>
        </div>

        <form onSubmit={submit} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-[#9CA3AF] text-xs font-medium mb-2 uppercase tracking-wide">
              Identifiant
            </label>
            <input
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
              required
              autoComplete="username"
              placeholder="shado-rem"
              className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#C62D36]/60 rounded-xl px-4 py-3 text-white placeholder-[#4B5563] outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-[#9CA3AF] text-xs font-medium mb-2 uppercase tracking-wide">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#C62D36]/60 rounded-xl px-4 py-3 pr-11 text-white placeholder-[#4B5563] outline-none transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C62D36] hover:bg-[#a82530] disabled:opacity-50 text-white font-semibold rounded-xl transition-all"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-[#3B3B3B] text-xs mt-6">
          Accès réservé — Shadotech Automotive
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}

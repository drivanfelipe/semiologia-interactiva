"use client";

import { useMemo, useRef, useState } from "react";
import { INITIAL_CASE_MESSAGE } from "../lib/caseData";

type Student = {
  firstName: string;
  lastName: string;
  code: string;
};

type ChatMessage = {
  role: "student" | "patient" | "system";
  content: string;
};

type Step = "login" | "chat" | "diagnosis" | "evaluation";

export default function HomePage() {
  const [step, setStep] = useState<Step>("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [diagnosticImpression, setDiagnosticImpression] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suspended, setSuspended] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const studentName = useMemo(() => {
    if (!student) return "";
    return `${student.firstName} ${student.lastName}`.trim();
  }, [student]);

  async function startSession(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, code })
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo iniciar.");

      setStudent(data.student);
      setMessages([{ role: "system", content: INITIAL_CASE_MESSAGE }]);
      setStep("chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar.");
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!student || !message.trim() || loading || suspended) return;

    const currentMessage = message.trim();
    setMessage("");
    setError("");
    setLoading(true);

    const visibleStudentMessage: ChatMessage = { role: "student", content: currentMessage };
    const updatedMessages = [...messages, visibleStudentMessage];
    setMessages(updatedMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          message: currentMessage,
          messages: messages.filter((m) => m.role !== "system")
        })
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo responder.");

      if (data.suspended) setSuspended(true);
      setMessages([...updatedMessages, { role: data.suspended ? "system" : "patient", content: data.reply }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo responder.");
    } finally {
      setLoading(false);
    }
  }

  async function evaluateCase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!student || !diagnosticImpression.trim() || loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          diagnosticImpression,
          messages: messages.filter((m) => m.role === "student" || m.role === "patient")
        })
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "No se pudo evaluar.");

      setEvaluation(data.evaluation);
      setStep("evaluation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo evaluar.");
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setStep("login");
    setStudent(null);
    setMessages([]);
    setMessage("");
    setDiagnosticImpression("");
    setEvaluation("");
    setError("");
    setSuspended(false);
  }

  if (step === "login") {
    return (
      <main className="container">
        <section className="hero">
          <div className="card brand-card">
            <div>
              <span className="kicker">Simulación académica</span>
              <h1>Semiología Interactiva — Paciente Virtual</h1>
              <p className="subtitle">
                Entrenamiento conversacional para estudiantes de medicina. Practica entrevista clínica,
                comunicación, observación dirigida y construcción de una impresión final dentro de un escenario ficticio.
              </p>
            </div>
            <div className="disclaimer">
              Esta herramienta es exclusivamente educativa. No brinda atención médica real, diagnóstico para pacientes reales,
              tratamiento ni recomendaciones terapéuticas.
            </div>
          </div>

          <form className="card login-card form-grid" onSubmit={startSession}>
            <div>
              <span className="kicker">Acceso registrado</span>
              <h2>Ingreso del estudiante</h2>
              <p className="small">Ingresa tus datos y el código individual entregado por el docente.</p>
            </div>

            <label>
              Nombre
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ej. Juan" autoComplete="given-name" />
            </label>

            <label>
              Apellido
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Ej. Pérez" autoComplete="family-name" />
            </label>

            <label>
              Código individual
              <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="SEM-2026-001" />
            </label>

            {error && <p className="error">{error}</p>}
            <button className="btn" disabled={loading}>{loading ? "Validando..." : "Iniciar caso"}</button>
            <p className="small">Código de prueba incluido en el proyecto: SEM-2026-001</p>
          </form>
        </section>
      </main>
    );
  }

  if (step === "diagnosis") {
    return (
      <main className="container">
        <section className="card evaluation">
          <span className="kicker">Cierre del caso</span>
          <h1>Impresión final</h1>
          <p className="subtitle">
            {studentName}, escribe tu impresión diagnóstica completa o impresión académica final. Incluye los datos que sustentan tu razonamiento.
          </p>
          <form className="form-grid" onSubmit={evaluateCase}>
            <textarea value={diagnosticImpression} onChange={(e) => setDiagnosticImpression(e.target.value)} placeholder="Escribe aquí tu impresión final..." />
            {error && <p className="error">{error}</p>}
            <button className="btn" disabled={loading}>{loading ? "Evaluando..." : "Generar retroalimentación"}</button>
          </form>
        </section>
      </main>
    );
  }

  if (step === "evaluation") {
    return (
      <main className="container">
        <section className="card evaluation">
          <span className="kicker">Retroalimentación académica</span>
          <h1>Resultado</h1>
          <pre>{evaluation}</pre>
          <button className="btn btn-secondary" onClick={restart}>Volver al inicio</button>
        </section>
      </main>
    );
  }

  return (
    <main className="card app-shell">
      <header className="topbar">
        <div>
          <h2>Semiología Interactiva — Paciente Virtual</h2>
          <p>{studentName}</p>
        </div>
        <div className="rules">
          <span className="pill">Máx. 3 preguntas por mensaje</span>
          <span className="pill">Sin plantillas pegadas</span>
          <span className="pill">Observación dirigida permitida</span>
        </div>
      </header>

      <section className="chat" aria-live="polite">
        {messages.map((m, index) => (
          <div className={`message ${m.role}`} key={`${m.role}-${index}`}>{m.content}</div>
        ))}
        {loading && <div className="message patient">...</div>}
        <div ref={chatEndRef} />
      </section>

      {error && <div className="message system" style={{ margin: "8px auto" }}>{error}</div>}

      <form className="composer" onSubmit={sendMessage}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={suspended ? "Actividad suspendida." : "Escribe tu pregunta o exploración dirigida..."}
          maxLength={800}
          disabled={loading || suspended}
        />
        <button className="btn" disabled={loading || suspended || !message.trim()}>Enviar</button>
        <button className="btn btn-danger" type="button" onClick={() => setStep("diagnosis")} disabled={loading || messages.length < 2}>
          Finalizar
        </button>
      </form>
    </main>
  );
}

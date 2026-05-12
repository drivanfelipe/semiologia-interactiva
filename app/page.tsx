"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Student = {
  firstName: string;
  lastName: string;
  code: string;
};

type CaseOption = {
  id: string;
  publicLabel: string;
  publicSex: string;
  publicAge: number;
};

type ChatMessage = {
  role: "student" | "patient" | "system";
  content: string;
};

type Step = "login" | "selectCase" | "chat" | "diagnosis" | "evaluation";

const CONSULTATION_LIMIT_SECONDS = 30 * 60;
const STORAGE_PREFIX = "semiologia-interactiva";

function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function normalizeStorageValue(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "-");
}

function getSessionKey(studentCode: string, caseId: string): string {
  return `${STORAGE_PREFIX}:started-at:${normalizeStorageValue(studentCode)}:${caseId}`;
}

function getMessagesKey(studentCode: string, caseId: string): string {
  return `${STORAGE_PREFIX}:messages:${normalizeStorageValue(studentCode)}:${caseId}`;
}

function getStoredStartTime(studentCode: string, caseId: string): number | null {
  if (typeof window === "undefined") return null;

  const rawValue = window.localStorage.getItem(getSessionKey(studentCode, caseId));
  const parsedValue = rawValue ? Number(rawValue) : NaN;

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : null;
}

function getOrCreateStartTime(studentCode: string, caseId: string): number {
  const existingStartTime = getStoredStartTime(studentCode, caseId);

  if (existingStartTime) {
    return existingStartTime;
  }

  const newStartTime = Date.now();
  window.localStorage.setItem(getSessionKey(studentCode, caseId), String(newStartTime));

  return newStartTime;
}

function calculateRemainingSeconds(startedAt: number): number {
  const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
  return Math.max(0, CONSULTATION_LIMIT_SECONDS - elapsedSeconds);
}

function loadStoredMessages(studentCode: string, caseId: string): ChatMessage[] {
  if (typeof window === "undefined") return [];

  try {
    const rawValue = window.localStorage.getItem(getMessagesKey(studentCode, caseId));
    const parsedValue = rawValue ? JSON.parse(rawValue) : [];

    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter(
      (item) =>
        item &&
        (item.role === "student" || item.role === "patient" || item.role === "system") &&
        typeof item.content === "string"
    );
  } catch {
    return [];
  }
}

function saveStoredMessages(studentCode: string, caseId: string, messages: ChatMessage[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    getMessagesKey(studentCode, caseId),
    JSON.stringify(messages)
  );
}

export default function HomePage() {
  const [step, setStep] = useState<Step>("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [caseOptions, setCaseOptions] = useState<CaseOption[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [caseStartedAt, setCaseStartedAt] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [diagnosticImpression, setDiagnosticImpression] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suspended, setSuspended] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(CONSULTATION_LIMIT_SECONDS);
  const [timeExpired, setTimeExpired] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const studentName = useMemo(() => {
    if (!student) return "";
    return `${student.firstName} ${student.lastName}`.trim();
  }, [student]);

  const selectedCase = useMemo(() => {
    return caseOptions.find((item) => item.id === selectedCaseId) || null;
  }, [caseOptions, selectedCaseId]);

  const consultationIsOver = remainingSeconds <= 0;

  useEffect(() => {
    if (step !== "chat" || !caseStartedAt) return;

    const tick = () => {
      const remaining = calculateRemainingSeconds(caseStartedAt);
      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        setTimeExpired(true);
        setError("");
        setStep("diagnosis");
      }
    };

    tick();

    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, [step, caseStartedAt]);

  useEffect(() => {
    if (!student || !selectedCaseId || messages.length === 0) return;

    saveStoredMessages(student.code, selectedCaseId, messages);
  }, [student, selectedCaseId, messages]);

  async function loadCaseOptions() {
    const res = await fetch("/api/cases");
    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data.error || "No se pudieron cargar los pacientes.");
    }

    setCaseOptions(data.cases);
  }

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

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo iniciar.");
      }

      await loadCaseOptions();

      setStudent(data.student);
      setMessages([]);
      setSelectedCaseId("");
      setCaseStartedAt(null);
      setRemainingSeconds(CONSULTATION_LIMIT_SECONDS);
      setTimeExpired(false);
      setSuspended(false);
      setDiagnosticImpression("");
      setEvaluation("");
      setStep("selectCase");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar.");
    } finally {
      setLoading(false);
    }
  }

  function chooseCase(caseOption: CaseOption) {
    if (!student) return;

    const startedAt = getOrCreateStartTime(student.code, caseOption.id);
    const remaining = calculateRemainingSeconds(startedAt);
    const storedMessages = loadStoredMessages(student.code, caseOption.id);

    const initialMessages =
      storedMessages.length > 0
        ? storedMessages
        : [
            {
              role: "system" as const,
              content: `Ha seleccionado ${caseOption.publicLabel}: ${caseOption.publicSex}, ${caseOption.publicAge} años.\n\nUsted se encuentra en consulta externa. Inicie la entrevista con la persona simulada.`
            }
          ];

    setSelectedCaseId(caseOption.id);
    setCaseStartedAt(startedAt);
    setMessages(initialMessages);
    setRemainingSeconds(remaining);
    setTimeExpired(remaining <= 0);
    setSuspended(false);
    setError("");

    if (remaining <= 0) {
      setStep("diagnosis");
      return;
    }

    setStep("chat");
  }

  async function sendMessage(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!student || !message.trim() || loading || suspended || !selectedCaseId) return;

    if (consultationIsOver) {
      setTimeExpired(true);
      setStep("diagnosis");
      return;
    }

    const currentMessage = message.trim();

    setMessage("");
    setError("");
    setLoading(true);

    const visibleStudentMessage: ChatMessage = {
      role: "student",
      content: currentMessage
    };

    const updatedMessages = [...messages, visibleStudentMessage];

    setMessages(updatedMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          caseId: selectedCaseId,
          message: currentMessage,
          messages: messages.filter((m) => m.role !== "system")
        })
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo responder.");
      }

      if (data.suspended) {
        setSuspended(true);
      }

      setMessages([
        ...updatedMessages,
        {
          role: data.suspended ? "system" : "patient",
          content: data.reply
        }
      ]);

      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo responder.");
    } finally {
      setLoading(false);
    }
  }

  async function evaluateCase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!student || !diagnosticImpression.trim() || loading || !selectedCaseId) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          caseId: selectedCaseId,
          diagnosticImpression,
          messages: messages.filter((m) => m.role === "student" || m.role === "patient")
        })
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo evaluar.");
      }

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
    setCaseOptions([]);
    setSelectedCaseId("");
    setCaseStartedAt(null);
    setMessages([]);
    setMessage("");
    setDiagnosticImpression("");
    setEvaluation("");
    setError("");
    setSuspended(false);
    setRemainingSeconds(CONSULTATION_LIMIT_SECONDS);
    setTimeExpired(false);
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
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ej. Juan"
                autoComplete="given-name"
              />
            </label>

            <label>
              Apellido
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ej. Pérez"
                autoComplete="family-name"
              />
            </label>

            <label>
              Código individual
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="SEM-2026-001"
              />
            </label>

            {error && <p className="error">{error}</p>}

            <button className="btn" disabled={loading}>
              {loading ? "Validando..." : "Iniciar"}
            </button>

            <p className="small">
              Tiempo máximo de consulta: 30 minutos. El tiempo no se detiene si cierras la app o pierdes conexión.
            </p>
          </form>
        </section>
      </main>
    );
  }

  if (step === "selectCase") {
    return (
      <main className="container">
        <section className="card evaluation">
          <span className="kicker">Selección de paciente</span>
          <h1>Elige una persona simulada</h1>
          <p className="subtitle">
            Solo se muestra sexo y edad. No se revela el motivo de consulta ni el objetivo académico.
          </p>

          <div className="form-grid">
            {caseOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                className="btn btn-secondary"
                onClick={() => chooseCase(item)}
              >
                {item.publicLabel} — {item.publicSex}, {item.publicAge} años
              </button>
            ))}
          </div>

          {error && <p className="error">{error}</p>}
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

          {timeExpired && (
            <p className="error">
              El tiempo de consulta terminó. Escribe ahora tu impresión final con la información obtenida.
            </p>
          )}

          <p className="subtitle">
            {studentName}, escribe tu impresión diagnóstica completa o impresión académica final.
            Incluye los datos que sustentan tu razonamiento.
          </p>

          <form className="form-grid" onSubmit={evaluateCase}>
            <textarea
              value={diagnosticImpression}
              onChange={(e) => setDiagnosticImpression(e.target.value)}
              placeholder="Escribe aquí tu impresión final..."
            />

            {error && <p className="error">{error}</p>}

            <button className="btn" disabled={loading}>
              {loading ? "Evaluando..." : "Generar retroalimentación"}
            </button>
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
          <button className="btn btn-secondary" onClick={restart}>
            Volver al inicio
          </button>
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
          {selectedCase && (
            <p>
              {selectedCase.publicLabel} — {selectedCase.publicSex}, {selectedCase.publicAge} años
            </p>
          )}
        </div>

        <div className="rules">
          <span className="pill">Tiempo restante: {formatTime(remainingSeconds)}</span>
          <span className="pill">Máx. 3 preguntas por mensaje</span>
          <span className="pill">Sin plantillas pegadas</span>
          <span className="pill">Observación dirigida permitida</span>
        </div>
      </header>

      <section className="chat" aria-live="polite">
        {messages.map((m, index) => (
          <div className={`message ${m.role}`} key={`${m.role}-${index}`}>
            {m.content}
          </div>
        ))}

        {loading && <div className="message patient">...</div>}

        <div ref={chatEndRef} />
      </section>

      {error && (
        <div className="message system" style={{ margin: "8px auto" }}>
          {error}
        </div>
      )}

      <form className="composer" onSubmit={sendMessage}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void sendMessage();
            }
          }}
          placeholder={
            suspended
              ? "Actividad suspendida."
              : consultationIsOver
              ? "El tiempo terminó."
              : "Escribe tu pregunta o exploración dirigida..."
          }
          maxLength={800}
          disabled={loading || suspended || consultationIsOver}
        />

        <button
          className="btn"
          disabled={loading || suspended || consultationIsOver || !message.trim()}
        >
          Enviar
        </button>

        <button
          className="btn btn-danger"
          type="button"
          onClick={() => setStep("diagnosis")}
          disabled={loading || messages.length < 2}
        >
          Finalizar
        </button>
      </form>
    </main>
  );
}
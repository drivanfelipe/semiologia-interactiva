"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent
} from "react";

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

function isProfessorUser(student: Student | null): boolean {
  if (!student) return false;

  const normalizedCode = normalizeStorageValue(student.code);
  const normalizedFirstName = normalizeStorageValue(student.firstName);
  const normalizedLastName = normalizeStorageValue(student.lastName);

  return (
    normalizedCode === "PROFESOR" ||
    normalizedCode === "SEM-PROFESOR" ||
    normalizedFirstName === "PROFESOR" ||
    normalizedLastName === "PROFESOR"
  );
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

function saveStoredMessages(studentCode: string, caseId: string, messages: ChatMessage[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    getMessagesKey(studentCode, caseId),
    JSON.stringify(messages)
  );
}

function clearStoredMessages(studentCode: string, caseId: string) {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(getMessagesKey(studentCode, caseId));
}

function blockClipboardAction(
  event: ClipboardEvent<HTMLTextAreaElement> | DragEvent<HTMLTextAreaElement>
) {
  event.preventDefault();
  alert(
    "Para esta práctica no está permitido copiar, pegar, cortar o arrastrar texto. Debes escribir manualmente."
  );
}

function blockClipboardKeys(event: KeyboardEvent<HTMLTextAreaElement>) {
  const key = event.key.toLowerCase();

  const isClipboardShortcut =
    (event.ctrlKey || event.metaKey) &&
    (key === "v" || key === "c" || key === "x" || key === "a");

  if (isClipboardShortcut) {
    event.preventDefault();
    alert(
      "Para esta práctica no está permitido usar copiar, pegar, cortar o seleccionar todo."
    );
  }
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

  const professorMode = useMemo(() => isProfessorUser(student), [student]);

  const consultationIsOver = !professorMode && remainingSeconds <= 0;

  useEffect(() => {
    if (step !== "chat" || !caseStartedAt) return;

    if (professorMode) {
      setRemainingSeconds(CONSULTATION_LIMIT_SECONDS);
      setTimeExpired(false);
      return;
    }

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
  }, [step, caseStartedAt, professorMode]);

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

  async function startSession(event: FormEvent<HTMLFormElement>) {
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

    const isProfessor = isProfessorUser(student);

    const startedAt = isProfessor
      ? Date.now()
      : getOrCreateStartTime(student.code, caseOption.id);

    const remaining = isProfessor
      ? CONSULTATION_LIMIT_SECONDS
      : calculateRemainingSeconds(startedAt);

    clearStoredMessages(student.code, caseOption.id);

    setSelectedCaseId(caseOption.id);
    setCaseStartedAt(startedAt);
    setMessages([]);
    setMessage("");
    setRemainingSeconds(remaining);
    setTimeExpired(false);
    setSuspended(false);
    setError("");
    setDiagnosticImpression("");
    setEvaluation("");

    if (!isProfessor && remaining <= 0) {
      setTimeExpired(true);
      setStep("diagnosis");
      return;
    }

    setStep("chat");
  }

  async function sendMessage(event?: FormEvent<HTMLFormElement>) {
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
          messages: messages
            .filter((m) => m.role !== "system")
            .slice(-24)
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

  async function evaluateCase(event: FormEvent<HTMLFormElement>) {
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
          messages: messages
            .filter((m) => m.role === "student" || m.role === "patient")
            .slice(-80)
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
              <h1>Semiología Interactiva</h1>
              <p className="subtitle">
                Paciente virtual para practicar entrevista clínica, observación dirigida,
                examen físico y construcción de una impresión final.
              </p>
            </div>

            <div className="feature-list">
              <div>
                <strong>30 minutos</strong>
                <span>Tiempo máximo de entrevista para estudiantes</span>
              </div>
              <div>
                <strong>6 pacientes</strong>
                <span>Casos clínicos simulados</span>
              </div>
              <div>
                <strong>Modo profesor</strong>
                <span>Acceso sin límite de tiempo</span>
              </div>
            </div>

            <div className="disclaimer">
              Esta herramienta es exclusivamente educativa. No brinda atención médica real,
              diagnóstico para pacientes reales, tratamiento ni recomendaciones terapéuticas.
            </div>
          </div>

          <form className="card login-card form-grid" onSubmit={startSession}>
            <div>
              <span className="kicker">Acceso registrado</span>
              <h2>Ingreso del estudiante</h2>
              <p className="small">
                Ingresa tu nombre, apellido y el ID de identificación entregado por el docente.
              </p>
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
              ID de identificación
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="572698"
                inputMode="numeric"
              />
            </label>

            {error && <p className="error">{error}</p>}

            <button className="btn" disabled={loading}>
              {loading ? "Validando..." : "Iniciar práctica"}
            </button>

            <p className="small">
              Para estudiantes, el tiempo no se detiene si cierran la app o pierden conexión.
            </p>
          </form>
        </section>
      </main>
    );
  }

  if (step === "selectCase") {
    return (
      <main className="container">
        <section className="select-layout">
          <div className="select-header card">
            <span className="kicker">Selección de paciente</span>
            <h1>Elige una persona simulada</h1>
            <p className="subtitle">
              Solo verás sexo y edad. El motivo de consulta, antecedentes y objetivo
              académico permanecerán ocultos hasta que los explores durante la entrevista.
            </p>

            <div className="instruction-panel">
              <strong>Instrucciones de la práctica</strong>
              <p>Realiza una entrevista clínica organizada.</p>
              <p>Máximo 3 preguntas por mensaje.</p>
              <p>Puedes solicitar examen físico u observación dirigida.</p>
              <p>No está permitido copiar, pegar, cortar o arrastrar texto en el chat.</p>
              <p>
                {professorMode
                  ? "Modo profesor activo: no tendrás límite de tiempo."
                  : "Tienes 30 minutos. Al terminar, presiona Finalizar y escribe tu impresión final."}
              </p>
            </div>
          </div>

          <div className="case-grid">
            {caseOptions.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="case-card"
                onClick={() => chooseCase(item)}
              >
                <div className="case-card-top">
                  <span className="case-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="case-chip">Paciente virtual</span>
                </div>

                <div>
                  <h2>{item.publicLabel}</h2>
                  <p className="case-meta">
                    {item.publicSex} · {item.publicAge} años
                  </p>
                </div>

                <div className="case-hidden">
                  Información clínica oculta
                </div>

                <span className="case-action">Iniciar entrevista →</span>
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
              onPaste={blockClipboardAction}
              onCopy={blockClipboardAction}
              onCut={blockClipboardAction}
              onDrop={blockClipboardAction}
              onContextMenu={(e) => e.preventDefault()}
              onKeyDown={blockClipboardKeys}
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
          <h2>Semiología Interactiva</h2>
          <p>{studentName}</p>
          {selectedCase && (
            <p>
              {selectedCase.publicLabel} — {selectedCase.publicSex}, {selectedCase.publicAge} años
            </p>
          )}
        </div>

        <div className="rules">
          <span className="pill timer-pill">
            {professorMode ? "Modo profesor: sin límite" : `Tiempo: ${formatTime(remainingSeconds)}`}
          </span>
          <span className="pill">Máx. 3 preguntas por mensaje</span>
          <span className="pill">Examen físico permitido</span>
          <span className="pill">Sin copiar/pegar</span>
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
          onPaste={blockClipboardAction}
          onCopy={blockClipboardAction}
          onCut={blockClipboardAction}
          onDrop={blockClipboardAction}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            blockClipboardKeys(e);

            if (e.defaultPrevented) {
              return;
            }

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
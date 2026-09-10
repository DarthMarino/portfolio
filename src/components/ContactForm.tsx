import { createSignal, For, onCleanup, type Component } from "solid-js";
import type * as i18n from "@solid-primitives/i18n";

const ContactForm: Component<{
  t: i18n.Translator<i18n.Flatten<Record<string, any>>>;
}> = (props) => {
  const [submitting, setSubmitting] = createSignal(false);
  const [status, setStatus] = createSignal<"success" | "error" | null>(null);
  let request: AbortController | undefined;
  onCleanup(() => request?.abort());

  const submit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (submitting()) return;
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    setSubmitting(true);
    setStatus(null);
    request = new AbortController();
    const timeout = window.setTimeout(() => request?.abort(), 20000);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
        signal: request.signal,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={submit} class="grid gap-5" aria-busy={submitting()}>
      <input
        type="hidden"
        name="access_key"
        value="bb461d35-303f-420c-b3c6-233ebd2f9397"
      />
      <input
        type="checkbox"
        name="botcheck"
        class="hidden"
        tabindex="-1"
        aria-hidden="true"
      />
      <div class="grid gap-5 sm:grid-cols-2">
        <For
          each={[
            { name: "name", type: "text" },
            { name: "email", type: "email" },
          ]}
        >
          {(field) => (
            <label
              class="grid gap-2 text-xs font-medium"
              for={`contact-${field.name}`}
            >
              {props.t(`form_${field.name}`)}
              <input
                id={`contact-${field.name}`}
                name={field.name}
                type={field.type}
                autocomplete={field.name}
                required
                readOnly={submitting()}
                class="input h-12 w-full bg-base-100 text-sm"
                placeholder={props.t(`form_${field.name}_hint`)}
              />
            </label>
          )}
        </For>
      </div>
      <label class="grid gap-2 text-xs font-medium" for="contact-subject">
        {props.t("form_subject")}
        <input
          id="contact-subject"
          name="subject"
          required
          readOnly={submitting()}
          class="input h-12 w-full bg-base-100 text-sm"
          placeholder={props.t("form_subject_hint")}
        />
      </label>
      <label class="grid gap-2 text-xs font-medium" for="contact-message">
        {props.t("form_message")}
        <textarea
          id="contact-message"
          name="message"
          required
          readOnly={submitting()}
          class="textarea min-h-40 w-full bg-base-100 text-sm"
          rows={6}
          placeholder={props.t("form_message_hint")}
        />
      </label>
      <button
        type="submit"
        class="btn btn-primary justify-self-start"
        disabled={submitting()}
      >
        {submitting() && <span class="loading loading-spinner loading-xs" />}
        {props.t(submitting() ? "form_sending" : "form_send")}
        <span aria-hidden="true">↗</span>
      </button>
      <div aria-live="polite" aria-atomic="true">
        {status() && (
          <p
            class={`rounded-lg border p-4 text-sm ${status() === "success" ? "border-success/30 text-success" : "border-error/30 text-error"}`}
          >
            {props.t(status() === "success" ? "form_success" : "form_error")}
          </p>
        )}
      </div>
    </form>
  );
};
export default ContactForm;

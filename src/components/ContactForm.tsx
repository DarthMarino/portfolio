import { type Component, createSignal } from "solid-js";
import "./ContactForm.css";

type ContactFormProps = {
  t: any;
};

const ContactForm: Component<ContactFormProps> = (props) => {
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submitStatus, setSubmitStatus] = createSignal<"success" | "error" | null>(null);
  const [formData, setFormData] = createSignal({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="contact-form-wrapper">
      <form class="contact-form" onSubmit={handleSubmit}>
        {/* Web3Forms Access Key */}
        <input type="hidden" name="access_key" value="bb461d35-303f-420c-b3c6-233ebd2f9397" />

        {/* Honeypot spam protection (invisible to users) */}
        <input type="checkbox" name="botcheck" class="hidden" style={{ display: "none" }} />

        {/* Name Field */}
        <div class="form-group">
          <label for="name" class="form-label">NAME</label>
          <input
            type="text"
            id="name"
            name="name"
            class="form-input"
            placeholder="Your name"
            required
            value={formData().name}
            onInput={(e) => setFormData({ ...formData(), name: e.currentTarget.value })}
          />
        </div>

        {/* Email Field */}
        <div class="form-group">
          <label for="email" class="form-label">EMAIL</label>
          <div class="input-with-icon">
            <input
              type="email"
              id="email"
              name="email"
              class="form-input"
              placeholder="example@example.com"
              required
              value={formData().email}
              onInput={(e) => setFormData({ ...formData(), email: e.currentTarget.value })}
            />
            <span class="input-icon">📧</span>
          </div>
        </div>

        {/* Subject Field */}
        <div class="form-group">
          <label for="subject" class="form-label">SUBJECT</label>
          <input
            type="text"
            id="subject"
            name="subject"
            class="form-input"
            placeholder="Message subject"
            required
            value={formData().subject}
            onInput={(e) => setFormData({ ...formData(), subject: e.currentTarget.value })}
          />
        </div>

        {/* Message Field */}
        <div class="form-group">
          <label for="message" class="form-label">MESSAGE</label>
          <textarea
            id="message"
            name="message"
            class="form-textarea"
            placeholder="Message Content"
            rows={8}
            required
            value={formData().message}
            onInput={(e) => setFormData({ ...formData(), message: e.currentTarget.value })}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          class="form-submit-btn"
          disabled={isSubmitting()}
        >
          {isSubmitting() ? (
            <>
              <span class="spinner"></span>
              <span>Sending...</span>
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {/* Success Message */}
        {submitStatus() === "success" && (
          <div class="form-message form-success">
            ✓ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {/* Error Message */}
        {submitStatus() === "error" && (
          <div class="form-message form-error">
            ✗ Something went wrong. Please try again or email me directly.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;

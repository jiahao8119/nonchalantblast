import React, { useState } from "react";

function App() {
  const [numbers, setNumbers] = useState("");
  const [templates, setTemplates] = useState([""]); // start with one blank template
  const [sending, setSending] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleSend = async () => {
    const phoneList = numbers
      .split("\n")
      .map((num) => num.trim())
      .filter(Boolean);

    const validTemplates = templates.map((t) => t.trim()).filter(Boolean);

    if (!phoneList.length || !validTemplates.length) {
      alert("Please enter phone numbers and at least one message template!");
      return;
    }

    setSending(true);

    for (let i = 0; i < phoneList.length; i++) {
      const phone = phoneList[i];
      // pick a random template each time
      const message =
        validTemplates[Math.floor(Math.random() * validTemplates.length)];

      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
      console.log(`Opened chat for ${phone}`);
      await delay(10000); // 10 seconds
    }

    setSending(false);
    alert("All numbers processed!");
  };

  // add a new message box
  const addTemplate = () => setTemplates([...templates, ""]);

  // remove one
  const removeTemplate = (index) => {
    const updated = templates.filter((_, i) => i !== index);
    setTemplates(updated.length ? updated : [""]);
  };

  // handle text change for template i
  const handleTemplateChange = (index, value) => {
    const updated = [...templates];
    updated[index] = value;
    setTemplates(updated);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "420px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "24px", color: "#333" }}>
          Nonchalant What$$$App Bla$$$ter
        </h2>

        {/* Phone numbers input */}
        <div style={{ textAlign: "left", marginBottom: "16px" }}>
          <label style={{ fontWeight: 600 }}>📱 Phone Numbers</label>
          <textarea
            rows={6}
            placeholder="60123456789\n60198765432"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              resize: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Message templates */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ fontWeight: 600 }}>💬 Message Templates</label>
          {templates.map((temp, index) => (
            <div key={index} style={{ marginTop: "10px", position: "relative" }}>
              <textarea
                rows={4}
                placeholder={`Message template ${index + 1}`}
                value={temp}
                onChange={(e) => handleTemplateChange(index, e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  resize: "none",
                  fontFamily: "inherit",
                }}
              />
              {templates.length > 1 && (
                <button
                  onClick={() => removeTemplate(index)}
                  style={{
                    position: "absolute",
                    right: "-10px",
                    top: "-10px",
                    backgroundColor: "#ff5b5b",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    cursor: "pointer",
                  }}
                  title="Remove template"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addTemplate}
            style={{
              marginTop: "12px",
              padding: "8px 16px",
              backgroundColor: "#eaeaea",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ➕ Add Another Template
          </button>
        </div>

        {/* Send button */}
        <button
          disabled={sending}
          onClick={handleSend}
          style={{
            width: "100%",
            padding: "12px 0",
            backgroundColor: sending ? "#aaa" : "#25D366",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: sending ? "not-allowed" : "pointer",
            transition: "background 0.3s ease",
          }}
        >
          {sending ? "Sending..." : "Start Sending"}
        </button>

        <p style={{ fontSize: "12px", color: "#999", marginTop: "18px" }}>
          ⚠️ Keep WhatsApp Web logged in and allow pop-ups
        </p>
      </div>
    </div>
  );
}

export default App;

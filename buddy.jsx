// AI Buddy — a stylized animated character.
// On the landing page (per the spec), the buddy doesn't run webcam analysis —
// just idle breathing, blinking, and slide-transition reactions.

function Buddy({ size = "md", mood = "idle", className = "" }) {
  return (
    <div className={`buddy ${size === "sm" ? "sm" : size === "lg" ? "lg" : ""} ${className}`}>
      <div className="buddy-glow" />
      <div className={`buddy-body mood-${mood}`}>
        <div className="buddy-spark" />
        <div className="buddy-face">
          <span className="buddy-eye" />
          <span className="buddy-eye" />
        </div>
      </div>
    </div>
  );
}

window.Buddy = Buddy;

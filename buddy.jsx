// AI Buddy — a stylized animated character.
// The character chrome (layered radial gradients, breathing, blinking) lives
// in styles.css per the plan's rule §5.1.2 — complex one-off styling stays
// in plain CSS. Tailwind utilities can't compose this cleanly.

function Buddy({ size = "md", mood = "idle", className = "" }) {
  const sizeClass = size === "sm" ? "sm" : size === "lg" ? "lg" : "";
  return (
    <div className={`buddy ${sizeClass} ${className}`}>
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

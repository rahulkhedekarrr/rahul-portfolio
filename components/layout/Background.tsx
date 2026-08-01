const Background = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden paint-optimized"
      aria-hidden="true"
    >
      <div className="tech-grid tech-grid-fade absolute inset-0 opacity-90" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, color-mix(in srgb, var(--sharp-accent) 12%, transparent), transparent 55%)",
        }}
      />
    </div>
  );
};

export default Background;

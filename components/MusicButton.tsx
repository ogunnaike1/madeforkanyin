"use client";

interface MusicButtonProps {
  playing: boolean;
  visible: boolean;
  onToggle: () => void;
}

export function MusicButton({ playing, visible, onToggle }: MusicButtonProps) {
  if (!visible) return null;
  return (
    <button
      className={"music-btn " + (playing ? "on" : "")}
      onClick={onToggle}
      title={playing ? "Pause music" : "Play music"}
    >
      <span className="music-ic">{playing ? "♫" : "♪"}</span>
      {playing && (
        <span className="eq">
          <i></i><i></i><i></i>
        </span>
      )}
    </button>
  );
}

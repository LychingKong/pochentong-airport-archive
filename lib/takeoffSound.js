// A jet takeoff "whoosh", made in the browser with the Web Audio API, so
// no sound file or package is needed. Rising filtered noise (the air rush)
// plus a low engine tone that climbs in pitch, about 2.6 seconds long.
// Must be called from a click: browsers only allow sound after one.
export function playTakeoffSound() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const now = ctx.currentTime;
  const length = 2.6;

  const master = ctx.createGain();
  master.gain.value = 0.35;
  master.connect(ctx.destination);

  // Air rush: white noise through a band-pass filter that sweeps upward.
  const buffer = ctx.createBuffer(1, ctx.sampleRate * length, ctx.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const sweep = ctx.createBiquadFilter();
  sweep.type = "bandpass";
  sweep.Q.value = 0.9;
  sweep.frequency.setValueAtTime(260, now);
  sweep.frequency.exponentialRampToValueAtTime(2600, now + length * 0.8);
  const rush = ctx.createGain();
  rush.gain.setValueAtTime(0.0001, now);
  rush.gain.exponentialRampToValueAtTime(0.9, now + 0.7);
  rush.gain.setValueAtTime(0.9, now + 1.5);
  rush.gain.exponentialRampToValueAtTime(0.0001, now + length);
  noise.connect(sweep).connect(rush).connect(master);

  // Engine: a soft sawtooth, low-passed, rising in pitch as it climbs.
  const engine = ctx.createOscillator();
  engine.type = "sawtooth";
  engine.frequency.setValueAtTime(80, now);
  engine.frequency.exponentialRampToValueAtTime(380, now + length * 0.85);
  const soften = ctx.createBiquadFilter();
  soften.type = "lowpass";
  soften.frequency.value = 900;
  const hum = ctx.createGain();
  hum.gain.setValueAtTime(0.0001, now);
  hum.gain.exponentialRampToValueAtTime(0.12, now + 0.5);
  hum.gain.exponentialRampToValueAtTime(0.0001, now + length);
  engine.connect(soften).connect(hum).connect(master);

  noise.start(now);
  engine.start(now);
  noise.stop(now + length);
  engine.stop(now + length);
  engine.onended = () => ctx.close();
}

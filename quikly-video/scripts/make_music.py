"""Genera la pista instrumental (dark luxury, Am-F-C-G-Am, 90 BPM) -> public/music.mp3.
Uso: python3 scripts/make_music.py"""
import subprocess
import numpy as np
from scipy.signal import butter, lfilter, fftconvolve

SR, DUR, BPM = 44100, 26.0, 90
N = int(SR * DUR)
beat = 60 / BPM
t_all = np.arange(N) / SR
rng = np.random.default_rng(7)

def hz(m): return 440.0 * 2 ** ((m - 69) / 12)
def lp(x, f, o=2): b, a = butter(o, f / (SR / 2), "low"); return lfilter(b, a, x)
def hp(x, f, o=2): b, a = butter(o, f / (SR / 2), "high"); return lfilter(b, a, x)

def put(buf, start, sig):
    i = int(start * SR)
    if i >= N: return
    sig = sig[: N - i]
    buf[i : i + len(sig)] += sig

def saw(f, n, harm=10):
    t = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * k * t) / k for k in range(1, harm + 1) if f * k < 9000)

# (nombre, midi root, acorde)
chords = [
    (45, [57, 60, 64, 67]),  # Am(add7)
    (41, [53, 57, 60, 64]),  # Fmaj7
    (36, [55, 60, 64, 67]),  # C
    (43, [55, 59, 62, 66]),  # G(add#11 suave)
    (45, [57, 60, 64, 69]),  # Am final
]
chord_len = 4 * beat * 2
pad, bass, pluck, perc = (np.zeros(N) for _ in range(4))

for ci, (root, notes) in enumerate(chords):
    start = ci * chord_len
    length = chord_len + 1.6 if ci < len(chords) - 1 else DUR - start
    n = int(length * SR)
    t = np.arange(n) / SR
    env = np.minimum(t / 1.4, 1) * np.minimum((length - t) / 1.6, 1).clip(0, 1)
    v = np.zeros(n)
    for m in notes:
        for det in (-0.12, 0, 0.12):
            v += saw(hz(m) * 2 ** (det / 12), n) * 0.12
    put(pad, start, lp(v, 1400 + 600 * (ci / 4)) * env)
    # sub
    nb = int(length * SR)
    sub = np.sin(2 * np.pi * hz(root) * np.arange(nb) / SR)
    put(bass, start, sub * env * 0.5)

# arpegio (a partir de 4 beats*2)
for ci, (root, notes) in enumerate(chords[:-1]):
    start = ci * chord_len
    if start < 5: continue
    seq = [notes[0] + 12, notes[2] + 12, notes[3] + 12, notes[2] + 12]
    for k in range(int(chord_len / (beat / 2))):
        m = seq[k % 4] + (12 if k % 8 == 7 else 0)
        n = int(1.4 * SR); t = np.arange(n) / SR
        s = (np.sin(2 * np.pi * hz(m) * t) + 0.35 * np.sin(4 * np.pi * hz(m) * t) * np.exp(-t * 6)) * np.exp(-t * 3.2)
        put(pluck, start + k * beat / 2, s * 0.16)

# percusión suave desde 10.7 s hasta 21.3 s
for b in range(int(10.67 / beat), int(21.33 / beat)):
    tb = b * beat
    n = int(0.35 * SR); t = np.arange(n) / SR
    kick = np.sin(2 * np.pi * (48 + 90 * np.exp(-t * 28)) * t) * np.exp(-t * 11)
    put(perc, tb, kick * 0.55)
    if b % 2 == 1:
        nh = int(0.08 * SR)
        h = hp(rng.standard_normal(nh), 7000) * np.exp(-np.arange(nh) / SR * 55)
        put(perc, tb + beat / 2, h * 0.05)

# reverb sobre pad+pluck
ir_n = int(2.2 * SR)
ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / SR * 2.4)
ir = lp(ir, 5000)
wet_src = pad + pluck
wet = fftconvolve(wet_src, ir)[:N] * 0.018
mix = pad * 0.9 + bass + pluck + perc + wet

# sidechain ligero con el bombo
duck = np.ones(N)
for b in range(int(10.67 / beat), int(21.33 / beat)):
    i = int(b * beat * SR); n = int(0.25 * SR)
    seg = np.arange(min(n, N - i)) / n
    duck[i : i + len(seg)] *= 0.65 + 0.35 * seg
mix = (pad * 0.9 * duck + bass + pluck + perc + wet)

fade_in = np.minimum(t_all / 0.6, 1)
fade_out = np.minimum((DUR - t_all) / 2.4, 1)
mix *= fade_in * fade_out
mix = lp(mix, 12000, 1)
mix = np.tanh(mix * 1.1)
mix = mix / np.max(np.abs(mix)) * 0.85
pcm = (mix * 32767).astype("<i2")
p = subprocess.run(
    ["ffmpeg", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", "-af", "pan=stereo|c0=c0|c1=c0,loudnorm=I=-16:TP=-1.5", "-b:a", "192k", "public/music.mp3"],
    input=pcm.tobytes(), capture_output=True,
)
print(p.returncode, p.stderr[-200:].decode())

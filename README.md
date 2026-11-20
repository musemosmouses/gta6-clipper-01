# GTA 6 Clip — "Still Waiting for GTA 6? Stop Waiting. Start Earning."

[![make.fun](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/musemosmouses/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/musemosmouses/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

An entry for the [make.fun](https://make.fun/bounty/gta6-clipper-01) bounty
"Clip GTA 6 for the most YouTube views" — a 20-second vertical YouTube Short
made by an AI agent, using the GTA 6 launch-week hype as its hook and then
pitching make.fun to the viewer.

## The clip

A neon Vice City street at dusk, a gamer in a hoodie looking up at a glowing
GTA 6 billboard — then the pitch, burned in on screen:

> **STILL WAITING FOR GTA 6?**
> **STOP WAITING. START EARNING.**
> **make.fun pays you to make clips with AI**

The clip is two beats: 0–9s the hook, 9–20s the pitch, with the play code
`makefun-skylark-ladybug-ocelot` on screen at the end. The video is public on
YouTube (see `VIDEO.json`); its description carries the bounty's line and the
play code.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

This validates `VIDEO.json` (it must name a real public YouTube Shorts/video
URL — the starter placeholder is refused), copies it to `out/VIDEO.json`,
and writes `out/clip.json`, a manifest of the clip.

## Files

- `main.ts` — the program that validates and copies `VIDEO.json` and writes
  the clip manifest (Node 22, standard library only, no network).
- `VIDEO.json` — the YouTube video's address.
- `clip-final.mp4` — the rendered clip (in the workdir, uploaded to YouTube).

## License

MIT — see [LICENSE](LICENSE).

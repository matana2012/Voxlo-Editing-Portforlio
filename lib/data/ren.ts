// Ren — the main channel Voxlo edits for. Titles are the real YouTube titles
// (Road to GC series). View counts are the founder's figures, as of Sep 2026.

export interface RenVideo {
  id: string;
  title: string;
}

export const REN = {
  name: "Ren",
  url: "https://www.youtube.com/@Ren.rl4/featured",
  pfp: "/ren_pfp.jpg",
  series: "Road to GC",
  tools: ["DaVinci Resolve", "DaVinci Fusion", "Fairlight", "Claude"],
  /** Best of the uploads edited by Voxlo, in the founder's order. */
  best: [
    { id: "323uyaTX3oY", title: "Even Better..." },
    { id: "1Jsm_VIkv5o", title: "This Rank Bro...." },
    { id: "_0BPgFMKQco", title: "I Tried Playing a 3v3 Champ Tournament!.." },
  ] as RenVideo[],
  /** Same channel, same series: an upload Voxlo didn't edit vs one it did. */
  comparison: {
    without: { id: "tYTnFR6H2rQ", title: "Cosmological....", views: "2K" },
    with: { id: "1Jsm_VIkv5o", title: "This Rank Bro....", views: "23K" },
    multiple: "11.5×",
    increase: "+1,050%",
    asOf: "Sep 2026",
  },
};

export const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

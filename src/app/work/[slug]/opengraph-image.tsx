import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/data/registry";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project status card";

const STATUS_COLOR: Record<string, string> = {
  LIVE: "#41C98A",
  BUILDING: "#D9A544",
  DELIVERED: "#8B95A4",
  CURRICULUM: "#9A8FE8",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "System";
  const status = project?.status ?? "ARCHIVED";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#0C0E11",
          color: "#EEF0F3",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              marginRight: 16,
              backgroundColor: STATUS_COLOR[status] ?? "#8B95A4",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#A7AFBA",
              display: "flex",
            }}
          >
            {status}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, display: "flex" }}>
            {title}
          </div>
          <div style={{ marginTop: 20, fontSize: 28, color: "#667081", display: "flex" }}>
            OPERATIONS BRIEFING / KARIM TAMER · FLUTTER DEVELOPER
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#667081",
          }}
        >
          <div style={{ display: "flex" }}>KARIMTAMER.DEV</div>
          <div style={{ display: "flex" }}>WORK/{slug.toUpperCase()}</div>
        </div>
      </div>
    ),
    size,
  );
}

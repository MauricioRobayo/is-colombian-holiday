import { longDateFormatter } from "@/utils/date-helpers";
import { ImageResponse } from "@vercel/og";
import { isHoliday } from "colombian-holidays/lib/utils/isHoliday";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestedDate = searchParams.get("date");

    if (requestedDate) {
      const date = new Date(requestedDate);
      const formattedDate = longDateFormatter.format(date);

      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              padding: "32px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                gap: "48px",
                border: "16px solid orange",
                borderRadius: "32px",
              }}
            >
              <div tw="text-6xl">{formattedDate}</div>
              <div tw="text-8xl font-bold" style={{ fontWeight: "bold" }}>
                {isHoliday(date) ? "🎆 Is Holiday! 🎆" : "Not Holiday"}
              </div>
              <div tw="text-8xl">{isHoliday(date) ? "😀" : "😢"}</div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

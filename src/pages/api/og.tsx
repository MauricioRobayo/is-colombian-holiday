import { longDateFormatter } from "@/utils/date-helpers";
import { ImageResponse } from "@vercel/og";
import { getHoliday } from "colombian-holidays/lib/utils/getHoliday";
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
      const holiday = getHoliday(date);
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
                gap: "32px",
                border: "16px solid orange",
                borderRadius: "32px",
              }}
            >
              <div tw="text-7xl font-bold" style={{ fontWeight: "bold" }}>
                {holiday ? "🎆 It is holiday! 🎆" : "It is not holiday."}
              </div>
              <div tw="text-7xl">{isHoliday(date) ? "😀" : "😢"}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "24px",
                }}
                tw="text-5xl"
              >
                <div>{formattedDate}</div>
                {holiday ? <div>{holiday.name.en}</div> : null}
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        },
      );
    }
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

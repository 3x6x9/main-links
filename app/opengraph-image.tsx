import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#000000",
                    color: "#ffffff"
                }}
            >
                <div
                    style={{
                        fontSize: 100,
                        fontWeight: 800
                    }}
                >
                    mainLinks
                </div>
                <div
                    style={{
                        marginTop: 25,
                        fontSize: 42
                    }}
                >
                    Your digital presence, simplified
                </div>
            </div>
        ),
        {
            ...size
        }
    );
}

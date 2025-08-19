"use client"

export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fef7e6" }}>
      {/* Header Skeleton */}
      <div style={{ backgroundColor: "#f59e0b", padding: "24px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", textAlign: "center" }}>
          <div
            style={{
              height: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              marginBottom: "12px",
              animation: "pulse 2s infinite",
            }}
          />
          <div
            style={{
              height: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "4px",
              maxWidth: "400px",
              margin: "0 auto",
              animation: "pulse 2s infinite",
            }}
          />
        </div>
      </div>

      {/* Content Skeleton */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        {/* Search Bar Skeleton */}
        <div
          style={{
            height: "48px",
            backgroundColor: "white",
            borderRadius: "8px",
            marginBottom: "24px",
            animation: "pulse 2s infinite",
          }}
        />

        {/* College Cards Skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "6px",
                    animation: "pulse 2s infinite",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      height: "20px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <div
                    style={{
                      height: "16px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "4px",
                      width: "70%",
                      animation: "pulse 2s infinite",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  height: "16px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "4px",
                  animation: "pulse 2s infinite",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

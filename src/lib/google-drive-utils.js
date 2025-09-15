export function convertGoogleDriveUrl(shareUrl) {
  if (!shareUrl || typeof shareUrl !== "string") {
    return null
  }

  console.log("[v0] Converting Google Drive URL:", shareUrl)

  // Extract file ID from Google Drive share URL
  const fileIdMatch = shareUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)

  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1]
    // Convert to direct access URL - using the more reliable format
    const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
    console.log("[v0] Converted to direct URL:", directUrl)
    return directUrl
  }

  // If already in direct format, return as is
  if (shareUrl.includes("drive.google.com/uc?export=view&id=")) {
    console.log("[v0] URL already in direct format")
    return shareUrl
  }

  const alternativeMatch = shareUrl.match(/id=([a-zA-Z0-9_-]+)/)
  if (alternativeMatch && alternativeMatch[1]) {
    const fileId = alternativeMatch[1]
    const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
    console.log("[v0] Converted alternative format to:", directUrl)
    return directUrl
  }

  console.log("[v0] Could not convert URL, returning original")
  return shareUrl
}

export function isValidGoogleDriveUrl(url) {
  if (!url || typeof url !== "string") {
    return false
  }

  return url.includes("drive.google.com") && (url.includes("/file/d/") || url.includes("uc?export=view&id="))
}

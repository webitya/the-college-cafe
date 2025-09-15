import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    // Check credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD

    if (username === adminUsername && password === adminPassword) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")

      return NextResponse.json({
        success: true,
        token,
        message: "Login successful",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Login failed",
      },
      { status: 500 },
    )
  }
}

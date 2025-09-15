import { connectToDatabase } from "../../../lib/mongodb"

export async function GET(request) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)

    // Get query parameters for filtering
    const search = searchParams.get("search") || ""
    const location = searchParams.get("location") || ""
    const minSalary = searchParams.get("minSalary") || ""
    const maxSalary = searchParams.get("maxSalary") || ""
    const experience = searchParams.get("experience") || ""
    const jobType = searchParams.get("jobType") || ""
    const sortBy = searchParams.get("sortBy") || "postedDate"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Build filter query
    const filter = {}

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skills: { $in: [new RegExp(search, "i")] } },
      ]
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }
    }

    if (experience) {
      filter.experience = { $regex: experience, $options: "i" }
    }

    if (jobType) {
      filter.jobType = jobType
    }

    // Salary filtering (assuming salary format like "₹8-12 LPA")
    if (minSalary || maxSalary) {
      // This is a simplified salary filter - you might want to store salary as numbers
      const salaryRegex = new RegExp(`₹(${minSalary || "\\d+"})-(${maxSalary || "\\d+"}) LPA`, "i")
      filter.salary = { $regex: salaryRegex }
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    const jobs = await db.collection("jobs").find(filter).sort(sort).toArray()

    return Response.json({ jobs })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return Response.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

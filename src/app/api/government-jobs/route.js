import { connectToDatabase } from "../../../lib/mongodb"

export async function GET(request) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)

    // Get query parameters for filtering
    const search = searchParams.get("search") || ""
    const department = searchParams.get("department") || ""
    const minVacancies = searchParams.get("minVacancies") || ""
    const maxVacancies = searchParams.get("maxVacancies") || ""
    const minFee = searchParams.get("minFee") || ""
    const maxFee = searchParams.get("maxFee") || ""
    const sortBy = searchParams.get("sortBy") || "endDate"
    const sortOrder = searchParams.get("sortOrder") || "asc"

    // Build filter query
    const filter = {}

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { eligibility: { $regex: search, $options: "i" } },
      ]
    }

    if (department) {
      filter.department = { $regex: department, $options: "i" }
    }

    if (minVacancies) {
      filter.vacancies = { $gte: Number.parseInt(minVacancies) }
    }

    if (maxVacancies) {
      filter.vacancies = { ...filter.vacancies, $lte: Number.parseInt(maxVacancies) }
    }

    // Application fee filtering (assuming format like "₹500")
    if (minFee || maxFee) {
      const feeFilter = {}
      if (minFee) feeFilter.$gte = `₹${minFee}`
      if (maxFee) feeFilter.$lte = `₹${maxFee}`
      filter.applicationFee = feeFilter
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    const governmentJobs = await db.collection("government_jobs").find(filter).sort(sort).toArray()

    return Response.json({ governmentJobs })
  } catch (error) {
    console.error("Error fetching government jobs:", error)
    return Response.json({ error: "Failed to fetch government jobs" }, { status: 500 })
  }
}

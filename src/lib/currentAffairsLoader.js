const AVAILABLE_DATES = {
  "15-january-2025": { month: "january-2025", file: "15-january-2025" },
  "14-february-2025": { month: "february-2025", file: "14-february-2025" },
  "21-march-2025": { month: "march-2025", file: "21-march-2025" },
  "22-april-2025": { month: "april-2025", file: "22-april-2025" },
  "18-may-2025": { month: "may-2025", file: "18-may-2025" },
  "21-june-2025": { month: "june-2025", file: "21-june-2025" },
  "25-july-2025": { month: "july-2025", file: "25-july-2025" },
  "01-august-2025": { month: "august-2025", file: "01-august-2025" },
  "02-august-2025": { month: "august-2025", file: "02-august-2025" },
  "03-august-2025": { month: "august-2025", file: "03-august-2025" },
  "04-august-2025": { month: "august-2025", file: "04-august-2025" },
  "05-august-2025": { month: "august-2025", file: "05-august-2025" },
  "06-august-2025": { month: "august-2025", file: "06-august-2025" },
  "07-august-2025": { month: "august-2025", file: "07-august-2025" },
  "08-august-2025": { month: "august-2025", file: "08-august-2025" },
  "09-august-2025": { month: "august-2025", file: "09-august-2025" },
  "10-august-2025": { month: "august-2025", file: "10-august-2025" },
  "11-august-2025": { month: "august-2025", file: "11-august-2025" },
  "12-august-2025": { month: "august-2025", file: "12-august-2025" },
  "13-august-2025": { month: "august-2025", file: "13-august-2025" },
  "14-august-2025": { month: "august-2025", file: "14-august-2025" },
  "15-august-2025": { month: "august-2025", file: "15-august-2025" },
  "16-august-2025": { month: "august-2025", file: "16-august-2025" },
}

export const getAvailableDates = () => {
  const datesByMonth = {}

  Object.keys(AVAILABLE_DATES).forEach((date) => {
    const dateInfo = AVAILABLE_DATES[date]
    const monthKey = dateInfo.month

    if (!datesByMonth[monthKey]) {
      datesByMonth[monthKey] = []
    }

    const [day] = date.split("-")
    datesByMonth[monthKey].push(Number.parseInt(day))
  })

  return datesByMonth
}

export const loadCurrentAffairsData = async (date) => {
  const dateInfo = AVAILABLE_DATES[date]

  if (!dateInfo) {
    console.error(`No data available for date: ${date}`)
    return { events: [] }
  }

  try {
    const importedModule = await import(`../data/current-affairs/${dateInfo.month}/${dateInfo.file}.js`)
    if (importedModule.currentAffairs) {
      if (Array.isArray(importedModule.currentAffairs)) {
        return { events: importedModule.currentAffairs }
      } else if (importedModule.currentAffairs.events) {
        return importedModule.currentAffairs
      }
    }
    return { events: [] }
  } catch (error) {
    console.error(`Failed to load data for ${date}:`, error)
    return { events: [] }
  }
}

export const getDatesByMonth = () => {
  const datesByMonth = {}

  Object.entries(AVAILABLE_DATES).forEach(([date, info]) => {
    const [year, month] = date.split("-")
    const monthKey = `${year}-${month}`

    if (!datesByMonth[monthKey]) {
      datesByMonth[monthKey] = []
    }

    datesByMonth[monthKey].push(date)
  })

  return datesByMonth
}

export const hasDataForDate = (date) => {
  return AVAILABLE_DATES.hasOwnProperty(date)
}

export const getMonthName = (monthKey) => {
  const [month, year] = monthKey.split("-")
  const monthNames = {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  }
  return monthNames[month] || month
}

export const getAllAvailableDatesFlat = () => {
  return Object.keys(AVAILABLE_DATES)
}

export const getTodaysDate = () => {
  return "16-august-2025"
}

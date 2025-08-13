import HomeIcon from "@mui/icons-material/Home"
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary"
import ScienceIcon from "@mui/icons-material/Science"
import SportsIcon from "@mui/icons-material/Sports"
import WifiIcon from "@mui/icons-material/Wifi"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"

export default function CollegeCampus({ college }) {
  const facilityIcons = {
    "Wi-Fi Campus": <WifiIcon className="text-blue-500" />,
    "Medical Center": <LocalHospitalIcon className="text-red-500" />,
    Cafeteria: <HomeIcon className="text-orange-500" />,
    Gym: <SportsIcon className="text-green-500" />,
    Auditorium: <LocalLibraryIcon className="text-purple-500" />,
    "Computer Centers": <ScienceIcon className="text-indigo-500" />,
  }

  return (
    <section className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Campus & Facilities</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Campus Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-900">Campus Area</span>
              <span className="text-gray-700">{college.campus?.area}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-900">Hostels</span>
              <span className="text-gray-700">{college.campus?.hostels}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-900">Library</span>
              <span className="text-gray-700">{college.campus?.library}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-900">Laboratories</span>
              <span className="text-gray-700">{college.campus?.labs}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="font-medium text-gray-900">Sports</span>
              <span className="text-gray-700">{college.campus?.sports}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Campus Facilities</h3>
          <div className="grid grid-cols-2 gap-4">
            {college.campus?.facilities?.map((facility, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="mr-3">{facilityIcons[facility] || <HomeIcon className="text-gray-500" />}</div>
                <span className="text-gray-700 font-medium">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

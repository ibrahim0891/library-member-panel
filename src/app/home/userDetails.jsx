import { useContext } from "react";
import Context from "../../context";

function UserDetails(){  
    const user = useContext(Context)
    return ( 
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
                    <img 
                        src={user.avater || '/default-avatar.png'} 
                        alt="Profile" 
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                    />
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{user.name}</h1>
                        <p className="text-gray-600 mb-2">{user.email}</p>
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">{user.role}</span>
                    </div>
                </div>

                {/* User Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Department</h3>
                            <p className="text-gray-800">{user.department}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Roll Number</h3>
                            <p className="text-gray-800">{user.roll}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Semester</h3>
                            <p className="text-gray-800">{user.semester}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Shift</h3>
                            <p className="text-gray-800">{user.shift}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Contact Information</h3>
                            <p className="text-gray-800 mb-1">{user.phoneNumber}</p>
                            <p className="text-gray-800">{user.address}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Member Since</h3>
                            <p className="text-gray-800">{new Date(user.membershipDate).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Account Status</h3>
                            <p className={`${user.isActive ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                {user.isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Fines Due</h3>
                            <p className="text-red-600 font-medium">${user.finesDue}</p>
                        </div>
                    </div>
                </div>

                {/* Library Activity Section */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-6">Library Activity</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Borrowed Books</h3>
                            <p className="text-gray-800">{user.borrowedBooks?.length || 0} books</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-gray-600 font-medium mb-2">Reserved Books</h3>
                            <p className="text-gray-800">{user.reservedBooks?.length || 0} books</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}
export default UserDetails
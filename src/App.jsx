import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Home from './pages/Home'
import Missing from './pages/Missing'
import Login from './pages/features/Auth/Login/Login'
import Register from './pages/features/Auth/Register/Register'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'
import Layout from './components/Layout'
import Unauthorized from './pages/Unauthorized'

import AdminDashboard from './pages/features/Dashboard/Admin/AdminDashboard'
import AdminHomeDashboard from './pages/features/Dashboard/Admin/AdminHomeDashboard'

import InstructorDashboard from './pages/features/Dashboard/Instructors/InstructorDashboard'
import InstructorHomeDashboard from './pages/features/Dashboard/Instructors/InstructorHomeDashboard'

import UserDashboard from './pages/features/Dashboard/Users/UserDashboard'
import UserHomeDashboard from './pages/features/Dashboard/Users/UserHomeDashboard'
import AddClass from './pages/features/Dashboard/Instructors/AddClass/AddClass'
import ApplyInstructor from './pages/features/Dashboard/Users/ApplyInstructor/ApplyInstructor'

import MyClass from './pages/features/Dashboard/Instructors/MyClass'
import PendingClass from './pages/features/Dashboard/Instructors/PendingClass'
import ApprovedClass from './pages/features/Dashboard/Instructors/ApprovedClass'

import HomeAllClasses from './components/HomeAllClasses/HomeAllClasses'
import HomeClassDetails from './components/HomeAllClasses/HomeClassDetails'
import HomeClasses from './components/HomeAllClasses/HomeClasses'
import HomeInstructors from './components/HomeAllInstructors/HomeInstructors'
import HomeAllInstructors from './components/HomeAllInstructors/HomeAllInstructors'

import Selected from './pages/features/Dashboard/SimilarPages/Selected/Selected'
import Enrolled from './pages/features/Dashboard/SimilarPages/Enrolled/Enrolled'

import ManageUser from './pages/features/Dashboard/Admin/ManageUser/ManageUser'
import PendingInstructors from './pages/features/Dashboard/Admin/PendingInstructors/PendingInstructors'
import PendingClasses from './pages/features/Dashboard/Admin/PendingClasses/PendingClasses'
import EditUser from './pages/features/Dashboard/Admin/EditUser/EditUser'

import CourseDetails from './pages/features/Dashboard/Admin/CourseDetails'
import ViewProfile from './pages/features/Dashboard/Admin/ManageUser/ViewProfile'

import ManageClasses from './pages/features/Dashboard/Admin/ManageClasses/ManageClasses'
import EditClass from './pages/features/Dashboard/Admin/EditClass/EditClass'
import EditProfile from './pages/features/Dashboard/SimilarPages/EditProfile'
import OtherUploadedCoursesByUser from './components/OtherUploadedCoursesByUser/OtherUploadedCoursesByUser'

import useAxiosPrivate from './hooks/useAxiosPrivate'
import useAuth from './hooks/useAuth'

import debounce from './utils/debounce'
import UpdateClass from './pages/features/Dashboard/Instructors/UpdateClass/UpdateClass'
import EditInstructorProfile from './pages/features/Dashboard/Instructors/EditInstructorProfile/EditInstructorProfile'
import CustomPhoto from './components/CustomPhoto'
import ManageCustomPhoto from './pages/features/Dashboard/Admin/CustomPhoto/ManageCustomPhoto'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import AddBankInfo from './pages/features/Dashboard/Instructors/AddBankInfo'

import Earnings from './pages/features/Dashboard/Instructors/Earnings'
import { Toaster } from 'react-hot-toast'

import DashboardRedirect from './components/DashboardRedirect'
import ChatPage from './chat/home/ChatPage'
import VideoCall from './chat/home/VideoCall'

const ROLES = {
	User: parseInt(import.meta.env.VITE_USER_CODE),
	Instructor: parseInt(import.meta.env.VITE_INSTRUCTOR_CODE),
	Admin: parseInt(import.meta.env.VITE_ADMIN_CODE)
}

function App() {

	const axiosPrivate = useAxiosPrivate();
	const { auth } = useAuth();

	const navigate = useNavigate()
	const location = useLocation().pathname.split('/')

	// if the path in the first idx is 2 and there is only two in the url ('' && 'dashboard')
	const path = location.length === 2 && location[1] === 'dashboard'

	useEffect(() => {
		const updateLastActive = async () => {
			try {
				await axiosPrivate.post('/last-active', {
					id: auth?._id
				}, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					withCredentials: true
				});
			} catch (error) {
				console.log(error)
			}
		}

		const updateLastActiveDebounced = debounce(updateLastActive, 200000);

		const events = ['load', 'mousemove', 'keydown', 'click', 'keypress', 'scroll', 'focus', 'blur', 'mouseover', 'mouseenter']

		events.forEach(event => {
			window.addEventListener(event, updateLastActiveDebounced)
		});

		return () => {
			events.forEach(event => {
				window.removeEventListener(event, updateLastActiveDebounced)
			});
		}

	}, [auth?._id, axiosPrivate])

	useEffect(() => {
		if (path) {
			auth?.roles?.includes(parseInt(import.meta.env.VITE_ADMIN_CODE))
				? navigate('/dashboard/admin-cp')
				: auth?.roles?.includes(parseInt(import.meta.env.VITE_INSTRUCTOR_CODE))
					? navigate('/dashboard/instructor-cp')
					: auth?.roles?.includes(parseInt(import.meta.env.VITE_USER_CODE))
						? navigate('/dashboard/student-cp')
						: '/auth'
		}
	}, [navigate, location, path, auth?.roles])

	return (
		<div className='app'>
			<Routes>
				{/* Public routes */}

				<Route path='/auth' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/unauthorized' element={<Unauthorized />} />

				<Route element={<PersistLogin />}>
					<Route path='/' element={<Layout />}>

						{/* Redirect dashboard */}
						<Route path='/dashboard' element={<DashboardRedirect />} />

						{/* Public routes */}

						<Route index element={<Home />} />

						<Route path='/class' element={<HomeClasses />}>
							<Route index element={<HomeAllClasses />} />
							<Route path=':id' element={<HomeClassDetails />} />
						</Route>

						<Route path='/instructor' element={<HomeInstructors />}>
							<Route index element={<HomeAllInstructors />} />
						</Route>

						<Route path='/instructor/:userId/all-courses' element={<OtherUploadedCoursesByUser />} />

						<Route path='/custom-photo' element={<CustomPhoto />} />

						{/* Private routes */}

						{/* Admin routes */}

						<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
							<Route path='dashboard/admin-cp' element={<AdminDashboard />}>
								<Route index element={<AdminHomeDashboard />} />
								<Route path='manage-users' element={<ManageUser />} />
								<Route path='users/edit/:id' element={<EditUser />} />
								<Route path='user/profile/:id' element={<ViewProfile />} />
								<Route path='pending-instructors' element={<PendingInstructors />} />
								<Route path='pending-classes' element={<PendingClasses />} />
								<Route path='manage-course' element={<ManageClasses />} />
								<Route path='class/details/:id' element={<CourseDetails />} />
								<Route path='class/edit/:id' element={<EditClass />} />
								<Route path='details/edit-profile' element={<EditProfile />} />
								<Route path='custom-photo/manage' element={<ManageCustomPhoto />} />
								<Route path='custom-photo/view' element={<CustomPhoto />} />
							</Route>
						</Route>

						{/* Instructor routes */}

						<Route element={<RequireAuth allowedRoles={[ROLES.Instructor]} />}>
							<Route path='dashboard/instructor-cp' element={<InstructorDashboard />}>
								<Route index element={<InstructorHomeDashboard />} />
								<Route path='add-class' element={<AddClass />} />
								<Route path='my-classes' element={<MyClass />} />
								<Route path='pending-classes' element={<PendingClass />} />
								<Route path='approved-classes' element={<ApprovedClass />} />
								<Route path='selected' element={<Selected />} />
								<Route path='class/edit/:id' element={<UpdateClass />} />
								<Route path='details/edit-profile' element={<EditProfile />} />
								<Route path='edit-instructor-profile' element={<EditInstructorProfile />} />
								<Route path='enrolled' element={<Enrolled />} />
								<Route path='earnings' element={<Earnings />} />
							</Route>
						</Route>

						{/* Students routes */}

						<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
							<Route path='dashboard/student-cp' element={<UserDashboard />}>
								<Route index element={<UserHomeDashboard />} />
								<Route path='apply-instructor' element={<ApplyInstructor />} />
								<Route path='selected' element={<Selected />} />
								<Route path='details/edit-profile' element={<EditProfile />} />
								<Route path='enrolled' element={<Enrolled />} />
							</Route>
						</Route>
					</Route>
					<Route element={<RequireAuth allowedRoles={[ROLES.Instructor]} />}>
						<Route path='/instructor/add-bank-info' element={<AddBankInfo />} />
					</Route>

					<Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Instructor, ROLES.Admin]} />}>
						<Route path='/chat' element={<ChatPage />} />
						<Route path='/chat/video-call' element={<VideoCall />} />
					</Route>

				</Route>

				{/* Similar routes */}

				<Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Instructor, ROLES.Admin]} />}>
					<Route path='/custom-photo' element={<CustomPhoto />} />
				</Route>


				<Route path='/success' element={<Success />} />
				<Route path='/cancel' element={<Cancel />} />
				{/* Missing  */}

				<Route path='*' element={<Missing />} />

			</Routes>
			<Toaster position="bottom-center"
				reverseOrder={false}
			/>
		</div >
	)
}

export default App;
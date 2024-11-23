import usePathAfterSlash from '../../../hooks/usePathAfterSlash'
import { UserAndInstructor, UserOnly } from '../../../utils/rolePermission';
import './illustrationAnimation1.css'

function IllustrationAnimation1() {

	const pathAfterSlash = usePathAfterSlash()

	const userAndInstructor = UserAndInstructor()
	const userOnly = UserOnly()

	return (

		<div className='cartoon'>
			<div className='shirt-neck shirt-neck-back b'></div>
			<div className='hair hair-back-bottom r b'></div>
			<div className='hair hair-back hair-back-back r b'></div>
			<div className='shirt b r'></div>
			<div className='shirt-line-2 b'></div>
			<div className='head r'></div>
			<div className='hair hair-back r b'></div>
			<div className='ear r ha hb'></div>
			<div className='nose r'></div>
			<div className='hair-container'><div className='hair hair-top r b ha'></div></div>
			<div className='eye r b'></div>
			<div className='mouth r ha'></div>
			<div className='shirt-line b'></div>

			<div className='shirt-neck b'></div>
			<div className='eyebrow r'></div>
			<div className='eyebrow r'></div>



			<div className='bubble b r hb'>
				<span>Hello...</span>
				<span className='text-sm'>
					Do you need&nbsp;
					{
						userAndInstructor && (
							<span>
								{
									pathAfterSlash === 'edit-profile'
										? 'an address'
										: pathAfterSlash === 'edit-instructor-profile'
											? 'an experience'
											: 'a title or description for a course⁇'}
							</span>
						)

					}
					{
						userOnly && (
							<span>
								{
									pathAfterSlash === 'edit-profile'
										? 'an address'
										: pathAfterSlash === 'apply-instructor'
											? 'an experience'
											: 'to enroll for a course??'}
							</span>
						)
					}

				</span>
			</div>
		</div>
	)
}

export default IllustrationAnimation1
/* eslint-disable react/prop-types */

import SubmitButton from "../../../../components/SubmitButton/SubmitButton";

function LoginForm({ isPending, user, setUser, password, setPassword, handleSubmit }) {
    const valid = password && user && !isPending

    return (
        <>
            <form className="grid place-items-center w-[90%] gap-x-4 gap-y-3">
                <div className='flex flex-col w-full'>
                    <label htmlFor="email" className='text-sm mb-2 font-500'>Username</label>
                    <input
                        type="text"
                        name='username'
                        id='username'
                        placeholder='Enter your username'
                        required
                        autoComplete='off'
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor="password" className='text-sm mb-2 font-500'>Password</label>
                    <input
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter password'
                        required
                        autoComplete='off'
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <SubmitButton divStyle="w-full mt-7" valid={valid} action={handleSubmit}>
                    Submit
                </SubmitButton>
            </form>
        </>
    )
}

export default LoginForm;
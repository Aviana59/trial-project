import LOGO from '../assets/images/logo.png'

const Navbar = () => {
    return (
        <div className="w-screen px-20 py-4 bg-slate-100">
            <div className="px-4 flex justify-between gap-4">
                <div className="flex gap-2">
                    <img src={LOGO} alt="" className='w-36'/>
                </div>
            </div>
        </div>
    )
}
export default Navbar;
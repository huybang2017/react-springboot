import { RiMessengerLine } from "react-icons/ri";
import { Link } from "react-router-dom";


const ButtonMessage = () => {
    return (
        <Link
            to='https://www.facebook.com/messages/t/101090475910822?locale=vi_VN'
        >
            <div className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <RiMessengerLine className="w-6 h-6" />

            </div>
        </Link>
    )
}
export default ButtonMessage

import './RegisterNext.css';
import { Link } from 'react-router-dom'; 

function RegisterNext(){
    return (
        <div className="register-next">
            <button className='next-button'>Next</button>
            <div className='sign-in'> 
                <span>Already have an Account?</span>
                <Link >
                    Sign in
                </Link>
            </div>

        </div>

    );
}
export default RegisterNext;
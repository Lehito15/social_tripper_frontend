import './RegisterNext.css';
import { Link } from 'react-router-dom'; 

function RegisterNext({step}){
    return (
        <div className="register-next">
            <div className='form-buttons'>
                  {step >0 && (
                    <button className='back-button' >Back</button>
                )}
                {
                    <button className='back-button'  style={{ display: 'none' }}  >Back</button>
                }
                <button className='next-button'>Next</button>
               
            </div>
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
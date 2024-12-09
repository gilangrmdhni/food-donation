import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';

const LoginPage = ({ register = '', Btn = '' }) => {
    const [inputEmail, setEmail] = useState('');
    const [inputPassword, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        const token = sessionStorage.getItem('token');
        const status = sessionStorage.getItem('status');

        if (role === 'detonator' && token && status === 'approved') {
            router.push('/detonator');
        } else if (role === 'merchant' && token && status === 'approved') {
            router.push('/merchant');
        }
    }, [router]);

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
        router.push('/detonator'); // Adjust as needed
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true); // Set loading to true when starting authentication

            const response = await axios.post(
                'https://api.foodia-dev.nuncorp.id/api/v1/auth/login',
                {
                    email: inputEmail,
                    password: inputPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE'
                    }
                }
            );

            const { fullname, phone, email, role, token, user } = response.data.body;

            if (user.status === 'approved') {
                // Store user information in session storage
                sessionStorage.setItem('fullname', fullname);
                sessionStorage.setItem('phone', phone);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('id', user.id);
                sessionStorage.setItem('status', user.status);
                sessionStorage.setItem('note', user.note);

                if (role === 'detonator') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        text: 'Redirecting to the dashboard...',
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    setTimeout(() => {
                        router.push('/detonator');
                    }, 2000);

                } else if (role === 'merchant') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        text: 'Redirecting to the dashboard...',
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    setTimeout(() => {
                        router.push('/merchant');
                    }, 2000);

                }


            } else if (user.status === 'rejected') {

                sessionStorage.setItem('fullname', fullname);
                sessionStorage.setItem('phone', phone);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('id', user.id);
                sessionStorage.setItem('status', user.status);
                sessionStorage.setItem('note', user.note);

                Swal.fire({
                    icon: 'warning',
                    title: 'Mohon diperiksa kembali',
                    text: ` mohon diperiksa kembali. ${user.note}`,
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(() => {
                    router.push('/profile');
                }, 2000);

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Akun Belum Di Setujui',
                    text: 'Akun Belum Di Setujui. Silahkan Hubungi Admin.',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }

        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Please check your email and password and try again.',
                showConfirmButton: false,
                timer: 2000,
            });
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };


    return (
        <div className="container mx-auto mt-24 bg-white h-96 text-primary">
            <div className="flex justify-center ">
                <h1 className='text-4xl  font-bold'>FOODIA</h1>
            </div>
            <div className="flex justify-center ">
                <h1 className='text-xl font-bold'>Silahkan Login</h1>
            </div>

            <form className='p-2 mt-20' >
                <div className="px-4">
                    <label htmlFor="email" className="block  text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 " placeholder="email" required />
                </div>
                <div className="px-4 pt-6">
                    <label htmlFor="password" className="block  text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 " placeholder="password" required />
                </div>
                <div className="flex items-start mb-4">
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ml-auto px-4">
                        Forgot password?
                    </label>
                </div>
                <div className="grid gap-6 content-center px-4">
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="text-white bg-primary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm w-full sm:w-auto px-20 py-4 text-center"
                    >
                        Log In
                    </button>
                </div>
                <div className=" grid gap-4 content-center mt-2 px-4">
                    <Link href={register} className="text-white bg-primary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-4 text-center ">{Btn}</Link>
                </div>
            </form>
            {loading && <div className='text-center'>Loading...</div>}

        </div>
    );
}

export default LoginPage;

// src/components/formCampaing/StepDetonator.jsx

import { useState, useEffect } from "react";
import InputForm from "../Imput";
import RoutStep from "../RoutStep";
import { IconCamera, IconUser } from "@tabler/icons-react";
import { useRouter } from 'next/router';
import axios from "axios";
import SweetAlert from "../SweetAlert";

function StepOne({ registrasiDetonator, setRegistrasiDetonator }) {
    // const { stepForm } = props;
    const router = useRouter();
    const [fullName, setFullName] = useState(registrasiDetonator?.fullName ?? '');
    const [phoneNumber, setPhoneNumber] = useState(registrasiDetonator?.phoneNumber ?? '');
    const [email, setEmail] = useState(registrasiDetonator?.email ?? '');
    const [password, setPassword] = useState(registrasiDetonator?.password ?? '');
    const [confirmPassword, setConfirmPassword] = useState(registrasiDetonator?.confirmPassword ?? '');

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const [error, setError] = useState('');


    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission

        // Validation checks
        if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
            window.alert('All fields are required');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            window.alert('Invalid email format');
            return;
        }

        if (!/^\d+$/.test(phoneNumber)) {
            window.alert('Phone number must contain only digits');
            return;
        }

        if (password.length < 8) {
            window.alert('Password must be at least 8 characters');
            return;
        }

        if (password !== confirmPassword) {
            window.alert('Passwords do not match');
            return;
        }

        // Create an object with the form data
        const formData = {
            fullName,
            phoneNumber,
            email,
            password,
            confirmPassword,
        };


        // Save the form data to the registrasiDetonator state
        setRegistrasiDetonator(formData);

        // clear data after submit
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');


        router.push('/registrasi/detonator?step=2');
    };
    useEffect(() => {
        console.log('Step1:', registrasiDetonator);
    }, [registrasiDetonator]);

    return (
        <>
            <ol className="flex justify-center mb-4 sm:mb-5 w-full p-2 ">
                <RoutStep
                    liCss={`flex w-20 items-center after:content-[''] after:w-full after:h-1 after:inline-block  after:border-b after:border-4 after:border-primary`}
                    divCss={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 shrink-0 bg-primary`}
                    iconCss={`w-4 h-4 text-white lg:w-6 lg:h-6 `}
                    iconName={"User"}
                />
                <RoutStep
                    liCss={`flex w-20 items-center after:content-[''] after:w-full after:h-1 after:inline-block   after:border-b after:border-4 after:border-gray-700`}
                    divCss={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 shrink-0 bg-gray-700`}
                    iconCss={`w-4 h-4 lg:w-6 lg:h-6 text-white`}
                    iconName={"Scan"}
                />
                <RoutStep
                    liCss={`flex items-center`}
                    divCss={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 shrink-0 bg-gray-700`}
                    iconCss={`w-4 h-4 lg:w-6 lg:h-6 text-white`}
                    iconName={"Password"}
                />
            </ol>
            <h1>Campain: 1</h1>
            <form className='p-2 mt-8 w-full' onSubmit={handleSubmit}>
                <div className="mb-2 px-4">
                    <label htmlFor='FullName' className="text-sm font-medium text-gray-900">Full Name</label>
                    <InputForm
                        cssInput={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4 `}
                        label="FullName" type="text" name="FullName" value={fullName} onChange={handleFullNameChange} placeholder="Full Name"
                    />
                </div>
                <div className="mb-2 px-4">
                    <label htmlFor='PhoneNumber' className="text-sm font-medium text-gray-900">Phone Number</label>
                    <InputForm
                        cssInput={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4 `}
                        label="PhoneNumber" type="text" name="PhoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number"
                    />
                </div>
                <div className="mb-2 px-4 ">
                    <label htmlFor='Email' className="text-sm font-medium text-gray-900">Email Address</label>
                    <InputForm
                        cssInput={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4 `}
                        label="Email" type="text" name="Email" value={email} onChange={handleEmailChange} placeholder="Email Address"
                    />
                </div>
                <div className="mb-2 px-4">
                    <label htmlFor='Password' className="text-sm font-medium text-gray-900">Password</label>
                    <InputForm
                        cssInput={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4 `}
                        label="Password" type="password" name="Password" value={password} onChange={handlePasswordChange} placeholder="Password"
                    />
                </div>
                <div className="mb-2 px-4">
                    <label htmlFor='ConfirmPassword' className="text-sm font-medium text-gray-900">Confirm Password</label>
                    <InputForm
                        cssInput={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-4 `}
                        label="ConfirmPassword" type="password" name="ConfirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password"
                    />
                </div>

                <div className="grid gap-4 content-center pt-4 px-4">
                    <button
                        type="submit"
                        className='text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-4 text-center'>
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

function StepTwo({ registrasiDetonator, setRegistrasiDetonator }) {
    const router = useRouter();
    const [fotoSelfi, setFotoSelfi] = useState(registrasiDetonator?.fotoSelfi ?? null);
    const [fotoKTP, setFotoKTP] = useState(registrasiDetonator?.fotoKTP ?? null);
    const [noKTP, setNoKTP] = useState(registrasiDetonator?.noKTP ?? '');

    // Debug
    useEffect(() => {
        if (registrasiDetonator && registrasiDetonator.fotoSelfi) {
            console.log('Step2 - Foto Selfi:', registrasiDetonator.fotoSelfi);
        }
        if (registrasiDetonator && registrasiDetonator.fotoKTP) {
            console.log('Step2 - Foto KTP:', registrasiDetonator.fotoKTP);
        }
    }, [registrasiDetonator]);

    useEffect(() => {
        if (!registrasiDetonator || Object.keys(registrasiDetonator).length === 0) {
            router.push('/registrasi/detonator?step=1');
        }
    }, [registrasiDetonator]);

    // Handle input file change Foto Selfi
    const handleFotoSelfiChange = (event) => {
        setFotoSelfi(event.target.files[0]);
    };

    // Handle input file change Foto KTP 
    const handleFotoKTPChange = (event) => {
        setFotoKTP(event.target.files[0]);
    };

    // Handle input number change Foto Selfi
    const handleNoKTPChange = (event) => {
        setNoKTP(event.target.value);
    };

    const handleStepTwoSubmit = async (event) => {
        event.preventDefault();

        // setRegistrasiDetonator((prevData) => ({
        //     ...prevData,
        //     fotoSelfi,
        //     fotoKTP,
        //     noKTP,
        // }));

        if (!fotoSelfi || !fotoKTP || !noKTP) {
            alert('Please fill in all fields.');
            return;
        }

        setRegistrasiDetonator((prevData) => ({
            ...prevData,
            fotoSelfi,
            fotoKTP,
            noKTP,
        }));
        // router.push('/registrasi/detonator?step=3');
        try {
            // Check if the required fields are filled
            if (!fotoSelfi || !fotoKTP || !noKTP) {
                alert('Please fill in all fields.');
                return;
            }

            // Function to check file size and allowed extensions
            const validateFile = (file, maxSizeMB, allowedExtensions) => {
                if (file.size > maxSizeMB * 1024 * 1024) {
                    alert(`File ${file.name} exceeds the maximum size of ${maxSizeMB} MB.`);
                    return false;
                }

                const fileExtension = file.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    alert(`File ${file.name} has an invalid extension. Allowed extensions are: ${allowedExtensions.join(', ')}`);
                    return false;
                }

                return true;
            };

            // Max file size in megabytes
            const maxFileSizeMB = 3;

            // Allowed file extensions
            const allowedExtensions = ['png', 'jpg', 'jpeg'];

            // Validate files
            if (!validateFile(fotoSelfi, maxFileSizeMB, allowedExtensions) || !validateFile(fotoKTP, maxFileSizeMB, allowedExtensions)) {
                return;
            }

            // Create a FormData object and append form fields
            const formData = new FormData();
            formData.append('fullName', registrasiDetonator.fullName);
            formData.append('phone', registrasiDetonator.phoneNumber);
            formData.append('email', registrasiDetonator.email);
            formData.append('password', registrasiDetonator.password);
            formData.append('ktp_number', noKTP);
            formData.append('self_photo', fotoSelfi);
            formData.append('ktp_photo', fotoKTP);

            const token = sessionStorage.getItem('token');
            // Log the FormData for debugging purposes
            // console.error('Data req:', formData);

            // Make the Axios POST request
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}detonator/registration`, formData, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJzZXNzaW9uIjoiIiwicm9sZSI6ImRldG9uYXRvciIsImV4cCI6MTcwMTg1NDQ1M30.9W_yDlyGbvavO2mX3mHRkzoRUOvRnmZA9CJoLBvP6g4`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Log the API response
            console.log('API Response:', response.data);


            // Redirect to the next step after successful registration
            router.push('/registrasi/detonator?step=3');

        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Handle 500 Internal Server Error
                const imageUrl = "/img/illustration/checklist.png";
                SweetAlert({
                    title: "",
                    text: "Akun sudah terdaftar",
                    imageUrl,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    width: 350,
                });
                router.push('/registrasi/detonator?step=3');
            } else {
                // Handle other errors
                console.error('Error submitting Step Two:', error);
                // Handle error appropriately, e.g., show a user-friendly message
            }
        }
    };

    return (
        <>
            <ol className="flex justify-center mb-4 sm:mb-5 w-full p-2">
                <RoutStep
                    liCss={`flex w-20 items-center after:content-[''] after:w-full after:h-1 after:inline-block  after:border-b after:border-4 after:border-primary`}
                    divCss={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 shrink-0 bg-primary`}
                    iconCss={`w-4 h-4 text-white lg:w-6 lg:h-6 `}
                    iconName={"User"}
                />
                <RoutStep
                    liCss={`flex w-20 items-center after:content-[''] after:w-full after:h-1 after:inline-block   after:border-b after:border-4 after:border-primary`}
                    divCss={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 shrink-0 bg-primary`}
                    iconCss={`w-4 h-4 lg:w-6 lg:h-6 text-white`}
                    iconName={"Scan"}
                />
                <RoutStep
                    liCss={`flex items-center`}
                    divCss={`flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 shrink-0 bg-gray-700`}
                    iconCss={`w-4 h-4 lg:w-6 lg:h-6 text-white`}
                    iconName={"Password"}
                />
            </ol>
            <form className='p-2 mt-6 w-full' onSubmit={handleStepTwoSubmit}>
                <div className="mb-2">
                    <label htmlFor="fotoSelfi" className="text-sm font-medium text-gray-900">Foto Selfi</label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="fotoSelfi"
                            className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                        >
                            {fotoSelfi ? (
                                <img
                                    src={URL.createObjectURL(fotoSelfi)}
                                    alt="Foto Selfi"
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 bg-gray-50 rounded-lg w-28">
                                    <IconUser className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                    <div className="flex flex-col items-center justify-center bg-primary rounded-lg w-20">
                                        <IconCamera className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                    </div>
                                </div>
                            )}
                            <input
                                id="fotoSelfi"
                                type="file"
                                className="hidden"
                                onChange={handleFotoSelfiChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="mb-2">
                    <label htmlFor="fotoKTP" className="text-sm font-medium text-gray-900">Foto KTP</label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="fotoKTP"
                            className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                        >
                            {fotoKTP ? (
                                <img
                                    src={URL.createObjectURL(fotoKTP)}
                                    alt="Foto KTP"
                                    className="w-full h-full rounded-lg object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 bg-gray-50 rounded-lg w-28">
                                    <IconUser className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                                    <div className="flex flex-col items-center justify-center bg-primary rounded-lg w-20">
                                        <IconCamera className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                                    </div>
                                </div>
                            )}
                            <input
                                id="fotoKTP"
                                type="file"
                                className="hidden"
                                onChange={handleFotoKTPChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="mb-2">
                    <label htmlFor='noKTP' className="text-sm font-medium text-gray-900">No KTP</label>
                    <InputForm
                        cssInput={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        label="noKTP" type="number" name="noKTP" value={noKTP} onChange={handleNoKTPChange} placeholder="No KTP"
                    />
                </div>

                <div className="grid gap-4 content-center">
                    <button
                        type="submit"
                        className='text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}
function StepThree({ registrasiDetonator, setRegistrasiDetonator }) {
    // useEffect(() => {
    //     if (!registrasiDetonator || Object.keys(registrasiDetonator).length === 0) {
    //         router.push('/registrasi/detonator?step=1');
    //     }
    // }, [registrasiDetonator]);

    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const router = useRouter();

    const handleChange = (index, value) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);


        if (value.length === 0 && index > 0) {
            document.getElementById(`code-${index}`).focus();
        } else if (index < 5) {
            document.getElementById(`code-${index + 2}`).focus();
        }

        const otp = {
            email: registrasiDetonator.email,
            code: newCodes.join(''),
        };

        if (newCodes.join('').length === 6) {
            // Perform any action you want when the OTP is complete
            console.log('OTP is complete! Handling submit...');

            // Example: Handle submit here
            handleSubmit(otp);
        }
    };

    const handleSubmit = async (otp) => {
        console.log('OTP:', otp);
        try {
            const response = await axios.post(
                'https://api.foodia-dev.nuncorp.id/api/v1/auth/verify-otp',
                otp,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
                    },
                }
            );
            console.log('API Response:', response.data);
            const imageUrl = "/img/illustration/checklist.png";
            SweetAlert({
                title: "",
                text: "Akun Berhasil Di Buat",
                imageUrl,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                width: 350,
            });
            router.push('/home');
        } catch (error) {
            console.error('Error handling submit:', error);
            const imageUrl = "/img/illustration/checklist.png";
            SweetAlert({
                title: "",
                text: "Kode OTP Tidak Sesuai",
                imageUrl,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                width: 350,
            });
        }

    };

    return (
        <>
            <ol className="flex justify-center mb-4 sm:mb-5 w-full p-2">
                {/* ... (your RoutStep components) */}
            </ol>

            <form className="justify-center p-2 mt-5 w-full h-full">
                <div className="flex justify-center mb-2">
                    {codes.map((code, index) => (
                        <div key={index} className="mr-2">
                            <label htmlFor={`code-${index + 1}`} className="sr-only">{`Code ${index + 1}`}</label>
                            <input
                                type="number"
                                maxLength="1"
                                onChange={(e) => handleChange(index, e.target.value)}
                                value={code}
                                id={`code-${index + 1}`}
                                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required
                            />
                        </div>
                    ))}
                </div>
                <div className="justify-center mb-60">
                    <p className="text-sm text-center text-black">Tidak menerima OTP?</p>
                    <p className="text-sm text-center text-cyan-600">Kirim Ulang Kode OTP</p>
                </div>

                <div className=" grid place-items-center mt-60">
                    {/* Hidden submit button */}
                    <button
                        type="submit"
                        id="submit-button"
                        style={{ display: 'none' }}
                    ></button>

                    {/* Visible button that triggers the auto-submit */}
                    <button
                        onClick={handleSubmit}
                        className='text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}

export { StepOne, StepTwo, StepThree };
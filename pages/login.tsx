import React, { useState } from "react";
import { FaKey, FaEnvelope } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import { imgLogo, imgBackgrounds } from "../public/Images/Image";

export default function Login() {
    const [isUsername, setUsername] = useState();
    const [isPassword, setPassword] = useState();

    const [isEye, setEye] = useState(false);

    const Login = () => {};

    return (
        <div className=" min-h-screen flex justify-center items-center bg-ThemeRed">
            <div className=" w-11/12 max-w-[1200px] 1366px:max-w-[1000px] 480px:w-[95%] bg-white relative h-[80vh] 640px:h-auto">
                <aside className=" absolute z-0 h-full w-full top-0 left-0">
                    <Image src={imgBackgrounds.bgLogin} layout="fill" />
                </aside>
                <ul className=" w-full h-full flex flex-wrap z-10 relative">
                    <li className=" flex flex-col justify-center p-16 1366px:p-10 items-center w-4/12 820px:w-5/12 640px:w-full py-10 640px:p-5 bg-[#000000b7]">
                        <Image
                            src={imgLogo.pngDeus}
                            placeholder="blur"
                            priority
                        />
                        <p className="text-center text-white -mt-3 mb-10 text-[14px] 640px:mb-2">
                            lorem ipsum
                        </p>
                        <p className="text-center text-white text-[14px] leading-tight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Et nec bibendum congue aliquet augue diam
                            mauris lobortis. Morbi mattis tincidunt ut dignissim
                            lacinia..
                        </p>
                    </li>
                    <li className=" w-8/12 820px:w-7/12 bg-[#e5e4e455] flex flex-col 640px:w-full">
                        <section className=" p-16 820px:p-10 640px:p-5 flex flex-col items-start justify-center flex-1">
                            <p className=" text-ThemeRed text-[30px] mb-1 font-NHU-medium 640px:mb-0 640px:text-[24px]">
                                Log In
                            </p>
                            <h2 className=" text-[20px] mb-12 font-bold font-NHU-bold 640px:mb-5 640px:text-[16px]">
                                Enter your login details
                            </h2>

                            <h5 className=" text-[15px] mb-1 font-medium text-LiteBlac 640px:text-[12px]">
                                EMAIL ADDRESS
                            </h5>
                            <div className=" flex items-center border-2 border-gray-300 px-2 py-1 bg-white w-full max-w-[400px] mb-5 640px:mb-4">
                                <FaEnvelope className=" mr-2 text-ThemeRed" />
                                <input
                                    type="email"
                                    className="flex-1 outline-none text-16px "
                                    placeholder="Enter Email Address"
                                />
                            </div>
                            <h5 className=" text-[15px] mb-1 font-medium text-LiteBlack 640px:text-[12px]">
                                PASSWORD
                            </h5>
                            <div className=" flex items-center border-2 border-gray-300 px-2 py-1 bg-white w-full max-w-[400px] mb-5">
                                <FaKey className=" mr-2 text-ThemeRed" />
                                <input
                                    type={`${!isEye ? "password" : "text"}`}
                                    className="flex-1 outline-none text-16px"
                                    placeholder="Enter Password"
                                />
                                <div
                                    onClick={() => setEye(!isEye)}
                                    className="text-ThemeRed text-[20px]"
                                >
                                    {!isEye ? (
                                        <AiFillEyeInvisible />
                                    ) : (
                                        <AiFillEye />
                                    )}
                                </div>
                            </div>
                            <div className=" flex items-center justify-between w-full max-w-[400px] mb-5 640px:mb-4">
                                <button
                                    onClick={Login}
                                    className=" w-32 py-1 bg-ThemeRed rounded-lg text-white text-[14px] hover:shadow-lg duration-75 ease-in-out font-medium hover:bg-white hover:text-ThemeRed"
                                >
                                    LOG IN
                                </button>
                                <button className="text-ThemeRed hover:underline text-[14px]">
                                    Remember me
                                </button>
                            </div>
                        </section>
                        <div className="px-5 640px:px-5 flex justify-end">
                            <p className=" text-ThemeRed font-medium mb-5 tracking-tight text-[14px]">
                                © 2022 Boroughcrest Property Managament Systems
                                Corp. All rights reserved.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

Login.getLayout = function getLayout(page: any) {
    return <>{page}</>;
};

import React from "react";
import { imgProfile } from "../../../public/Images/Image";
import Image from "next/image";
import Link from "next/link";

export default function Table() {
    return (
        <div className=" w-full overflow-x-auto">
            <table className=" w-full min-w-[800px] 820px:min-w-[1000px]">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className=" text-start px-4 py-6">ID</th>
                        <th className=" text-start px-4 py-6">Name</th>
                        <th className=" text-start px-4 py-6">Address</th>
                        <th className=" text-start px-4 py-6">TIN</th>
                        <th className=" text-start px-4 py-6">Contact No.</th>
                        <th className=" text-start px-4 py-6">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <List />
                </tbody>
            </table>
        </div>
    );
}

const List = () => {
    return (
        <tr className="border-b border-gray-300 cursor-pointer">
            <td>
                <Link href="/project/corporate/123">
                    <a className="flex px-4 py-6">
                        <aside className=" w-10 h-10 rounded-full overflow-hidden relative shadow-lg mr-3">
                            <Image src={imgProfile.profile} layout="fill" />
                        </aside>
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                1234
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                JUan Dela Cruz
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                Quezon City
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                1234567890
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                099999999
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
            <td>
                <Link href="/project/corporate/123">
                    <a className="flex px-4 py-6">
                        <div>
                            <h2 className=" text-[#2E4364] font-NHU-medium">
                                juandelacruz@no.com
                            </h2>
                            <p className=" text-[12px]">Lorem Ipsum</p>
                        </div>
                    </a>
                </Link>
            </td>
        </tr>
    );
};

import React, { useState } from "react";
import { HiPencil } from "react-icons/hi";
import ModifyProperty from "./ModifyProperty";

export default function CustomerProperty() {
    const [isToggle, setToggle] = useState(false);
    return (
        <div>
            {isToggle && <ModifyProperty setToggle={setToggle} />}
            <header className=" flex w-full justify-between items-center mb-5">
                <h1 className=" w-full text-[24px] mb-3 480px:text-[16px]">
                    Property Information
                </h1>
                <HiPencil
                    className=" text-ThemeRed font-bold text-[32px] 480px:text-[24px] cursor-pointer"
                    onClick={() => setToggle(true)}
                />
            </header>
            <div className=" overflow-auto w-full">
                <table className=" w-full 480px:w-[800px]">
                    <thead>
                        <tr>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                UNIT CODE
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                TYPE
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                TOWER
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                FLOOR
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                AREA
                            </th>
                            <th className="text-gray-400 1024px:text-[14px] text-start font-thin px-2">
                                TURN OVER DATE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <List />
                        <List />
                        <List />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const List = () => {
    return (
        <tr>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                0937
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                Lorem ipsum
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                Lorem ipsum
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                Lorem ipsum
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                Lorem ipsum
            </td>
            <td className=" text-gray-500 mb-5 1024px:text-[14px] font-bold py-2 px-2">
                Lorem ipsum
            </td>
        </tr>
    );
};

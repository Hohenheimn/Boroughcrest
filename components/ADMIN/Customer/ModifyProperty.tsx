import React, { useRef, useEffect, useState, useContext } from "react";
import style from "../../../styles/Popup_Modal.module.scss";
import { RiArrowDownSFill } from "react-icons/ri";
import { UpdateProperties } from "../../ReactQuery/CustomerMethod";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../Animation/SimpleAnimation";
import { ScaleLoader } from "react-spinners";
import { GetUnitCode } from "../../ReactQuery/CustomerMethod";
import { useRouter } from "next/router";
import AppContext from "../../Context/AppContext";
import { useQueryClient } from "react-query";
import DynamicPopOver from "../../Reusable/DynamicPopOver";

type ModifyRolesPermission = {
    setToggle: Function;
    properties: any;
    classType: string;
};

export default function ModifyProperty({
    setToggle,
    properties,
    classType,
}: ModifyRolesPermission) {
    const queryClient = useQueryClient();
    const { setPrompt, setCusToggle } = useContext(AppContext);
    let buttonClick = "";
    const [isProperty, setProperty] = useState([
        {
            id: 1,
            unit_code: "",
            project: "",
        },
    ]);
    const router = useRouter();
    const id = router.query.id;

    const OnSuccess = () => {
        setPrompt({
            message: "Property Successfully updated!",
            type: "success",
            toggle: true,
        });
        queryClient.invalidateQueries(["get-customer-detail", `${id}`]);
        if (buttonClick === "save") {
            setToggle(false);
        }
        if (buttonClick === "new") {
            router.push("/admin/customer");
            setCusToggle(true);
        }
    };

    const { mutate, isLoading } = UpdateProperties(id, OnSuccess);

    useEffect(() => {
        if (properties.length !== 0) {
            const existedProperties = properties.map((item: any) => {
                return {
                    id: item?.id,
                    unit_code: item?.unit_code,
                    project: item?.project?.name,
                };
            });
            setProperty(existedProperties);
        }
    }, []);

    const [isSave, setSave] = useState(false);

    const mutateHandler = () => {
        const ArrayPropertyID = isProperty.map((item: any) => {
            return item.unit_code;
        });

        if (ArrayPropertyID.includes("")) {
            alert("Cannot proceed, one of unit code is empty");
            return;
        }

        const stringify = JSON.stringify(ArrayPropertyID);

        const Payload = {
            unit_codes: stringify,
            _method: "PUT",
        };
        mutate(Payload);
    };

    const save = () => {
        buttonClick = "save";
        mutateHandler();
    };
    const saveNew = () => {
        buttonClick = "new";
        mutateHandler();
    };

    return (
        <div className={style.container}>
            <section className=" p-10 bg-[#e2e3e4ef] rounded-lg w-[90%] max-w-[700px] text-ThemeRed shadow-lg">
                <p className=" text-[16px] mb-3 font-bold">Modify Customer</p>

                <motion.div
                    variants={ModalSideFade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <h1 className=" w-full text-[24px] mb-3">
                        Property Information
                    </h1>

                    <table className="w-full mb-20">
                        <thead>
                            <tr>
                                <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                                    UNIT CODE
                                </th>
                                <th className=" text-[12px] font-semibold mb-1 uppercase text-start">
                                    PROJECT
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isProperty.map((item, index) => (
                                <List
                                    detail={item}
                                    setProperty={setProperty}
                                    key={index}
                                    isProperty={isProperty}
                                    id={index}
                                    classType={classType}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className={style.SaveButton}>
                        <button
                            className={style.back}
                            onClick={() => setToggle(false)}
                        >
                            CANCEL
                        </button>

                        <div className={style.Save}>
                            <div>
                                <button
                                    type="submit"
                                    name="save"
                                    onClick={save}
                                    className={style.save_button}
                                >
                                    {isLoading ? (
                                        <ScaleLoader
                                            color="#fff"
                                            height="10px"
                                            width="2px"
                                        />
                                    ) : (
                                        "SAVE"
                                    )}
                                </button>
                                <aside className={style.Arrow}>
                                    <RiArrowDownSFill
                                        onClick={() => setSave(!isSave)}
                                    />
                                </aside>
                            </div>
                            {isSave && (
                                <ul>
                                    <li>
                                        <button type="submit" onClick={saveNew}>
                                            SAVE & NEW
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
type List = {
    detail: any;
    setProperty: Function;
    isProperty: {}[];
    id: number;
    classType: string;
};
const List = ({ detail, setProperty, isProperty, id, classType }: List) => {
    const newID = Math.random();
    const [isSelect, setSelect] = useState(false);
    const { setPrompt } = useContext(AppContext);

    const updateValue = (event: any) => {
        const unit_code = event.target.innerHTML;
        let validate = true;
        isProperty.map((item: any) => {
            if (item.unit_code === unit_code) {
                setPrompt({
                    message: "Selected Unit Code already in the list!",
                    type: "error",
                    toggle: true,
                });
                validate = false;
                return;
            }
        });
        if (validate === true) {
            const newItems = isProperty.map((item: any) => {
                if (detail.id == item.id) {
                    return {
                        ...item,
                        project: event.target.getAttribute("data-projname"),
                        unit_code: unit_code,
                    };
                }
                return item;
            });
            setProperty(newItems);
            setSelect(false);
        }
    };

    return (
        <tr>
            <td className=" pr-2 ">
                <div className=" relative w-full">
                    <DynamicPopOver
                        samewidth={true}
                        toRef={
                            <input
                                type="text"
                                value={detail.unit_code}
                                onChange={(e) => updateValue(e)}
                                className="field w-full"
                                onFocus={() => setSelect(true)}
                            />
                        }
                        toPop={
                            <>
                                {isSelect && (
                                    <Select
                                        setSelect={setSelect}
                                        updateValue={updateValue}
                                        classType={classType}
                                    />
                                )}
                            </>
                        }
                        className={""}
                    />
                </div>
            </td>
            <td className="pr-2">
                <input
                    type="text"
                    className="field w-full disabled"
                    value={detail.project}
                    readOnly
                />
            </td>
            <td className=" flex justify-center">
                <div className="flex justify-between w-10">
                    {isProperty.length > 1 && (
                        <button
                            className=" text-[32px] text-ThemeRed mr-2"
                            onClick={() =>
                                setProperty((item: any[]) =>
                                    item.filter(
                                        (x: { id: any }) => x.id !== detail.id
                                    )
                                )
                            }
                        >
                            -
                        </button>
                    )}
                    {isProperty.length - 1 === id && (
                        <button
                            className=" text-[32px] text-ThemeRed"
                            onClick={() =>
                                setProperty((item: any) => [
                                    ...item,
                                    {
                                        id: newID,
                                        unit_code: "",
                                        project: "",
                                    },
                                ])
                            }
                        >
                            +
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

const Select = ({ setSelect, updateValue, classType }: any) => {
    const Menu = useRef<any>();

    // Get unit codes to display
    const { isLoading, data, isError } = GetUnitCode(classType);

    useEffect(() => {
        const clickOutSide = (e: any) => {
            if (!Menu.current.contains(e.target)) {
                setSelect(false);
            }
        };
        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        };
    });

    return (
        <ul ref={Menu} className="dropdown-list">
            {isLoading && (
                <li className="flex justify-center">
                    <ScaleLoader color="#8f384d" height="10px" width="2px" />
                </li>
            )}
            {isError && (
                <li className="flex justify-center ">
                    <h1>Something went wrong!</h1>
                </li>
            )}
            {data?.data.length <= 0 && (
                <li className="flex justify-center ">
                    <h1>No Available Unit Code for {classType}</h1>
                </li>
            )}
            {data?.data.map((item: any, index: number) => (
                <li
                    key={index}
                    data-projname={item?.project?.name}
                    onClick={updateValue}
                    className="cursor-pointer"
                >
                    {item?.unit_code}
                </li>
            ))}
        </ul>
    );
};

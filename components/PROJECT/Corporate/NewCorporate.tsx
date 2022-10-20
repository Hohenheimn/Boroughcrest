import React, { useRef, useEffect, useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useRouter } from "next/router";
import style from "../../../styles/Popup_Modal.module.scss";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ModalSideFade } from "../../../components/Animation/SimpleAnimation";
import { RiArrowDownSFill } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import api from "../../../util/api";
import type { firstCorporateForm } from "../../../types/corporateList";
import type { secondCorporateForm } from "../../../types/corporateList";
import { ScaleLoader } from "react-spinners";

export default function NewCorporate() {
    const [isNewActive, setNewActive] = useState([true, false]);
    const { isLoading, isError, data } = useQuery("get-id", () => {
        return api.get("project/corporate");
    });
    if (isLoading || isError) {
        return;
    }
    let Current_id: any;
    for (let index = 0; index < data?.data.length; index++) {
        const id = data?.data[index];
        Current_id = id.id;
    }

    return (
        <div className={style.container}>
            <section>
                <p className={style.modal_title}>Create Corporate</p>

                <AnimatePresence mode="wait">
                    {isNewActive[0] && (
                        <Primary
                            key={1}
                            setNewActive={setNewActive}
                            Current_id={Current_id}
                        />
                    )}
                    {isNewActive[1] && (
                        <Contact key={2} setNewActive={setNewActive} />
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

type Props = {
    setNewActive: Function;
    Current_id?: any;
};
const Primary = ({ setNewActive, Current_id }: Props) => {
    const [isLogoStatus, setLogoStatus] = useState("Upload Logo");
    const [isProfileUrl, setProfileUrl] = useState("/Images/sampleProfile.png");
    const Next_ID = Current_id + 1;

    const DisplayImage = (e: any) => {
        if (e.target.files[0]?.size > 2000) {
            setLogoStatus("File is too large");
            return;
        } else {
            setLogoStatus("");
        }
        if (e.target.files.length > 0) {
            let selectedImage = e.target.files[0];
            if (
                ["image/jpeg", "image/png", "image/svg+xml"].includes(
                    selectedImage.type
                )
            ) {
                let ImageReader = new FileReader();
                ImageReader.readAsDataURL(selectedImage);
                ImageReader.addEventListener("load", (event: any) => {
                    setProfileUrl(event.target.result);
                });
                const file = e.target.files;
                setLogoStatus(file[0].name);
            } else {
                setLogoStatus("Invalid Image File");
            }
        } else {
        }
    };

    const { setToggleNewForm, setCreateCorporate, createCorporate } =
        useContext(AppContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<firstCorporateForm>({
        defaultValues: {
            logo: createCorporate.logo,
            name: createCorporate.name,
            tin: createCorporate.tin,
            branch_code: createCorporate.branch_code,
            rdo_no: createCorporate.rdo_no,
            gst_type: createCorporate.gst_type,
            sec_registration_no: createCorporate.sec_registration_no,
        },
    });

    const Submit = (data: any) => {
        setCreateCorporate({
            ...createCorporate,
            logo: data.logo[0],
            name: data.name,
            tin: data.tin,
            branch_code: data.branch_code,
            rdo_no: data.rdo_no,
            gst_type: data.gst_type,
            sec_registration_no: data.sec_registration_no,
        });

        setNewActive((item: any) => [(item[0] = false), (item[1] = true)]);
        console.log(createCorporate);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <form onSubmit={handleSubmit(Submit)}>
                <h1 className={style.modal_label_primary}>
                    Primary Informations
                </h1>
                <input
                    type="file"
                    id="image"
                    {...register("logo", {
                        required: "Required",
                    })}
                    onChange={DisplayImage}
                    className="appearance-none z-[-99] absolute bottom-full"
                />
                <ul className={style.ThreeRows}>
                    <li className={style.upload_image}>
                        <aside>
                            <aside>
                                <Image
                                    src={isProfileUrl}
                                    alt=""
                                    layout="fill"
                                />
                            </aside>
                            <label htmlFor="image">
                                <AiFillCamera />
                            </label>
                        </aside>
                        <label htmlFor="image" className={style.image_label}>
                            <p>{isLogoStatus}</p>
                            {errors.logo && (
                                <p className="text-[10px] capitalize">
                                    Required
                                </p>
                            )}
                        </label>
                    </li>
                    <li>
                        <label>ID</label>
                        <input
                            type="text"
                            value={Next_ID}
                            disabled={true}
                            className=" bg-[#cdb8be]"
                        />
                    </li>
                    <li>
                        <label>Corporate Name</label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Required",
                            })}
                        />
                        {errors.name && (
                            <p className="text-[10px]">{errors.name.message}</p>
                        )}
                    </li>
                </ul>
                <p className="text-[16px]">TIN</p>
                <ul className={style.ThreeRows}>
                    <li className={style.twoRows}>
                        <div className={style.wrapper}>
                            <div className=" w-[48%]">
                                <label>TIN Number</label>
                                <input
                                    type="text"
                                    placeholder="000-000-000"
                                    {...register("tin", {
                                        required: "Required",
                                        minLength: {
                                            value: 11,
                                            message: "Must be 11 Characters",
                                        },
                                        maxLength: {
                                            value: 11,
                                            message: "Must be 11 Characters",
                                        },
                                        pattern: {
                                            value: /^[0-9,-]+$/i,
                                            message: "Only number and Hyphen",
                                        },
                                    })}
                                />
                                {errors.tin && (
                                    <p className="text-[10px]">
                                        {errors.tin.message}
                                    </p>
                                )}
                            </div>
                            <div className=" w-[48%]">
                                <label>Branch Code</label>
                                <input
                                    placeholder="00000"
                                    {...register("branch_code", {
                                        required: "Required",
                                        minLength: {
                                            value: 5,
                                            message: "Must be 5 Number",
                                        },
                                        maxLength: {
                                            value: 5,
                                            message: "Must be 5 Number",
                                        },
                                    })}
                                    type="number"
                                />
                                {errors.branch_code && (
                                    <p className="text-[10px]">
                                        {errors.branch_code.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>RDO NO.</label>
                        <input
                            type="number"
                            placeholder="000"
                            {...register("rdo_no", {
                                required: "Required",
                                minLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                                maxLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                            })}
                        />
                        {errors.rdo_no && (
                            <p className="text-[10px]">
                                {errors.rdo_no.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>GST TYPE.</label>
                        <select
                            {...register("gst_type", {
                                required: true,
                            })}
                            id=""
                            required
                        >
                            <option value="VAT">VAT</option>
                            <option value="NON-VATA">NON-VAT</option>
                        </select>
                    </li>
                </ul>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>SEC. Registration</label>
                        <input
                            type="number"
                            placeholder="000"
                            {...register("sec_registration_no", {
                                required: "Required",
                                minLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                                maxLength: {
                                    value: 3,
                                    message: "Must be 3 Number",
                                },
                            })}
                        />
                        {errors.sec_registration_no && (
                            <p className="text-[10px]">
                                {errors.sec_registration_no.message}
                            </p>
                        )}
                    </li>
                    <li></li>
                    <li></li>
                </ul>
                <div className={style.button_container}>
                    <aside
                        onClick={() => setToggleNewForm(false)}
                        className="button_cancel cursor-pointer"
                    >
                        CANCEL
                    </aside>

                    <button className="buttonRed" type="submit">
                        NEXT
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

const Contact = ({ setNewActive }: Props) => {
    const [isSave, setSave] = useState(false);
    const { setCreateCorporate, createCorporate, setToggleNewForm } =
        useContext(AppContext);

    const [ErrorContact, setErrorContact] = useState(false);
    const [ErrorAddress, setErrorAddress] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<secondCorporateForm>({
        defaultValues: {
            email: createCorporate.email,
            contact_no: createCorporate.contact_no,
            alt_email: createCorporate.alt_email,
            alt_contact_no: createCorporate.alt_contact_no,
            address_unit_floor: createCorporate.address_unit_floor,
            address_building: createCorporate.address_building,
            address_street: createCorporate.address_street,
            address_district: createCorporate.address_district,
            address_municipal_city: createCorporate.address_municipal_city,
            address_province: createCorporate.address_province,
            address_zip_code: createCorporate.address_zip_code,
        },
    });

    const {
        isLoading: MutateLoading,
        mutate,
        isError,
        error,
    } = useMutation((data: FormData) => {
        return api.post("/project/corporate", data);
    });
    if (isError) {
        console.log(error);
    }

    const Submit = async (data: any) => {
        if (data.email === data.alt_email) {
            setErrorAddress(true);
            return;
        }
        if (data.contact_no === data.alt_contact_no) {
            setErrorContact(true);
            return;
        }
        const FD = new FormData();
        FD.append("logo", createCorporate.logo);
        FD.append("name", createCorporate.name);
        FD.append("tin", createCorporate.tin);
        FD.append("branch_code", createCorporate.branch_code);
        FD.append("gst_type", createCorporate.gst_type);
        FD.append("rdo_no", createCorporate.rdo_no);
        FD.append("sec_registration_no", createCorporate.sec_registration_no);
        FD.append("email", createCorporate.email);
        FD.append("contact_no", createCorporate.contact_no);
        FD.append("alt_email", createCorporate.alt_email);
        FD.append("alt_contact_no", createCorporate.alt_contact_no);
        FD.append("address_unit_floor", createCorporate.address_unit_floor);
        FD.append("address_building", createCorporate.address_building);
        FD.append("address_street", createCorporate.address_street);
        FD.append("address_district", createCorporate.address_district);
        FD.append(
            "address_municipal_city",
            createCorporate.address_municipal_city
        );
        FD.append("address_province", createCorporate.address_province);
        FD.append("address_zip_code", createCorporate.address_zip_code);
        mutate(FD);
    };

    return (
        <motion.div
            variants={ModalSideFade}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <h1 className={style.modal_label_primary}>Contact Informations</h1>
            <form onSubmit={handleSubmit(Submit)}>
                <ul className={style.twoRows_container}>
                    <li>
                        <label>CONTACT NO</label>
                        <aside>
                            <input
                                type="number"
                                {...register("contact_no", {
                                    required: "Required",
                                    minLength: {
                                        value: 11,
                                        message: "Must be 11 Numbers",
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: "Must be 11 Number",
                                    },
                                })}
                                onChange={(e) =>
                                    setCreateCorporate({
                                        ...createCorporate,
                                        contact_no: e.target.value,
                                    })
                                }
                            />
                            <span>Official</span>
                        </aside>
                        {errors.contact_no && (
                            <p className="text-[10px]">
                                {errors.contact_no.message}
                            </p>
                        )}
                        <input
                            type="number"
                            {...register("alt_contact_no", {
                                minLength: {
                                    value: 11,
                                    message: "Must be 11 Numbers",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Must be 11 Number",
                                },
                            })}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    alt_contact_no: e.target.value,
                                })
                            }
                        />
                        {errors.alt_contact_no && (
                            <p className="text-[10px]">
                                {errors.alt_contact_no.message}
                            </p>
                        )}
                        {ErrorContact && (
                            <p className="text-[10px]">
                                Contact number cannot be the same
                            </p>
                        )}
                    </li>
                    <li>
                        <label>EMAIL ADDRESS</label>
                        <aside>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Required",
                                })}
                                required
                                onChange={(e) =>
                                    setCreateCorporate({
                                        ...createCorporate,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <span>Official</span>
                        </aside>
                        {errors.email && (
                            <p className="text-[10px]">
                                {errors.email.message}
                            </p>
                        )}
                        <input
                            type="email"
                            {...register("alt_email", {})}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    alt_email: e.target.value,
                                })
                            }
                        />
                        {errors.alt_email && (
                            <p className="text-[10px]">
                                {errors.alt_email.message}
                            </p>
                        )}
                        {ErrorAddress && (
                            <p className="text-[10px]">
                                Email cannot be the same
                            </p>
                        )}
                    </li>
                </ul>
                <p className="text-[14px] font-bold mb-2">ADDRESS</p>
                <ul className={style.ThreeRows}>
                    <li>
                        <label>UNIT/FLOOR/HOUSE NO.</label>
                        <input
                            type="number"
                            {...register("address_unit_floor", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    address_unit_floor: e.target.value,
                                })
                            }
                        />
                        {errors.address_unit_floor && (
                            <p className="text-[10px]">
                                {errors.address_unit_floor.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>BUILDING</label>
                        <input
                            type="text"
                            {...register("address_building", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    address_building: e.target.value,
                                })
                            }
                        />
                        {errors.address_building && (
                            <p className="text-[10px]">
                                {errors.address_building.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>STREET</label>
                        <input
                            type="text"
                            {...register("address_street", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    address_street: e.target.value,
                                })
                            }
                        />
                        {errors.address_street && (
                            <p className="text-[10px]">
                                {errors.address_street.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>DISTRICT</label>
                        <input
                            type="text"
                            {...register("address_district", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    address_district: e.target.value,
                                })
                            }
                        />
                        {errors.address_district && (
                            <p className="text-[10px]">
                                {errors.address_district.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>MUNICIPALITY</label>
                        <input
                            type="text"
                            {...register("address_municipal_city", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    address_municipal_city: e.target.value,
                                })
                            }
                        />
                        {errors.address_municipal_city && (
                            <p className="text-[10px]">
                                {errors.address_municipal_city.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>PROVINCE</label>
                        <input
                            type="text"
                            {...register("address_province", {
                                required: "Required",
                            })}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    address_province: e.target.value,
                                })
                            }
                        />
                        {errors.address_province && (
                            <p className="text-[10px]">
                                {errors.address_province.message}
                            </p>
                        )}
                    </li>
                    <li>
                        <label>ZIP CODE</label>
                        <input
                            type="number"
                            {...register("address_zip_code", {
                                required: "Required",
                                minLength: {
                                    value: 4,
                                    message: "Must be 4 Numbers",
                                },
                                maxLength: {
                                    value: 4,
                                    message: "Must be 4 Numbers",
                                },
                            })}
                            onChange={(e) =>
                                setCreateCorporate({
                                    ...createCorporate,
                                    address_zip_code: e.target.value,
                                })
                            }
                        />
                        {errors.address_zip_code && (
                            <p className="text-[10px]">
                                {errors.address_zip_code.message}
                            </p>
                        )}
                    </li>
                </ul>
                <div className={style.SaveButton}>
                    <aside
                        className="cancel_button mr-5 font-bold cursor-pointer"
                        onClick={() =>
                            setNewActive((item: any) => [
                                (item[0] = true),
                                (item[1] = false),
                            ])
                        }
                    >
                        Back
                    </aside>
                    {MutateLoading && (
                        <div className={style.Save}>
                            <div>
                                <ScaleLoader
                                    color="#fff"
                                    height="10px"
                                    width="2px"
                                />
                            </div>
                        </div>
                    )}
                    {!MutateLoading && (
                        <div className={style.Save}>
                            <div onClick={() => setSave(!isSave)}>
                                SAVE{" "}
                                <RiArrowDownSFill className=" ml-1 text-[24px]" />
                            </div>
                            {isSave && (
                                <ul>
                                    <li>
                                        <button name="save" data-type="save">
                                            SAVE
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            name="save"
                                            data-type="save-new"
                                        >
                                            SAVE & NEW
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            name="draft"
                                            data-type="save-draft"
                                        >
                                            SAVE AS DRAFT
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </form>
        </motion.div>
    );
};

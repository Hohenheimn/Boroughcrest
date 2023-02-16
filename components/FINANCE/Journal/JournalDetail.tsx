import React from "react";
import { HiPencil } from "react-icons/hi";
import style from "../../../styles/Project/PropertyDetails.module.scss";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Image from "next/image";
import { TextNumberDisplay } from "../../NumberFormat";

type JournalDetail = {
    Detail: {
        id: string;
        corporate_id: string;
        date: string;
        particulars: string;
        journal_no: string | null;
        status: string;
        trail: trail[];
        journal_list: journal_list[];
    };
};
type trail = {
    event: string;
    user: string;
    date: string;
    time: string;
    datetime: string;
};

type journal_list = {
    debit: string;
    credit: string;
    chart_of_account: {
        chart_code: string;
        account_name: string;
    };
};

export default function JournalDetail({ Detail }: JournalDetail) {
    let totalDebit = 0;
    let totalCredit = 0;
    console.log(Detail.journal_list);
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="pageTitle mb-5">Journal Details</h1>
                <ul className="flex">
                    <li className="mr-5">
                        <Tippy theme="ThemeRed" content="Print">
                            <div className="relative w-8 h-8 transition-all duration-75 hover:scale-[1.1]">
                                <Image
                                    src="/Images/Print.png"
                                    layout="fill"
                                    alt="Print"
                                />
                            </div>
                        </Tippy>
                    </li>
                    <li>
                        <Tippy theme="ThemeRed" content="Modify">
                            <div>
                                <Link href="/finance/general-ledger/journal/modify-journal/1">
                                    <a>
                                        <div className="relative w-8 h-8 transition-all duration-75 hover:scale-[1.1]">
                                            <Image
                                                src="/Images/f_modify.png"
                                                layout="fill"
                                                alt="Print"
                                            />
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </Tippy>
                    </li>
                </ul>
            </div>
            <ul className={`${style.FourRows} ${style.narrow}`}>
                <aside>
                    <Tippy
                        theme="ThemeRed"
                        content={<span className="capitalize">Modify</span>}
                    >
                        <div>
                            <Link href="/finance/general-ledger/journal/modify-journal/1">
                                <a>
                                    <HiPencil className={style.pencil} />
                                </a>
                            </Link>
                        </div>
                    </Tippy>
                </aside>
                <li className={style.noMb}>
                    <div className={style.row}>
                        <p className="label_text">DATE</p>
                        <h4 className="main_text">{Detail?.date}</h4>
                    </div>
                    <div className={style.row}>
                        <p className="label_text">JOURNAL NO.</p>
                        <h4 className="main_text">{Detail?.journal_no}</h4>
                    </div>
                </li>
                <li className={style.noMb}>
                    <p className="label_text">PARTICULARS</p>
                    <h4 className="main_text">{Detail?.particulars}</h4>
                </li>
            </ul>
            <ul className={`${style.OneRow} ${style.narrow}`}>
                <li className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="label_text">CODE</th>
                                <th className="label_text">ACCOUNT NAME</th>
                                <th className="label_text">DEBIT</th>
                                <th className="label_text">CREDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Detail?.journal_list.map(
                                (item: journal_list, index: number) => (
                                    <>
                                        <List journal_list={item} key={index} />
                                    </>
                                )
                            )}

                            <tr>
                                <td colSpan={2} className={style.total}>
                                    <p className="label_text">TOTAL:</p>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        value={totalDebit}
                                        className="main_text"
                                    />
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        value={totalCredit}
                                        className="main_text"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            </ul>
            <ul className={`${style.Occupants} ${style.narrow}`}>
                <li className={style.noMb}>
                    <p className="label_text">TRAIL</p>
                    {Detail?.trail.map((item: trail, index) => (
                        <h4 className="main_text" key={index}>
                            {item?.event} by {item?.user} on {item?.date},{" "}
                            {item?.time} | {item?.datetime}
                        </h4>
                    ))}
                </li>
            </ul>
        </div>
    );
}

type ListProps = {
    journal_list: journal_list;
};
const List = ({ journal_list }: ListProps) => {
    return (
        <tr>
            <td>
                <h4 className="main_text">
                    {journal_list?.chart_of_account?.chart_code}
                </h4>
            </td>
            <td>
                <h4 className="main_text">
                    {journal_list?.chart_of_account?.account_name}
                </h4>
            </td>
            <td>
                <h4 className="main_text">{journal_list?.debit}</h4>
            </td>
            <td>
                <h4 className="main_text">{journal_list?.credit}</h4>
            </td>
        </tr>
    );
};

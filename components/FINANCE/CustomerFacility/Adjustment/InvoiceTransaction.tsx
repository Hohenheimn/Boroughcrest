import React, { useEffect, useState } from "react";
import {
    InputNumberForTable,
    TextNumberDisplay,
} from "../../../Reusable/NumberFormat";
import SelectDropdown from "../../../Reusable/SelectDropdown";
import DropDownCharge from "../../../Dropdowns/DropDownCharge";
import { AdjustmentHeaderForm, AdjustmentInvoice } from "./AdjustmentForm";
import { BarLoader } from "react-spinners";
import TableErrorMessage from "../../../Reusable/TableErrorMessage";

type Props = {
    setHeaderForm: Function;
    HeaderForm: AdjustmentHeaderForm;
    isCharge: { charge: string; charge_id: string | number };
    setCharge: Function;
    isTransaction: string;
    setTransaction: Function;
    isInvoicesAdjustment: AdjustmentInvoice[];
    setInvoiceAdjustment: Function;
    isLoading: boolean;
    isError: boolean;
};

export default function InvoiceTransaction({
    HeaderForm,
    setHeaderForm,
    isCharge,
    setCharge,
    setTransaction,
    isTransaction,
    isInvoicesAdjustment,
    setInvoiceAdjustment,
    isLoading,
    isError,
}: Props) {
    useEffect(() => {
        setHeaderForm({
            ...HeaderForm,
            charge_id: Number(isCharge.charge_id),
        });
    }, [isCharge]);
    const [isBalance, setBalance] = useState(0);
    useEffect(() => {
        setBalance(0);
        isInvoicesAdjustment.map((item) => {
            setBalance((prev) => Number(prev) + item.balance);
        });
    }, [isInvoicesAdjustment]);

    return (
        <ul className="w-full flex flex-wrap border-b border-gray-300">
            <li className="w-8/12 640px:w-full 640px:pr-0 640px:pb-0 640px:border-none pr-10 py-10 1550px:pr-5 1550px:py-5 flex flex-col justify-start items-start border-r border-gray-300">
                <div className="flex items-center mb-5 640px:w-full">
                    <label htmlFor="" className="labelField">
                        CHARGE
                    </label>
                    <DropDownCharge
                        UpdateStateHandler={(key, e) => {
                            setCharge({
                                charge: e.target.innerHTML,
                                charge_id: e.target.getAttribute("data-id"),
                            });
                        }}
                        itemDetail={isCharge}
                    />
                </div>
                <div className="table_container w-full hAuto">
                    <table className="table_list">
                        <thead className="textRed">
                            <tr>
                                <th>DOCUMENT DATE</th>
                                <th>DOCUMENT NO.</th>
                                <th>DESCRIPTION</th>
                                <th>AMOUNT DUE</th>
                                <th>REMAINING&nbsp;ADVANCES</th>
                            </tr>
                        </thead>
                        <tbody className="textBlack">
                            {isInvoicesAdjustment.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.document_date}</td>
                                    <td>{item.document_no}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <TextNumberDisplay
                                            className="withPeso w-full text-end"
                                            value={item.amount_due}
                                        />
                                    </td>
                                    <td>
                                        <TextNumberDisplay
                                            className="withPeso w-full text-end"
                                            value={item.remaining_advances}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isLoading && (
                        <div className="top-0 left-0 absolute w-full h-full flex justify-center items-center">
                            <aside className="text-center flex justify-center py-5">
                                <BarLoader
                                    color={"#8f384d"}
                                    height="10px"
                                    width="200px"
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </aside>
                        </div>
                    )}
                    {isError && <TableErrorMessage />}
                </div>
            </li>
            <li className="w-4/12 640px:w-full 640px:pl-0 640px:pt-0 pl-10 py-10 1550px:pl-5 1550px:py-5">
                <div className="flex items-center mb-5">
                    <label htmlFor="" className="labelField">
                        TRANSACTION
                    </label>
                    <SelectDropdown
                        selectHandler={(value: string) => {
                            setTransaction(value);
                        }}
                        className=""
                        inputElement={
                            <input
                                className="w-full field"
                                value={isTransaction}
                                readOnly
                            />
                        }
                        listArray={[
                            "Apply Advances",
                            "Discount",
                            "Credit Tax",
                            "Charge Reversal",
                            "Charge Debit",
                        ]}
                    />
                </div>
                <div className="table_container hAuto">
                    <table className="table_list">
                        <thead className="textRed">
                            <tr>
                                <th>ADJUSTMENT</th>
                                <th>BALANCE</th>
                            </tr>
                        </thead>
                        <tbody className="textBlack">
                            {isInvoicesAdjustment.map((item, index) => (
                                <List
                                    key={index}
                                    itemDetail={item}
                                    setInvoiceAdjustment={setInvoiceAdjustment}
                                    isInvoicesAdjustment={isInvoicesAdjustment}
                                />
                            ))}

                            <tr>
                                <td>
                                    <h4 className=" text-ThemeRed text-end">
                                        SUB TOTAL
                                    </h4>
                                </td>
                                <td>
                                    <TextNumberDisplay
                                        className="withPeso w-full text-end"
                                        value={isBalance}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end">
                    <button className="buttonRed">APPLY</button>
                </div>
            </li>
        </ul>
    );
}
type ListProps = {
    itemDetail: AdjustmentInvoice;
    isInvoicesAdjustment: AdjustmentInvoice[];
    setInvoiceAdjustment: Function;
};
const List = ({
    itemDetail,
    setInvoiceAdjustment,
    isInvoicesAdjustment,
}: ListProps) => {
    const Updatevalue = (type: string, value: string | number) => {
        const CloneToUpdate = isInvoicesAdjustment.map((item) => {
            if (item.billing_invoice_id === itemDetail.billing_invoice_id) {
                const balance = Number(item.remaining_advances) - Number(value);
                return {
                    ...item,
                    balance: balance <= 0 ? 0 : balance,
                    adjustment_amount: Number(value),
                };
            }
            return item;
        });
        setInvoiceAdjustment(CloneToUpdate);
    };
    return (
        <tr>
            <td>
                <InputNumberForTable
                    className={"field number w-full"}
                    value={itemDetail.adjustment_amount}
                    type={""}
                    onChange={Updatevalue}
                />
            </td>
            <td>
                <TextNumberDisplay
                    className="withPeso w-full text-end"
                    value={itemDetail.balance}
                />
            </td>
        </tr>
    );
};
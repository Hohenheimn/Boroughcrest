import React from "react";
import { BeatLoader } from "react-spinners";
import {
    InvoiceDetail,
    InvoiceList,
} from "../../../../../components/FINANCE/CustomerFacility/Billing/BillingDetail";
import BillingForm from "../../../../../components/FINANCE/CustomerFacility/Billing/BillingForm";
import { GetInvoiceListDetail } from "../../../../../components/FINANCE/CustomerFacility/Billing/Query";

export default function Id({ id }: any) {
    const { isLoading, data, isError } = GetInvoiceListDetail(id);

    const InvoiceDetail: InvoiceDetail = data?.data;

    const Value = InvoiceDetail?.invoice_list.map((item: InvoiceList) => {
        return {
            id: item.id,
            charge: item.charge.name,
            description: item.description,
            charge_id: item.charge.id,
            charge_vat: item.charge.vat_percent,
            unit_price: item.unit_price,
            quantity: item.quantity,
            uom: "wla pa",
            vat: item.vat,
            amount: item.amount,
        };
    });
    const CustomerDefault = {
        id: InvoiceDetail?.customer.id,
        name: InvoiceDetail?.customer.name,
        class: InvoiceDetail?.customer.class,
        property: InvoiceDetail?.customer.properties.map((item) => {
            return item.unit_code;
        }),
    };

    if (isLoading) {
        return (
            <div className="pageDetail">
                <BeatLoader
                    color={"#8f384d"}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="pageDetail">
                <h1>Something is wrong!</h1>
            </div>
        );
    }

    return (
        <div>
            <BillingForm
                DefaultValue={Value}
                formType="modify"
                DefaultCustomer={CustomerDefault}
            />
        </div>
    );
}

export async function getServerSideProps({ query }: any) {
    const id = query.modify;
    return {
        props: {
            id: id,
        },
    };
}
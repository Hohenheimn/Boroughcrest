import React from "react";
import BillingForm from "../../../../components/FINANCE/CustomerFacility/Billing/BillingForm";

export default function CreateInvoice() {
    const Value = [
        {
            id: 0,
            charge: "",
            charge_id: "",
            description: "",
            unit_price: 0,
            quantity: 0,
            uom: "",
            vat: 0,
            amount: 0,
        },
    ];

    return (
        <div>
            <BillingForm
                DefaultValue={Value}
                type="create"
                DefaultCustomer={{
                    id: "",
                    name: "",
                    class: "",
                    property: "",
                }}
            />
        </div>
    );
}

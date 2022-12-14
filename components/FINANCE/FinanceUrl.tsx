export const GeneralLedger = [
    {
        name: "Chart of Account",
        activeUrl: "chart-of-account",
        url: "/finance/general-ledger/chart-of-account",
    },
    {
        name: "Opening Balance",
        activeUrl: "opening-balance",
        url: "/finance/general-ledger/opening-balance",
    },
    {
        name: "Bank Reconciliation",
        activeUrl: "bank-reconciliation",
        url: "/finance/general-ledger/bank-reconciliation",
    },
    {
        name: "Asset Management",
        activeUrl: "asset-management",
        url: "/finance/general-ledger/asset-management",
    },
    {
        name: "Journal",
        activeUrl: "journal",
        url: "/finance/general-ledger/journal/create-journal",
        submenu: [
            {
                name: "Create Journal",
                url: "/finance/general-ledger/journal/create-journal",
            },
            {
                name: "Journal List",
                url: "/finance/general-ledger/journal/journal-list",
            },
        ],
    },
];

export const CustomerFacility = [
    {
        name: "Charge",
        activeUrl: "charge",
        url: "/finance/customer-facility/charge",
    },
    {
        name: "Billing",
        activeUrl: "billing",
        url: "/finance/customer-facility/billing",
    },
    {
        name: "Collection",
        activeUrl: "collection",
        url: "/finance/customer-facility/collection",
    },
    {
        name: "Deposit Counter",
        activeUrl: "deposit-counter",
        url: "/finance/customer-facility/deposit-counter",
    },
    {
        name: "Adjustment",
        activeUrl: "adjustment",
        url: "/finance/customer-facility/adjustment",
    },
];
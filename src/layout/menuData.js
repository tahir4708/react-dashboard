import {FaChartLine, FaCog, FaInfoCircle, FaSalesforce} from "react-icons/fa";

export const menuData = [
    {
        id: 1,
        title: "Dashboard",
        path: "/dashboard",
        icon: <FaChartLine />,
        children: [],
    },
    {
        id: 2,
        title: "Sales",
        path: "/sales",
        icon: <FaSalesforce />,
        children: [
            {
                id: 21,
                title: "Orders",
                path: "/sales/orders",
                icon: <FaChartLine />,
                children: [
                    {
                        id: 211,
                        title: "Return Sale Order",
                        path: "/sales/orders/return-sale-order",
                        icon: <FaChartLine />
                    },
                    {
                        id: 212,
                        title: "Sale Order",
                        path: "/sales/orders/sale-order",
                        icon: <FaChartLine />,
                    },
                ],
            },
            {
                id: 22,
                title: "Invoices",
                path: "/sales/invoices",
                icon: <FaChartLine />,
            },
            {
                id: 23,
                title: "Customers",
                path: "/sales/customers",
                icon: <FaChartLine />,
            },
        ],
    },
    {
        id: 3,
        title: "About",
        path: "/about",
        icon: <FaInfoCircle />,
        children: [
            {
                id: 31,
                title: "Team",
                path: "/about/team",
                icon: <FaInfoCircle />,
            },
            {
                id: 32,
                title: "Mission",
                path: "/about/mission",
                icon: <FaInfoCircle />,
            },
        ],
    },
    {
        id: 4,
        title: "Settings",
        path: "/settings",
        icon: <FaCog />,
        children: [
            {
                id: 41,
                title: "Profile",
                path: "/settings/profile",
                icon: <FaCog />,
            },
            {
                id: 42,
                title: "Preferences",
                path: "/settings/preferences",
                icon: <FaCog />,
            },
        ],
    },
];
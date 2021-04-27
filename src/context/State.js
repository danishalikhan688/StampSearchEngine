import React, { useReducer, useState } from "react";
import Context from "./Context";
import Reducer from "./Reducer";
import { MenuClick } from "./types/types";

export const State = (props) => {
    const initialState = {
        pageTitle: null,
        sideBarState: [{
            title: "Mange Campaigns",
            subitems: [{
                title: "Campaigns",
                link: "/campaigns",
                icon: " tim-icons icon-chart-pie-36",
                className: "active",
            },],
        },
        {
            title: "Manage Winner",
            subitems: [{
                title: "Winner",
                link: "/winners",
                icon: " tim-icons icon-chart-pie-36",
                className: "active",
            },],
        },
        {
            title: "Manage Luckydraw",
            subitems: [{
                title: "Luckydraw",
                link: "/luckydraw",
                icon: " tim-icons icon-chart-pie-36",
                className: "active",
            },],
        },
        ],

        footerState: [{
            title: "Creative Tim",
            className: "nav-item",
            icon: " tim-icons icon-atom",
            link: "#",
        },],

        dummyCampaigns: [{
            title: "Carola",
            soldCount: 109,
            prize: {
                title: "Cap",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, harum. Odio at in, consequatur, tempora quam blanditiis omnis corporis neque cupiditate assumenda unde obcaecati doloremque quod sequi molestias culpa aliquid!",
                image: "https://cdn4.iconfinder.com/data/icons/MacBook_Pro/512/leopard.png",
            },
            threshold: 190,
            product: {
                price: 210.2,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, harum. Odio at in, consequatur, tempora quam blanditiis omnis corporis neque cupiditate assumenda unde obcaecati doloremque quod sequi molestias culpa aliquid!",
                image: "https://cdn4.iconfinder.com/data/icons/MacBook_Pro/512/leopard.png",
                title: "Card",
            },
            Id: "VsTOOpxwl6KhGCPY6hod",
        },
        {
            Title: "4 Bed Apartment",
            product: {
                title: "Pencil",
                price: 20.01,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, harum. Odio at in, consequatur, tempora quam blanditiis omnis corporis neque cupiditate assumenda unde obcaecati doloremque quod sequi molestias culpa aliquid!",
                image: "https://cdn4.iconfinder.com/data/icons/MacBook_Pro/512/leopard.png",
            },
            threshold: 120,
            prize: {
                title: "Mercedes Benz",
                image: "https://www.mercedes-benz.com.au/passengercars/_jcr_content/image.MQ6.2.2x.20200812074529.png",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, harum. Odio at in, consequatur, tempora quam blanditiis omnis corporis neque cupiditate assumenda unde obcaecati doloremque quod sequi molestias culpa aliquid!",
            },
            soldCount: 100,
            Id: "uCYiAxM7EU4ocmf7qmfn",
        },
        {
            threshold: 105,
            product: {
                price: 105.05,
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, harum. Odio at in, consequatur, tempora quam blanditiis omnis corporis neque cupiditate assumenda unde obcaecati doloremque quod sequi molestias culpa aliquid!",
                title: "Car",
                image: "https://freepngimg.com/thumb/car/4-2-car-png-hd.png",
            },
            soldCount: 101,
            prize: {
                title: "Laptop",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, harum. Odio at in, consequatur, tempora quam blanditiis omnis corporis neque cupiditate assumenda unde obcaecati doloremque quod sequi molestias culpa aliquid!",
                image: "https://cdn4.iconfinder.com/data/icons/MacBook_Pro/512/leopard.png",
            },
            title: "Bugati",
            Id: "xh6v5YqE1AeXCy2l9d6C",
        },
        ],
    };
    const [state, dispatch] = useReducer(Reducer, initialState);
    const [count, setCount] = useState(0)
    const [currency, setCurrency] = useState("USD")
 
    const [hideCurrencyBar, setHideCurrencyBar] = useState({})
    const [checked, setChecked] = useState(true);
    const [colors, setColors] = useState({
        // onPrimary: "#A4A5AD",
        // primary: "#303346",
        // secondary: "#303346a6"
        onPrimary: "",
        primary: "",
        secondary: ""
    });

    const [addSideBarClass , setAddSideBarClass] = useState(true)
    const menuClick = (pagetitle) => {
        dispatch({
            type: MenuClick,
            payload: pagetitle,
        });
    };

    // ManageDoctors Methods started
    // const changeDoctorStatus = (status) => {
    //     dispatch({
    //         type: ChangeDoctorStatus,
    //         payload: status,
    //     });
    // };
    // ManageDoctors Methods Ended

    return (<Context.Provider value={
        {
            sideBarState: state.sideBarState,
            pageTitle: state.pageTitle,
            footerState: state.footerState,
            menuClick,
            dummyCampaigns: state.dummyCampaigns,
            count,
            setCount,
            setCurrency,
            currency,    
            setHideCurrencyBar,
            hideCurrencyBar,
            setChecked,
            checked,
            setColors,
            colors,



            // new  
            addSideBarClass,
            setAddSideBarClass

        }
    } > { " "} { props.children} { " "} </Context.Provider>);
};
export default State;
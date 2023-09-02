import React from "react";
import {
    MdLocalShipping,
    MdLibraryAddCheck,
    MdAccountBalance,
} from "react-icons/md";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import "./CheckOutSteps.css"

const CheckOutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icons: <MdLocalShipping />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icons: <MdLibraryAddCheck />,
        },
        {
            label: <Typography>Payment</Typography>,
            icons: <MdAccountBalance />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
        color: "white"
    };
    return (
        <>
        <div className="stepper">
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                style={stepStyles}
            >
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false} completed={activeStep >=index ? true : false}>
                        <StepLabel style={{color: activeStep >= index ? "tomato" : "white"}} icon={item.icons}><div className={activeStep >= index ? "tomatoColor" : "whiteColor"}>{item.label}</div></StepLabel>
                    </Step>
                ))}
            </Stepper>
            </div>
        </>
    );
};

export default CheckOutSteps;

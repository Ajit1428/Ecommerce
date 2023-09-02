import React from "react";
import "./AboutUs.css";
import Aboutus from "../../Images/About Us.jpg"

const AboutUs = () => {
    return (
        <>
            <div className="about__main">
                <div className="about__description">
                <h1>AboutUs</h1>
                    <p>
                        With the evolution of technology and the wave of
                        digitalization, more and more businesses are adapting to
                        tech evolutions. You will find the digital payment
                        options with the grocery sellers & street-side vendors
                        as well. The ultimate purpose behind this evolution is
                        to make shopping a hassle-free experience for everyone.
                        If you are also non-techies who want to take their
                        business online, Builderfly can be your savior.
                        Builderfly is an ecommerce platform exclusively designed
                        for individuals & businesses to start selling online,
                        market & grow their business without any technicalities.
                        So take your business to the World at your own pace.
                    </p>
                </div>
                <div className="about__image">
                    <img src={Aboutus} alt="aboutus"/>
                </div>
            </div>
        </>
    );
};

export default AboutUs;

import { Link } from "react-router-dom"
import './SplashPage.css'


function SplashPage() {
    return (
        <>
            <div className="splash1_container">
                <div className="splash1_left">
                    <div className="splash1_title">Investing for Everyone</div>
                    <p>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply.</p>
                    <Link to="/signup">
                        <button id="signup">Sign Up</button>
                    </Link>
                </div>
                <div className="splash1_right">
                    <img className="splash1_image" draggable="false" src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png"></img>
                    <video id="splash1_video" autoPlay controlsList="nodownload nofullscreen noremoteplayback" loop muted playsInline preload="auto">
                        <source src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4" type="video/mp4"></source>
                    </video>
                </div>

            </div>
        </>
    )
}

export default SplashPage



import Watchlist from '../List'
import './PortfolioPage.css'
function PortfolioPage() {

    return (
        <div className="portfolio_container">
            <div className="portfolio_container_sub">
                <div className="portfolio_left">
                    <div className="portfolio_header">Welcome to eRobin</div>
                </div>
                < Watchlist/>
            </div>
        </div>
    )
}

export default PortfolioPage


import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import { fetchNewsInfo } from "../../store/news"

const News = () => {
    const dispatch = useDispatch();

    const news = useSelector(state => state?.news?.news);
    const newsArr = Object.values(news ? news : {})

    useEffect(() => {
        dispatch(fetchNewsInfo());
    }, [dispatch]);


    return (
        <div className="news_outer_contanier">
            <h2>News</h2>
            <div  className="news_contanier">
                {news && newsArr.slice(0,8).map((oneNews) => (
                    <div className="news_sub_container" key={oneNews.title}>
                        <div>
                            <img src={oneNews.image}></img>
                        </div>
                        <div className="news_content">
                            <a href={oneNews.url} target="_blank">{oneNews.title}</a>
                            <span>{oneNews.summary}</span>
                            <div className="news_content_bottom">
                                <span>{oneNews.source}</span>
                                <span>{oneNews.date}</span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News

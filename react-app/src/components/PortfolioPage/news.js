
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import { fetchNewsInfo } from "../../store/news"

const News = () => {
    const dispatch = useDispatch();

    const news = useSelector(state => state?.news?.news);
    const newsArr = Object.values(news ? news : {})
    console.log(newsArr)
    useEffect(() => {
        dispatch(fetchNewsInfo());
    }, [dispatch]);


    return (
        <div>
            <h2>News</h2>
            <div>
                {news && newsArr.slice(0,8).map((oneNews) => (
                    <div className="news_contanier" key={oneNews.id}>
                        <div>{oneNews.title.slice(0,50)}...</div>
                        <div>{oneNews.date.slice(0,9)}...</div>
                        <div><hr></hr></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News

const GET_NEWS_INFO = 'news/GET_NEWS_INFO'

const getNewsInfo = (news) =>{
    return {
        type: GET_NEWS_INFO,
        news
    }
}

export const fetchNewsInfo = () => async (dispatch) => {
    const res = await fetch(`/api/news`)
    if(res.ok) {
        const news = await res.json();
        dispatch(getNewsInfo(news))
        return "Success"
    }
    else{
        return "Fetch news details failed"
    }
}

const initialState = {};

export default function newsReducer(state=initialState, action){
    let newState = {...state};
    switch (action.type) {
        case GET_NEWS_INFO:
            newState.news = action.news
            return newState
        default:
            return state
    }
};

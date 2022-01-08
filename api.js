const getNews= async (word)=>{
    return await axios.get(`https://inshortsapi.vercel.app/news?category=${word}`)
}
const getNews1= async ()=>{
    return await axios.get(`https://inshortsapi.vercel.app/news?category=world`)

}

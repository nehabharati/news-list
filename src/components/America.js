import React, { useEffect, useState } from 'react';
import axios from "axios"
import Pagination from "./Pagination"
import News from "./News"

const India = (props) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(20)

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true)
            const results = await axios.get(props.url, { crossdomain: true });
            setPosts(results.data.articles)
            setLoading(false)
        };
        getPosts();
    }, [])


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNum => setCurrentPage(pageNum)
    const nextPage = () => currentPage !== 1 && setCurrentPage(currentPage + 1)
    const prevPage = () => currentPage !== 1 && setCurrentPage(currentPage - 1)

    return (
        <div className="content-container">
            <h1 className="my-5 text-primary text-center">Top news in the USA</h1>
            <News posts={currentPosts} loading={loading} />
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
        </div>
    )
}


export default India;

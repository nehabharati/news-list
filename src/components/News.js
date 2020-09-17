import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import Fuse from "fuse.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Switcher from "../images/switcher.svg"
library.add(fas, far)

const News = (props) => {
    const { posts, loading } = props;
    const [query, setQuery] = useState("");
    const [showLike, setShowLike] = useState(false);
    const [url, setUrl] = useState("")
    const [likeUrl, setLikeUrl] = useState("")
    const [show] = useState(false)
    const [showCard, setShowCard] = useState(false)
    const [image] = useState(Switcher)
    const [news, setNews] = useState([])

    useEffect(() => {
        const myNews = JSON.parse(localStorage.getItem("news"));
        setNews(myNews)
    }, [])

    useEffect(() => {
        localStorage.setItem("news", JSON.stringify(cityResults))
        const myNews = JSON.parse(localStorage.getItem("news"));
        setNews(myNews)
    }, [posts])

    useEffect(() => {
        const myNews = JSON.parse(localStorage.getItem("news"));
        setNews(myNews)
    }, [localStorage.news])

    const fuse = new Fuse(posts, {
        keys: ["title", "author"],
        includeScore: true,
        threshold: 0.05,
    });

    const results = fuse.search(query);
    const cityResults = query ? results.map((result) => result.item) : posts

    if (loading) {
        return <h2>Loading...</h2>
    }

    function handleSearch({ currentTarget = {} }) {
        const { value } = currentTarget;
        setQuery(value);
    }

    function handleClick(e, url) {
        setShowCard(!showCard)
        setUrl(url)
        let index = e.currentTarget.getAttribute("data-key");
        let listValue = JSON.parse(localStorage.getItem("news"));
        listValue.splice(index, 1);
        setNews(listValue)
    }

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search..."
                className="search"
            />
            {query ? (
                cityResults.map((post, index) => (
                    !show && url === post.urlToImage ? (
                        <Card key={post.url} style={{ width: '18rem' }} style={{ display: "none", marginBottom: "2em" }}>
                            {(post.urlToImage === null) ? (<Card.Img variant="top" src={image} className="image" />) : (<Card.Img variant="top" src={post.urlToImage} className="image" />)}
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                {post.author === null ? (<Card.Text>
                                    Author: NA
                                </Card.Text>) : (<Card.Text>
                                    Author: {post.author}
                                </Card.Text>)}

                                {post.publishedAt === null ? (<Card.Text>
                                    Published at: NA
                                </Card.Text>) : (<Card.Text>
                                    Published at: {post.publishedAt.slice(0, 10)}
                                </Card.Text>)}
                            </Card.Body>
                            <Card.Body className="links">
                                <a href={post.url} target="_blank" rel="noopener noreferrer">See article</a>
                                <input type="radio" className="like" id={post.url} onClick={() => { setLikeUrl(post.url); setShowLike(!showLike) }} />
                                {showLike && likeUrl === post.url ? (
                                    <label htmlFor={post.url}>
                                        <FontAwesomeIcon icon={['fas', 'heart']} className="icons" />
                                    </label>
                                ) : (
                                        <label htmlFor={post.url}>
                                            <FontAwesomeIcon icon={['far', 'heart']} className="icons" />
                                        </label>
                                    )}
                                <input type="radio" id={post.urlToImage} data-key={index} onChange={(e) => handleClick(e, post.urlToImage)} />
                                <label htmlFor={post.urlToImage} >
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                </label>
                            </Card.Body>
                        </Card>

                    ) : (
                            <Card key={post.url} style={{ width: '18rem' }} style={{ display: "block", marginBottom: "2em" }}>
                                {(post.urlToImage === null) ? (<Card.Img variant="top" src={image} className="image" style={{ width: "100%", height: "400px", objectFit: "cover" }} />) : (<Card.Img variant="top" src={post.urlToImage} className="image" />)}
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    {post.author === null ? (<Card.Text>
                                        Author: NA
                                    </Card.Text>) : (<Card.Text>
                                        Author: {post.author}
                                    </Card.Text>)}
                                    {post.publishedAt === null ? (<Card.Text>
                                        Published at: NA
                                    </Card.Text>) : (<Card.Text>
                                        Published at: {post.publishedAt.slice(0, 10)}
                                    </Card.Text>)}
                                </Card.Body>
                                <Card.Body className="links">
                                    <a href={post.url} target="_blank" rel="noopener noreferrer">See article</a>
                                    <input type="radio" className="like" id={post.url} onClick={() => { setLikeUrl(post.url); setShowLike(!showLike) }} />
                                    {showLike && likeUrl === post.url ? (
                                        <label htmlFor={post.url}>
                                            <FontAwesomeIcon icon={['fas', 'heart']} className="icons" />
                                        </label>
                                    ) : (
                                            <label htmlFor={post.url}>
                                                <FontAwesomeIcon icon={['far', 'heart']} className="icons" />
                                            </label>
                                        )}
                                    <input type="radio" id={post.urlToImage} data-key={index} onChange={(e) => handleClick(e, post.urlToImage)} />
                                    <label htmlFor={post.urlToImage} ><FontAwesomeIcon icon={faEyeSlash} /></label>
                                </Card.Body>
                            </Card>
                        )
                ))
            )
                : (
                    news.map((post, index) => (
                        !show && url === post.urlToImage ? (
                            <Card key={post.url} style={{ width: '18rem' }} style={{ display: "none", marginBottom: "2em" }}>
                                {(post.urlToImage === null) ? (<Card.Img variant="top" src={image} className="image" />) : (<Card.Img variant="top" src={post.urlToImage} className="image" />)}
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    {post.author === null ? (<Card.Text>
                                        Author: NA
                                    </Card.Text>) : (<Card.Text>
                                        Author: {post.author}
                                    </Card.Text>)}

                                    {post.publishedAt === null ? (<Card.Text>
                                        Published at: NA
                                    </Card.Text>) : (<Card.Text>
                                        Published at: {post.publishedAt.slice(0, 10)}
                                    </Card.Text>)}
                                </Card.Body>
                                <Card.Body className="links">
                                    <a href={post.url} target="_blank" rel="noopener noreferrer">See article</a>
                                    <input type="radio" className="like" id={post.url} onClick={() => { setLikeUrl(post.url); setShowLike(!showLike) }} />
                                    {showLike && likeUrl === post.url ? (
                                        <label htmlFor={post.url}>
                                            <FontAwesomeIcon icon={['fas', 'heart']} className="icons" />
                                        </label>
                                    ) : (
                                            <label htmlFor={post.url}>
                                                <FontAwesomeIcon icon={['far', 'heart']} className="icons" />
                                            </label>
                                        )}
                                    <input type="radio" id={post.urlToImage} data-key={index} onChange={(e) => handleClick(e, post.urlToImage)} />
                                    <label htmlFor={post.urlToImage} >
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </label>
                                </Card.Body>
                            </Card>

                        ) : (
                                <Card key={post.url} style={{ width: '18rem' }} style={{ display: "block", marginBottom: "2em" }}>
                                    {(post.urlToImage === null) ? (<Card.Img variant="top" src={image} className="image" style={{ width: "100%", height: "400px", objectFit: "cover" }} />) : (<Card.Img variant="top" src={post.urlToImage} className="image" />)}
                                    <Card.Body>
                                        <Card.Title>{post.title}</Card.Title>
                                        {post.author === null ? (<Card.Text>
                                            Author: NA
                                        </Card.Text>) : (<Card.Text>
                                            Author: {post.author}
                                        </Card.Text>)}
                                        {post.publishedAt === null ? (<Card.Text>
                                            Published at: NA
                                        </Card.Text>) : (<Card.Text>
                                            Published at: {post.publishedAt.slice(0, 10)}
                                        </Card.Text>)}
                                    </Card.Body>
                                    <Card.Body className="links">
                                        <a href={post.url} target="_blank" rel="noopener noreferrer">See article</a>
                                        <input type="radio" className="like" id={post.url} onClick={() => { setLikeUrl(post.url); setShowLike(!showLike) }} />

                                        {showLike && likeUrl === post.url ? (
                                            <label htmlFor={post.url}>
                                                <FontAwesomeIcon icon={['fas', 'heart']} className="icons" />
                                            </label>
                                        ) : (
                                                <label htmlFor={post.url}>
                                                    <FontAwesomeIcon icon={['far', 'heart']} className="icons" />
                                                </label>
                                            )}
                                        <input type="radio" id={post.urlToImage} data-key={index} onChange={(e) => handleClick(e, post.urlToImage)} />
                                        <label htmlFor={post.urlToImage} ><FontAwesomeIcon icon={faEyeSlash} /></label>
                                    </Card.Body>
                                </Card>
                            )
                    ))
                )
            }
        </div >
    )
}

export default News
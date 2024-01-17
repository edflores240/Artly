import "./CommunityPost.scss";
import { useEffect, useState } from "react";
import openjourney from "../../assets/images/openjourney.png";
import anything from "../../assets/images/anything2.png";
import dalle from "../../assets/images/dalle.png";
import midjourney from "../../assets/images/midjourney.png";
import { RenderUserPostCard } from "../UserPost/UserPost";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { makeRequest } from "../../axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { MdFrontLoader } from "react-icons/md";


const CommunityPost = () => {
  const [search, setSearch] = useState(" ");
  const [offset, setOffset] = useState(0);
  const [currentLength, setCurrentLength] = useState(9)
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState(true)
  const [post, setPost] = useState([])
  const [isError, setIsError] = useState()
  const [result, setResult] = useState(true)
  
  

//  const fetchPosts = () => {
//   const q = `/posts/community?search=${search}&offset=${offset}`;
//   return makeRequest.get(q).then((res) => {
    
//     const { data, hasMore } = res.data;
  
//     return { data, hasMore };
//   });
// };

  



  // const {
  //   isLoading,
  //   isError,
  //   data,
  //   noMoreToFetch,
  //   fetchNextPage,
  //   hasMore,
  // } = useInfiniteQuery(["posts", search], fetchPosts, {
  //   getNextPageParam: (lastPage) => {
  //     const nextPageOffset = lastPage.data.length + offset ;
  //     return { offset: nextPageOffset };
  //   },
  //   staleTime: 10000,
  // });


  
  const {isLoading, error, data} = useQuery(["posts"], ()=> 
 makeRequest.get(`/posts/community?search=${search}&offset=${offset}`).then((res) => {
  setLoading(false)
  const { data, hasMore, noResult } = res.data;
  
    return { data, hasMore, noResult };
  

  }, 
   {staleTime: 5000}
  )
);

useEffect(()=> {
  data && result &&  post.length === 0 && data.length !== 0 ? setPost ( [data]) :
  data && result && post.length !== 0 &&  post[post.length - 1].data && data.data && data.length  !== 0  && data.data[data.data.length - 1] !==  post[post.length - 1].data[post[post.length - 1].data.length - 1].id 
   ? setPost (prevState => [...prevState, data]) : handleLoadMore()    
setIsError(error)
  
}, [data && result && data.data && data.data])

useEffect(() => {
  data && result && data.length !== 0  &&  post.length !== 0 && post[post.length - 1].hasMore === false && setNextPage(false)
  data && result && post && post.length && post[length].noResult === true && setResult(false)

}, [post])





const handleLoadMore = () => {
  setOffset(offset + 9);
  setLoading(true)
};

  useEffect(() => {
    setOffset(0);
    setPost([])
    setNextPage(true)
    setResult(true)
    
  }, [search]);

  useEffect(() => {
    setOffset(0);
    setPost([])
    setNextPage(true)
    setResult(true)
    
  }, [])



 


  // useEffect(()=> {
  //   data && data.pages[data.pages.length - 1].data.length > 9 || data && data.pages[data.pages.length - 1].data.length  === 0 ? setNextPage(false) : setNextPage(true)
  //   data &&  post.length === 0 && data.length !== 0 ? setPost (prevState => [...prevState, data.pages[data.pages.length - 1].data]) :
  //   data && post.length !== 0 && data.length !== 0  && data.pages[data.pages.length - 1].data[data.pages[data.pages.length - 1].data.length - 1].id !==  post[post.length - 1][post[post.length - 1].length -1 ].id 
  //    && setPost (prevState => [...prevState, data.pages[data.pages.length - 1].data])

  //   data && data.length !== 0  &&  data.pages[data.pages.length - 1].hasMore && setNextPage(true)
    
    
  // setIsError(error)
    
  // }, [data])

  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //     document.documentElement.offsetHeight
  //   ) {
  //     return;
  //   }
  //   if (posts.length >= total) {
  //     return;
  //   }
  //   setPage(page + 1);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  // console.log(post)
    // console.log(data.pages[data.pages.length - 1].data)
 
   console.log(post)

   console.log("DATA: ")
   console.log(data)
  console.log("result: " + result)
  
  // console.log(data)
  // console.log(hasNextPage)

  return (
    <div className="community-post">
      <div className="upper-design">
        <div className="community-header">
          Community
          <br /> Post
        </div>
        <img src={midjourney} alt="Midjourney" className="midjourney" />
        <img src={dalle} alt="Dall-e" className="dalle" />
        <img src={anything} alt="Anything V4" className="anything" />
        <img src={openjourney} alt="Openjourney" className="openjourney" />
        <div className="search-bar">
          <FiSearch
            className="search-icon"
            onClick={() => {
              setSearch(search);
            }}
          />

          <input
            type="text"
            name="q"
            id="community-search"
            placeholder="Search prompt or users"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="community-post-container" style={{paddingBottom:"0px"}}>
      <div className="post-wrapper">
      {result === false ?  <div className="reloader"  style={{margin:"auto"}}><h1>Search Not Found!</h1></div> :
         isError ? <div>There's Something Wrong ! {isError.message}</div> :
          post && post.length !== 0  ? (
              <>
                {post.map((pageData, i) => (
                
                  <RenderUserPostCard
                    key={i}
                    data={pageData.data}
                    title="There's something wrong In loading the Image"
                  />
                ))}
              </> 
            
            ):
            
            <div className="post-wrapper">
                <div className="user-post-card">
                  <CardSkeleton />
                </div>
                <div className="user-post-card">
                  <CardSkeleton />
                </div>
                <div className="user-post-card">
                  <CardSkeleton />
                </div>
              </div>

            }</div>

            {
              nextPage ?
            
                loading === false ?
                <div className="reloader">
                    <button className="pagination" onClick={() => handleLoadMore()}>
                  
                    <FiRefreshCw/>
                  </button>
                </div>:
                <div className="post-wrapper">
                    <div className="user-post-card">
                      <CardSkeleton />
                    </div>
                    <div className="user-post-card">
                      <CardSkeleton />
                    </div>
                    <div className="user-post-card">
                      <CardSkeleton />
                    </div>
              </div> : 
              <div className="reloader">
                  <h1>No more Feeds</h1>
              </div>
           
            
           }
     
      
         
      </div>
    </div>
  );
};

export default CommunityPost;

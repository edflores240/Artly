import UserPost from "../UserPost/UserPost";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = () => {


  const { isloading, error, data } = useQuery(["posts"], () => 
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="post">
      <UserPost post={data} />
    </div>
  );
};

export default Posts;

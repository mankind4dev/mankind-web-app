import { Button, Spinner, TabItem, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPost() {
  const { currentUser,  error } = useSelector((state) => state.user);
 const [loading, setLoading] = useState(false)
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      setLoading(true)
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json()
      if(res.ok){
        setUserPosts((prev) => [...prev, ...data.posts])
        if(data.posts.length < 9){
          setShowMore(false)
          setLoading(false)
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
        {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
            <Table hoverable className="shadow-sm">
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span className="">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {userPosts.map((post) => (
                <>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-20 h-10 object-cover bg-gray-500"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          to={`/post/${post.slug}`}
                          className="font-medium text-gray-900 dark:text-white"
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <span className="font-medium text-teal-500 hover:underline">
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/update-post/${post._id}`}>
                          <span className="text-green-500 hover:underline">
                            Edit
                          </span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </>
              ))}
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore} 
                className="flex justify-center text-center w-full text-teal-500 self-center text-sm py-5"
              >
               {loading ? (
                <> 
                <Spinner size="sm" />
                <p className="capitalize ml-2 text-teal-500">loading...</p>
                </>
               ) : (
                <>
                <p className="">show more</p>
                </>
               )}
              </button>
            )}
          </>
        ) : (
          <>
            <p className=" flexjustify-center text-center">
              You have no posts yet!
            </p>
          </>
        )}
      </div>
    </>
  );
}

import { TabItem, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPost() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPost();
    }
  }, [currentUser._id]);

  return (
    <>
      <div className="table-auto w-full ml-0 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
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

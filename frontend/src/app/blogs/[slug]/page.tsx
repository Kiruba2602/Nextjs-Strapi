// app/blogs/[slug]/page.tsx.
"use client";
import { use, useEffect, useState } from "react";
import { getPostBySlug, updatePost } from "../../../lib/api"; // Import your API functions
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FaClipboard } from "react-icons/fa"; // Import your chosen icon
import Loader from "@/components/Loader";
import moment from "moment";
import { toast } from "react-hot-toast";

const handleCopyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy code: ", err);
  }
};

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const fetchedPost = await getPostBySlug(slug);
          setPost(fetchedPost);
          setEditedTitle(fetchedPost.title);
          setEditedDescription(fetchedPost.description);
          setEditedContent(fetchedPost.content);
        } catch (err) {
          setError("Error fetching post.");
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [slug]);

  const handleSave = async () => {
    if (!post) return;

    try {
      const updatedPost = await updatePost(post.id, {
        title: editedTitle,
        description: editedDescription,
        content: editedContent,
      });
      setPost(updatedPost);
      toast.success("Post updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error("Failed to update post:", err);
      toast.error("Failed to update post.");
    }
  };

  if (loading)
    return (
      <div className="max-w-screen-md mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <p className="max-w-screen-md mx-auto">Error: {error}</p>;
  if (!post) return <p className="max-w-screen-md mx-auto">No post found.</p>;

  return (
    <div className="max-w-screen-md mx-auto p-4">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 text-2xl font-bold border-b border-gray-300 mb-4"
              placeholder="Enter title"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 text-lg border-b border-gray-300 mb-4"
              placeholder="Enter description"
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 text-lg border-b border-gray-300 mb-4"
              placeholder="Enter content"
            />
            <div className="flex space-x-4 mt-4">
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <div className="w-full flex flex-row items-center justify-end">
            <h1 className="text-4xl leading-[60px] capitalize text-center font-bold text-purple-800 font-jet-brains">
              {post.title}
            </h1>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded ml-6">
              Edit Post
            </button>
          </div>
          <div className="w-full flex items-center justify-center font-light">
            Published: {moment(post.createdAt).fromNow()}
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap space-x-2 my-4">
              {post.categories.map(({ name, documentId }) => (
                <span key={documentId} className="border border-purple-900 font-medium px-2 py-2 text-sm">
                  {name}
                </span>
              ))}
            </div>
          )}
          {post.cover && (
            <div className="relative h-72 w-full my-4">
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
                alt={post.title}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          )}
          <p className="text-gray-300 leading-[32px] tracking-wide italic mt-2 mb-6">{post.description}</p>
          <Markdown
            className={"leading-[40px] max-w-screen-lg prose prose-invert"}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                const codeString = String(children).replace(/\n$/, "");

                return !inline && match ? (
                  <div className="relative">
                    <button
                      onClick={() => handleCopyCode(codeString)}
                      className="absolute top-2 right-2 bg-gray-700 text-white p-1 rounded-md hover:bg-gray-600"
                      title="Copy to clipboard"
                    >
                      <FaClipboard color="#fff" />
                    </button>
                    <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </Markdown>
        </>
      )}
      <button onClick={() => router.back()} className="text-purple-800 mt-4 inline-block hover:underline">
        Back to Blogs
      </button>
    </div>
  );
};

export default BlogPostPage;

import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/queriesAndMutataions";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();

  const { data: post, isPending: isLoadingPost } = useGetPostById(id!);

  if (isLoadingPost)
    return <Loader className="flex justify-center items-center" />;
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/edit.svg" alt="add" height={36} width={36} />{" "}
          <h1 className="h3-bold md:h2-bold text-left w-full">Update Post</h1>
        </div>
        <PostForm post={post} action="Update" />
      </div>
    </div>
  );
};

export default EditPost;

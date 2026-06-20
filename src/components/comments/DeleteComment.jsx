"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";

const DeleteComment = ({ comment, setComments }) => {
  const { _id } = comment;
  const handleDelete = async () => {
    const {data:tokenData} = await authClient.token()
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${_id}`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      }
    })
    const data = await res.json();
    if (data.modifiedCount > 0 || data.acknowledged) {
      toast.success("Your Comment deleted");
      // 
      setComments(prev =>
        prev.filter(comment => comment._id !== _id)
      );
    }

  }


  return (
    <div>
      <AlertDialog>
        <Button type="" className="text-zinc-50 hover:text-red-500 transition-colors rounded-none p-0 min-w-0 h-auto bg-transparent border-none shadow-none">Delete</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-gray-500 text-xs">
                  Are you sure you want to delete this startup idea? This will permanently remove the idea and all of its comments from IdeaVault.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button onClick={handleDelete} slot="close" variant="danger">
                  Delete Project
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteComment;
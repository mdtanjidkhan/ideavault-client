"use client";

import {AlertDialog, Button} from "@heroui/react";

const DeleteComment = ({comment}) => {
     const {_id} = comment;
  const handleDelete = async()=>{
     const res = await fetch(`http://localhost:5000/comments/${_id}`,{
        method:"DELETE",
        headers:{
          'content-type':'application/json'
        }
     })
     const data = await res.json();
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
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
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